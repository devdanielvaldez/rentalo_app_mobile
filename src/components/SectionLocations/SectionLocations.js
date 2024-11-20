import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import css from './SectionLocations.module.css';
import { Tabs, Tab } from 'react-tabs-scrollable';
import altice from './images/Altice_logo.png';
import startlab from './images/startlab.png';
import awm from './images/awm-logo.png';
import teco from './images/tech.jpg';
import aurora from './images/aurora-logo.png';
import sura from '../../assets/logo_sura.png';

// Define action types
const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
};

const SectionLocations = props => {
  const { rootClassName, className } = props;

  // Initialize state using useReducer
  const [state, dispatch] = useReducer(reducer, {
    activeTab: 0, // Start from the first tab
  });

  const classes = classNames(rootClassName || css.root, className);

  // Function to handle tab click
  const onTabClick = index => {
    dispatch({ type: SET_ACTIVE_TAB, payload: index });
  };

  // Function to automatically switch tabs
  const autoScroll = () => {
    const nextTab = (state.activeTab + 1) % 6; // Assuming you have 6 tabs
    dispatch({ type: SET_ACTIVE_TAB, payload: nextTab });
  };

  useEffect(() => {
    // Start auto-scrolling when component mounts
    const intervalId = setInterval(autoScroll, 1000); // Change tab every 3 seconds

    // Clean up interval when component unmounts
    return () => clearInterval(intervalId);
  }, [state.activeTab]); // Re-run effect when activeTab changes

  return (
    <div className={classes}>
      <div className={css.ourClientsSec}>
        <div className={css.ourClientsInfo}>
          <h1 className={css.heading}>
            Descubre quiénes hablan de nosotros
          </h1>
          <p className={css.pTag}>
            <FormattedMessage id="SectionLocations.description" />
          </p>
        </div>

        <Tabs
          activeTab={state.activeTab}
          onTabClick={onTabClick}
          className={css.tabs}
          hideNavBtnsOnMobile={true}
          hideNavBtns={true}
        >
          <Tab>
            <a target="_blank" href="https://www.segurossura.com.do/">
              <img src={sura} className={css.image} alt="Sura" />
            </a>
          </Tab>
          {/* <Tab>
            <a target="_blank" href="https://www.altice.com.do/">
              <img width="50px" src={altice} className={css.image} alt="Altice" />
            </a>
          </Tab> */}
          {/* <Tab>
            <a target="_blank" href="http://startlab.do/">
              <img src={startlab} className={css.image} alt="Startlab" />
            </a>
          </Tab> */}
          <Tab>
            <a target="_blank" href="https://www.laaurora.com.do/">
              <img src={aurora} className={css.image} alt="Laaurora" />
            </a>
          </Tab>
          <Tab>
            <a target="_blank" href="http://awm.do">
              <img src={awm} className={css.image} alt="Awm" />
            </a>
          </Tab>
          <Tab>
            <a target="_blank" href="https://t-ecogroup.net">
              <img src={teco} className={css.image} alt="T-ecogroup" />
            </a>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

SectionLocations.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionLocations.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionLocations;
