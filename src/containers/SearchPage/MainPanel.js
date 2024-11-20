import React, { Component } from 'react';
import { array, bool, func, number, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { FormattedMessage } from '../../util/reactIntl';
import { createResourceLocatorString } from '../../util/routes';
import { isAnyFilterActive } from '../../util/search';
import { propTypes } from '../../util/types';
import {
  SearchResultsPanel,
  SearchFiltersMobile,
  SearchFiltersPrimary,
  SortBy,
} from '../../components';
import FilterComponent from './FilterComponent';
import { validFilterParams } from './SearchPage.helpers';
import adventuresIcon from './adventuresIcon.png';
import compactIcon from './compactIcon.png';
import economicIcon from './economicIcon.png';
import executivesIcon from './executivesIcon.png';
import familyIcon from './familyIcon.png';
import { pushToPath } from '../../util/urlHelpers';
import css from './SearchPage.module.css';
import '../../styles/slick/slick.css';
import '../../styles/slick/slick-theme.css';
import Slider from 'react-slick';

const FILTER_DROPDOWN_OFFSET = -14;

const trendingBrands = [
  { name: "Tesla", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Mercedes", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Ferrari", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Bugatti", logo: "/placeholder.svg?height=40&width=40" },
  { name: "BMW", logo: "/placeholder.svg?height=40&width=40" },
];

const popularCars = [
  {
    id: 1,
    name: "Mercedes SLK Class",
    image: "/placeholder.svg?height=200&width=300",
    rating: 5.0,
    horsepower: "1100 hp",
    transmission: "Automatic",
    price: 85000,
  },
  {
    id: 2,
    name: "Porsche Panamera",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    horsepower: "1600 hp",
    transmission: "Automatic",
    price: 90000,
  },
  {
    id: 3,
    name: "BMW i8",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    horsepower: "1200 hp",
    transmission: "Automatic",
    price: 75000,
  },
];

const cleanSearchFromConflictingParams = (searchParams, sortConfig, filterConfig) => {

  const sortingFiltersActive = isAnyFilterActive(
    sortConfig.conflictingFilters,
    searchParams,
    filterConfig
  );
  return sortingFiltersActive
    ? { ...searchParams, [sortConfig.queryParamName]: null }
    : searchParams;
};

class MainPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { isSecondaryFiltersOpen: false, currentQueryParams: props.urlQueryParams };

    this.applyFilters = this.applyFilters.bind(this);
    this.cancelFilters = this.cancelFilters.bind(this);
    this.resetAll = this.resetAll.bind(this);

    this.initialValues = this.initialValues.bind(this);
    this.getHandleChangedValueFn = this.getHandleChangedValueFn.bind(this);

    this.handleSortBy = this.handleSortBy.bind(this);
  }

  applyFilters() {
    const { history, urlQueryParams, sortConfig, filterConfig } = this.props;
    const searchParams = { ...urlQueryParams, ...this.state.currentQueryParams };
    const search = cleanSearchFromConflictingParams(searchParams, sortConfig, filterConfig);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, search));
  }

  cancelFilters() {
    this.setState({ currentQueryParams: {} });
  }

  resetAll(e) {
    const { urlQueryParams, history, filterConfig } = this.props;
    const filterQueryParamNames = filterConfig.map(f => f.queryParamNames);

    this.setState({ currentQueryParams: {} });

    const queryParams = omit(urlQueryParams, filterQueryParamNames);
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  initialValues(queryParamNames) {
    const urlQueryParams = this.props.urlQueryParams;

    const currentQueryParams = this.state.currentQueryParams;

    const getInitialValue = paramName => {
      const currentQueryParam = currentQueryParams[paramName];
      const hasQueryParamInState = typeof currentQueryParam !== 'undefined';
      return hasQueryParamInState ? currentQueryParam : urlQueryParams[paramName];
    };

    const isArray = Array.isArray(queryParamNames);
    return isArray
      ? queryParamNames.reduce((acc, paramName) => {
        return { ...acc, [paramName]: getInitialValue(paramName) };
      }, {})
      : {};
  }

  getHandleChangedValueFn(useHistoryPush) {
    const { urlQueryParams, history, sortConfig, filterConfig } = this.props;

    return updatedURLParams => {
      const updater = prevState => {
        const { address, bounds } = urlQueryParams;
        const mergedQueryParams = { ...urlQueryParams, ...prevState.currentQueryParams };

        return {
          currentQueryParams: { ...mergedQueryParams, ...updatedURLParams, address, bounds },
        };
      };

      const callback = () => {
        if (useHistoryPush) {
          const searchParams = this.state.currentQueryParams;
          const search = cleanSearchFromConflictingParams(searchParams, sortConfig, filterConfig);
          history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, search));
        }
      };

      this.setState(updater, callback);
    };
  }

  handleSortBy(urlParam, values) {
    const { history, urlQueryParams } = this.props;
    const queryParams = values
      ? { ...urlQueryParams, [urlParam]: values }
      : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  render() {
    const {
      className,
      rootClassName,
      urlQueryParams,
      listings,
      searchInProgress,
      searchListingsError,
      searchParamsAreInSync,
      onActivateListing,
      onManageDisableScrolling,
      onOpenModal,
      onCloseModal,
      onMapIconClick,
      pagination,
      searchParamsForPagination,
      showAsModalMaxWidth,
      filterConfig,
      sortConfig,
      mapComponent,
    } = this.props;
    const primaryFilters = filterConfig.filter(f => f.group === 'primary');
    const secondaryFilters = filterConfig.filter(f => f.group !== 'primary');
    const hasSecondaryFilters = !!(secondaryFilters && secondaryFilters.length > 0);
    console.log(listings);

    const selectedFilters = validFilterParams(urlQueryParams, filterConfig);
    const selectedFiltersCount = Object.keys(selectedFilters).length;

    const selectedSecondaryFilters = hasSecondaryFilters
      ? validFilterParams(urlQueryParams, secondaryFilters)
      : {};
    const selectedSecondaryFiltersCount = Object.keys(selectedSecondaryFilters).length;

    const propsForSecondaryFiltersToggle = hasSecondaryFilters
      ? {
        isSecondaryFiltersOpen: this.state.isSecondaryFiltersOpen,
        toggleSecondaryFiltersOpen: isOpen => {
          this.setState({ isSecondaryFiltersOpen: isOpen });
        },
        selectedSecondaryFiltersCount,
      }
      : {};

    const hasPaginationInfo = !!pagination && pagination.totalItems != null;
    const totalItems = searchParamsAreInSync && hasPaginationInfo ? pagination.totalItems : 0;
    const listingsAreLoaded = !searchInProgress && searchParamsAreInSync && hasPaginationInfo;

    const sortBy = mode => {
      const conflictingFilterActive = isAnyFilterActive(
        sortConfig.conflictingFilters,
        urlQueryParams,
        filterConfig
      );

      const mobileClassesMaybe =
        mode === 'mobile'
          ? {
            rootClassName: css.sortBy,
            menuLabelRootClassName: css.sortByMenuLabel,
          }
          : {};
      return sortConfig.active ? (
        <SortBy
          {...mobileClassesMaybe}
          sort={urlQueryParams[sortConfig.queryParamName]}
          isConflictingFilterActive={!!conflictingFilterActive}
          onSelect={this.handleSortBy}
          showAsPopup
          contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
        />
      ) : null;
    };

    const classes = classNames(rootClassName || css.searchResultContainer, className);

    var responsive = {
      dots: false,
      arrows: false,
      infinite: false,
      speed: 500,
      autoplay: true,
      slidesToShow: 7,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 6,
          },
        },
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 580,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 414,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    };
    return (
      <>
        <div className="car-rental-app">
          <header>
            <div className="location">
              {/* <MapPin className="icon" /> */}
              <span>Ahmedabad, INDIA</span>
            </div>
            <div className="avatar">
              <img src="/placeholder.svg?height=40&width=40" alt="User Avatar" />
            </div>
          </header>

          <main>
            <section className="welcome">
              <h1>Hello Johnson 👋</h1>
              <p>Let's find your favourite car here</p>
            </section>

            <section className="search">
              <div className="search-input">
                {/* <Search className="icon" /> */}
                <input
                  type="text"
                  placeholder="Search"
                  // value={searchQuery}
                />
              </div>
              <button className="filter-button">
                {/* <SlidersHorizontal className="icon" /> */}
              </button>
            </section>

            <section className="trending-brands">
              <div className="section-header">
                <h2>Trending Brands</h2>
                <button className="view-all">View All</button>
              </div>
              <div className="brand-list">
                {trendingBrands.map((brand) => (
                  <div key={brand.name} className="brand-item">
                    <div className="brand-logo">
                      <img src={brand.logo} alt={brand.name} />
                    </div>
                    <span>{brand.name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="popular-cars">
              <div className="section-header">
                <h2>Popular Cars</h2>
                <button className="view-all">View All</button>
              </div>
              <div className="car-list">
                {popularCars.map((car) => (
                  <div key={car.id} className="car-card">
                    <div className="car-image">
                      <img src={car.image} alt={car.name} />
                      <button
                        className={`favorite-button`}
                      >
                        {/* <Heart className="icon" /> */}
                      </button>
                    </div>
                    <div className="car-details">
                      <div className="car-header">
                        <h3>{car.name}</h3>
                        <div className="rating">
                          {/* <Star className="icon" /> */}
                          <span>{car.rating}</span>
                        </div>
                      </div>
                      <div className="car-specs">
                        <div className="spec">
                          <span className="emoji">🏎️</span>
                          <span>{car.horsepower}</span>
                        </div>
                        <div className="spec">
                          <span className="emoji">⚙️</span>
                          <span>{car.transmission}</span>
                        </div>
                      </div>
                      <div className="car-price">
                        <span>${car.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>

          <style jsx>{`
        .car-rental-app {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          max-width: 100%;
          margin: 0 auto;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .location {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #666;
        }

        .location .icon {
          margin-right: 5px;
        }

        .avatar img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .welcome h1 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .welcome p {
          font-size: 16px;
          color: #666;
          margin-bottom: 20px;
        }

        .search {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .search-input {
          flex-grow: 1;
          position: relative;
        }

        .search-input input {
          width: 100%;
          padding: 12px 40px;
          border: none;
          border-radius: 25px;
          background-color: #fff;
          font-size: 16px;
        }

        .search-input .icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
        }

        .filter-button {
          background-color: #e9f9ee;
          border: none;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .filter-button:hover {
          background-color: #d7f7e3;
        }

        .filter-button .icon {
          color: #4caf50;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .section-header h2 {
          font-size: 18px;
          font-weight: 600;
        }

        .view-all {
          font-size: 14px;
          color: #4a90e2;
          background: none;
          border: none;
          cursor: pointer;
        }

        .brand-list {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 10px;
        }

        .brand-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }

        .brand-logo {
          width: 60px;
          height: 60px;
          background-color: #fff;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .brand-logo img {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .brand-item span {
          font-size: 12px;
          color: #666;
        }

        .car-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .car-card {
          background-color: #fff;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .car-image {
          position: relative;
        }

        .car-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .favorite-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #fff;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .favorite-button .icon {
          color: #999;
          transition: color 0.3s ease;
        }

        .favorite-button.active .icon {
          color: #ff4081;
        }

        .car-details {
          padding: 15px;
        }

        .car-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .car-header h3 {
          font-size: 18px;
          font-weight: 600;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .rating .icon {
          color: #ffc107;
        }

        .car-specs {
          display: flex;
          gap: 20px;
          margin-bottom: 10px;
        }

        .spec {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .emoji {
          font-size: 18px;
        }

        .car-price {
          font-size: 20px;
          font-weight: bold;
          color: #4a90e2;
        }

        @media (max-width: 480px) {
          .car-rental-app {
            padding: 15px;
          }

          .welcome h1 {
            font-size: 22px;
          }

          .welcome p {
            font-size: 14px;
          }

          .search-input input {
            font-size: 14px;
          }

          .brand-logo {
            width: 50px;
            height: 50px;
          }

          .brand-logo img {
            width: 30px;
            height: 30px;
          }

          .car-header h3 {
            font-size: 16px;
          }

          .car-price {
            font-size: 18px;
          }
        }
      `}</style>
        </div>
      </>
    );
  }
}

MainPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listings: [],
  resultsCount: 0,
  pagination: null,
  searchParamsForPagination: {},
  filterConfig: config.custom.filters,
  sortConfig: config.custom.sortConfig,
};

MainPanel.propTypes = {
  className: string,
  rootClassName: string,

  urlQueryParams: object.isRequired,
  listings: array,
  searchInProgress: bool.isRequired,
  searchListingsError: propTypes.error,
  searchParamsAreInSync: bool.isRequired,
  onActivateListing: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onOpenModal: func.isRequired,
  onCloseModal: func.isRequired,
  onMapIconClick: func.isRequired,
  pagination: propTypes.pagination,
  searchParamsForPagination: object,
  showAsModalMaxWidth: number.isRequired,
  filterConfig: propTypes.filterConfig,
  sortConfig: propTypes.sortConfig,

  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default MainPanel;
