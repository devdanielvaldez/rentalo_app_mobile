import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import { storableError } from '../../util/errors';
import { parse } from '../../util/urlHelpers';
import { TRANSITIONS } from '../../util/transaction';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { denormalisedResponseEntities } from '../../util/data';

const sortedTransactions = txs =>
  reverse(
    sortBy(txs, tx => {
      return tx.attributes ? tx.attributes.lastTransitionedAt : null;
    })
  );

// ================ Action types ================ //

export const FETCH_ORDERS_REQUEST = 'app/PanelPage/FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'app/PanelPage/FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'app/PanelPage/FETCH_ORDERS_ERROR';

export const FETCH_SALES_REQUEST = 'app/PanelPage/FETCH_SALES_REQUEST';
export const FETCH_SALES_SUCCESS = 'app/PanelPage/FETCH_SALES_SUCCESS';
export const FETCH_SALES_ERROR = 'app/PanelPage/FETCH_SALES_ERROR';

export const QUERY_REVIEWS_REQUEST = 'app/PanelPage/QUERY_REVIEWS_REQUEST';
export const QUERY_REVIEWS_SUCCESS = 'app/PanelPage/QUERY_REVIEWS_SUCCESS';
export const QUERY_REVIEWS_ERROR = 'app/PanelPage/QUERY_REVIEWS_ERROR';

// ================ Reducer ================ //

const entityRefs = entities =>
  entities.map(entity => ({
    id: entity.id,
    type: entity.type,
  }));

const initialState = {
  pagination: null,
  ordersRefs: [],
  salesRefs: [],
  ordersInProgress: false,
  salesInProgress: false,
  fetchOrderError: null,
  fetchSalesError: null,
  hideDot: false,
  reviews: [],
  queryReviewsError: null,
};

export default function panelPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SALES_REQUEST:
      return { ...state, salesInProgress: true, fetchSalesError: null };

    case FETCH_SALES_SUCCESS: {
      const transactions = sortedTransactions(payload.data.data);
      return {
        ...state,
        fetchInProgress: false,
        salesRefs: entityRefs(transactions),
        pagination: payload.data.meta,
      };
    }
    case FETCH_SALES_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, fetchInProgress: false, fetchOrdersOrSalesError: payload };

    case FETCH_ORDERS_REQUEST:
      return { ...state, ordersInProgress: true, fetchOrderError: null };

    case FETCH_ORDERS_SUCCESS: {
      const transactions = sortedTransactions(payload.data.data);
      return {
        ...state,
        ordersInProgress: false,
        ordersRefs: entityRefs(transactions),
        pagination: payload.data.meta,
      };
    }
    case FETCH_ORDERS_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, ordersInProgress: false, fetchOrderError: payload };
      case QUERY_REVIEWS_REQUEST:
        return { ...state, queryReviewsError: null };
      case QUERY_REVIEWS_SUCCESS:
        return { ...state, reviews: payload };
      case QUERY_REVIEWS_ERROR:
        return { ...state, reviews: [], queryReviewsError: payload };

    default:
      return state;
  }
}

// ================ Action creators ================ //

const fetchOrdersRequest = () => ({ type: FETCH_ORDERS_REQUEST });
const fetchOrdersSuccess = response => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: response,
});
const fetchOrdersError = e => ({
  type: FETCH_ORDERS_ERROR,
  error: true,
  payload: e,
});

const fetchSalesRequest = () => ({ type: FETCH_SALES_REQUEST });
const fetchSalesSuccess = response => ({
  type: FETCH_SALES_SUCCESS,
  payload: response,
});
const fetchSalesError = e => ({
  type: FETCH_SALES_ERROR,
  error: true,
  payload: e,
});

export const queryReviewsRequest = () => ({
  type: QUERY_REVIEWS_REQUEST,
});

export const queryReviewsSuccess = reviews => ({
  type: QUERY_REVIEWS_SUCCESS,
  payload: reviews,
});

export const queryReviewsError = e => ({
  type: QUERY_REVIEWS_ERROR,
  error: true,
  payload: e,
});

// ================ Thunks ================ //
export const queryUserReviews = userId => (dispatch, getState, sdk) => {
  sdk.reviews
    .query({
      subject_id: userId,
      state: 'public',
      include: ['author', 'author.profileImage'],
      'fields.image': ['variants.square-small', 'variants.square-small2x'],
    })
    .then(response => {
      const reviews = denormalisedResponseEntities(response);
      dispatch(queryReviewsSuccess(reviews));
    })
    .catch(e => dispatch(queryReviewsError(e)));
};



const INBOX_PAGE_SIZE = 100;

export const loadData = (params, search) => (dispatch, getState, sdk) => {
  const { tab } = params;

  dispatch(fetchOrdersRequest());
  dispatch(fetchSalesRequest());

  const { page = 1 } = parse(search);

  const extraParams = {
    lastTransitions: TRANSITIONS,
    include: [
      'provider',
      'provider.profileImage',
      'customer',
      'customer.profileImage',
      'booking',
      'listing',
      'messages',
      'messages.sender',
    ],
    'fields.transaction': [
      'lastTransition',
      'lastTransitionedAt',
      'transitions',
      'payinTotal',
      'payoutTotal',
    ],
    'fields.user': ['profile.displayName', 'profile.abbreviatedName'],
    'fields.image': ['variants.square-small', 'variants.square-small2x'],
    page,
    per_page: INBOX_PAGE_SIZE,
  };

  const apiOrdersQueryParams = {
    // only: 'order',
    ...extraParams,
  };

  const apiSalesQueryParams = {
    // only: 'sale',
    ...extraParams,
  };

  if (apiOrdersQueryParams) {
    return sdk.transactions
      .query(apiOrdersQueryParams)
      .then(response => {
        dispatch(addMarketplaceEntities(response));
        dispatch(fetchOrdersSuccess(response));

        return response;
      })
      .catch(e => {
        dispatch(fetchOrdersError(storableError(e)));
        throw e;
      });
  }
  if (apiSalesQueryParams) {
    if (apiSalesQueryParams) {
      return sdk.transactions
        .query(apiSalesQueryParams)
        .then(response => {
          dispatch(addMarketplaceEntities(response));
          dispatch(fetchSalesSuccess(response));
          return response;
        })
        .catch(e => {
          dispatch(fetchSalesError(storableError(e)));
          throw e;
        });
    }
  }
};
