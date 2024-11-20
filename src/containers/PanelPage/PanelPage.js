import React, { useState } from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import { compose } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';

import { Bar } from 'react-chartjs-2';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  NamedLink,
  Reviews,
} from '../../components';
import css from './PanelPage.module.css';
import { injectIntl } from '../../util/reactIntl';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';

import ProfileNav from '../../components/ProfileNav/ProfileNav';
import moment from 'moment';
import { REVIEW_TYPE_OF_CUSTOMER, REVIEW_TYPE_OF_PROVIDER } from '../../util/types';
import { queryUserReviews } from './PanelPage.duck';
import { shape ,number} from 'prop-types';
// const MAX_MOBILE_SCREEN_WIDTH = 768;

const options = {
  title: {
    display: true,
    text: 'Average Rainfall per month',
    fontSize: 20,
  },
  legend: {
    display: true,
    position: 'right'
  }
}

const PanelPageComponent = props => {
  const {
    orders,
    currentUser,
  } = props;
 const {reviews} = useSelector(state=>state.PanelPage)
 const [active, setActive] = useState(true);

  const formatedData = { 'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, "Jun": 0, "Jul": 0, "Aug": 0, "Sept": 0, "Oct": 0, "Nov": 0, "Dec": 0 };
  const totalAmount = orders?.map((item, index) => item?.attributes?.payoutTotal?.amount)
  const total = totalAmount && totalAmount.reduce((prve, next) => parseInt(prve) + parseInt(next), 0);
  if (orders && orders.length) {
    orders.forEach(order => {
      if (formatedData[moment(order.attributes?.lastTransitionedAt).format("MMM")]) {
        formatedData[moment(order.attributes?.lastTransitionedAt).format("MMM")] += order.attributes.payoutTotal.amount / 100;
      } else {
        formatedData[moment(order.attributes?.lastTransitionedAt).format("MMM")] = order.attributes.payoutTotal.amount / 100;
      }
    })
  }
const dispatch = useDispatch();
  const fetchReview = () =>{
    setActive(false)
    dispatch(queryUserReviews(currentUser?.id))
  }

  // const isMobileLayout = viewport.width < MAX_MOBILE_SCREEN_WIDTH;
  const state = {
    labels: Object.keys(formatedData),
    datasets: [
      {
        label: 'Ganancias',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: Object.values(formatedData)
      }
    ]
  }
  const reviewsOfProvider = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_PROVIDER);
  const reviewsOfCustomer = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_CUSTOMER);

  // const mobileReviews = (
  //   <div className={css.mobileReviews}>
  //     <h2 className={css.mobileReviewsTitle}>
  //       <FormattedMessage
  //         id="ProfilePage.reviewsOfProviderTitle"
  //         values={{ count: reviewsOfProvider.length }}
  //       />
  //     </h2>
  //     <Reviews reviews={reviewsOfProvider} />
  //     <h2 className={css.mobileReviewsTitle}>
  //       <FormattedMessage
  //         id="ProfilePage.reviewsOfCustomerTitle"
  //         values={{ count: reviewsOfCustomer.length }}
  //       />
  //     </h2>
  //     <Reviews reviews={reviewsOfCustomer} />
  //   </div>
  // );
  const desktopReviews = (
    <div className={css.desktopReviews}>
        <Reviews reviews={reviewsOfProvider} />
        <Reviews reviews={reviewsOfCustomer} />
    </div>
  );

  return (
    <StaticPage
      title="Panel"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'PanelPage',
        description: 'Panel',
        name: 'Panel',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={'Panel'} />
          <div className={css.sideNav}>
            <ProfileNav currentUser={currentUser} />
          </div>
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={css.contentWrapper}>
            <div className={css.headingButton}>
              <button onClick={() => setActive(true)} className={active ? css.active : null}>Ganancias</button>
              <button onClick={() => fetchReview()} className={!active ? css.active : null}>Reseñas</button>
            </div>
            {active ? <div>
              <h2 style={{ color: "green" }}>Ganancias Totales: <span style={{ color: "black" }}>${total / 100}</span></h2>
              {/* <h2 style={{ color: "red" }}>Ganancias perdidas: <span style={{ color: "black" }}>$0</span></h2> */}
              <Bar
                data={state}
                className={css.barchart}
                options={options}
              />

              <NamedLink name="DashBoardPage">
                <p style={{ color: "red" }}>
                Ver todos los detalles de las transiciones
                </p>
              </NamedLink>
            </div>
              :
              <div>
                <h1>Todas las reseñas</h1>
                <div className={css.reviewsWrapper}>{ desktopReviews}</div>
              </div>
              }

          </div>

        </LayoutWrapperMain>

        {/* <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter> */}

      </LayoutSingleColumn>
    </StaticPage>
  );
};


PanelPageComponent.propTypes = {
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    ordersInProgress,
    salesInProgress,
    fetchOrderError,
    fetchSalesError,
    ordersRefs,
    salesRefs,
    transaction,
  } = state.PanelPage;

  return {
    currentUser,
    transaction,
    ordersInProgress,
    salesInProgress,
    fetchOrderError,
    fetchSalesError,
    ordersRefs,
    orders: getMarketplaceEntities(state, ordersRefs),
    sales: getMarketplaceEntities(state, salesRefs),
  };
};

const PanelPage = compose(connect(mapStateToProps), injectIntl)(PanelPageComponent);

export default PanelPage;
