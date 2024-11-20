import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import css from './CvPage.module.css';
import SideNav from '../../components/SideNav/SideNav';
import green from './Group 2334.svg';
import './mui2.css';

const CvPage = () => {
  // const { siteTwitterHandle, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  const pageName=["Trabaja con nosotros"]

  return (
    <StaticPage
      title="CV"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'CvPage',
        description: 'CV',
        name: 'Cv page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          <div className={css.sideNav}>
            <SideNav />
          </div>
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={css.contentWrapper}>
            {' '}
            <div className={css.mobile}>
              <p className={css.mobileText}>{pageName}</p>
            </div>
            <div className={css.cvReceived}>
              <span className={css.pattern1}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="357.498"
                  height="46.239"
                  viewBox="0 0 357.498 46.239"
                >
                  <path
                    id="Path_2107"
                    data-name="Path 2107"
                    d="M7403.086,10900.613c-5.712-1.717-84.25-42.063-192.777,7.727s-164.217-7.727-164.217-7.727"
                    transform="translate(-7045.733 -10883.025)"
                    fill="none"
                    stroke="#f1a501"
                    strokeWidth="1"
                    stroke-dasharray="9"
                  />
                </svg>
              </span>
              <span className={css.pattern2}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="357.498"
                  height="46.239"
                  viewBox="0 0 357.498 46.239"
                >
                  <path
                    id="Path_2327"
                    data-name="Path 2327"
                    d="M7046.092,10900.613c5.712-1.717,84.25-42.063,192.777,7.727s164.217-7.727,164.217-7.727"
                    transform="translate(-7045.948 -10883.025)"
                    fill="none"
                    stroke="#f1a501"
                    strokeWidth="1"
                    stroke-dasharray="9"
                  />
                </svg>
              </span>
              <span className={css.pattern3}>
                <svg
                  id="Group_868"
                  data-name="Group 868"
                  xmlns="http://www.w3.org/2000/svg"
                  width="86"
                  height="86"
                  viewBox="0 0 86 86"
                >
                  <g id="Component_15_1" data-name="Component 15 – 1" transform="translate(0 80)">
                    <circle
                      id="Ellipse_23"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_2" data-name="Component 15 – 2" transform="translate(16 80)">
                    <circle
                      id="Ellipse_23-2"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_3" data-name="Component 15 – 3" transform="translate(32 80)">
                    <circle
                      id="Ellipse_23-3"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_4" data-name="Component 15 – 4" transform="translate(48 80)">
                    <circle
                      id="Ellipse_23-4"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_5" data-name="Component 15 – 5" transform="translate(64 80)">
                    <circle
                      id="Ellipse_23-5"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_6" data-name="Component 15 – 6" transform="translate(80 80)">
                    <circle
                      id="Ellipse_23-6"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_7" data-name="Component 15 – 7" transform="translate(0 64)">
                    <circle
                      id="Ellipse_23-7"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_8" data-name="Component 15 – 8" transform="translate(16 64)">
                    <circle
                      id="Ellipse_23-8"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_9" data-name="Component 15 – 9" transform="translate(32 64)">
                    <circle
                      id="Ellipse_23-9"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_10"
                    data-name="Component 15 – 10"
                    transform="translate(48 64)"
                  >
                    <circle
                      id="Ellipse_23-10"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_11"
                    data-name="Component 15 – 11"
                    transform="translate(64 64)"
                  >
                    <circle
                      id="Ellipse_23-11"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_12"
                    data-name="Component 15 – 12"
                    transform="translate(80 64)"
                  >
                    <circle
                      id="Ellipse_23-12"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_13" data-name="Component 15 – 13" transform="translate(0 48)">
                    <circle
                      id="Ellipse_23-13"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_14"
                    data-name="Component 15 – 14"
                    transform="translate(16 48)"
                  >
                    <circle
                      id="Ellipse_23-14"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_15"
                    data-name="Component 15 – 15"
                    transform="translate(32 48)"
                  >
                    <circle
                      id="Ellipse_23-15"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_16"
                    data-name="Component 15 – 16"
                    transform="translate(48 48)"
                  >
                    <circle
                      id="Ellipse_23-16"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_17"
                    data-name="Component 15 – 17"
                    transform="translate(64 48)"
                  >
                    <circle
                      id="Ellipse_23-17"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_18"
                    data-name="Component 15 – 18"
                    transform="translate(80 48)"
                  >
                    <circle
                      id="Ellipse_23-18"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_19" data-name="Component 15 – 19" transform="translate(0 32)">
                    <circle
                      id="Ellipse_23-19"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_20"
                    data-name="Component 15 – 20"
                    transform="translate(16 32)"
                  >
                    <circle
                      id="Ellipse_23-20"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_21"
                    data-name="Component 15 – 21"
                    transform="translate(32 32)"
                  >
                    <circle
                      id="Ellipse_23-21"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_22"
                    data-name="Component 15 – 22"
                    transform="translate(48 32)"
                  >
                    <circle
                      id="Ellipse_23-22"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_23"
                    data-name="Component 15 – 23"
                    transform="translate(64 32)"
                  >
                    <circle
                      id="Ellipse_23-23"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_24"
                    data-name="Component 15 – 24"
                    transform="translate(80 32)"
                  >
                    <circle
                      id="Ellipse_23-24"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_25" data-name="Component 15 – 25" transform="translate(0 16)">
                    <circle
                      id="Ellipse_23-25"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_26"
                    data-name="Component 15 – 26"
                    transform="translate(16 16)"
                  >
                    <circle
                      id="Ellipse_23-26"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_27"
                    data-name="Component 15 – 27"
                    transform="translate(32 16)"
                  >
                    <circle
                      id="Ellipse_23-27"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_28"
                    data-name="Component 15 – 28"
                    transform="translate(48 16)"
                  >
                    <circle
                      id="Ellipse_23-28"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_29"
                    data-name="Component 15 – 29"
                    transform="translate(64 16)"
                  >
                    <circle
                      id="Ellipse_23-29"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_30"
                    data-name="Component 15 – 30"
                    transform="translate(80 16)"
                  >
                    <circle
                      id="Ellipse_23-30"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_31" data-name="Component 15 – 31">
                    <circle
                      id="Ellipse_23-31"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_32" data-name="Component 15 – 32" transform="translate(16)">
                    <circle
                      id="Ellipse_23-32"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_33" data-name="Component 15 – 33" transform="translate(32)">
                    <circle
                      id="Ellipse_23-33"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_34" data-name="Component 15 – 34" transform="translate(48)">
                    <circle
                      id="Ellipse_23-34"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_35" data-name="Component 15 – 35" transform="translate(64)">
                    <circle
                      id="Ellipse_23-35"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_36" data-name="Component 15 – 36" transform="translate(80)">
                    <circle
                      id="Ellipse_23-36"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                </svg>
              </span>
              <span className={css.pattern4}>
                <svg
                  id="Group_868"
                  data-name="Group 868"
                  xmlns="http://www.w3.org/2000/svg"
                  width="86"
                  height="86"
                  viewBox="0 0 86 86"
                >
                  <g id="Component_15_1" data-name="Component 15 – 1" transform="translate(0 80)">
                    <circle
                      id="Ellipse_23"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_2" data-name="Component 15 – 2" transform="translate(16 80)">
                    <circle
                      id="Ellipse_23-2"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_3" data-name="Component 15 – 3" transform="translate(32 80)">
                    <circle
                      id="Ellipse_23-3"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_4" data-name="Component 15 – 4" transform="translate(48 80)">
                    <circle
                      id="Ellipse_23-4"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_5" data-name="Component 15 – 5" transform="translate(64 80)">
                    <circle
                      id="Ellipse_23-5"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_6" data-name="Component 15 – 6" transform="translate(80 80)">
                    <circle
                      id="Ellipse_23-6"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_7" data-name="Component 15 – 7" transform="translate(0 64)">
                    <circle
                      id="Ellipse_23-7"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_8" data-name="Component 15 – 8" transform="translate(16 64)">
                    <circle
                      id="Ellipse_23-8"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_9" data-name="Component 15 – 9" transform="translate(32 64)">
                    <circle
                      id="Ellipse_23-9"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_10"
                    data-name="Component 15 – 10"
                    transform="translate(48 64)"
                  >
                    <circle
                      id="Ellipse_23-10"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_11"
                    data-name="Component 15 – 11"
                    transform="translate(64 64)"
                  >
                    <circle
                      id="Ellipse_23-11"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_12"
                    data-name="Component 15 – 12"
                    transform="translate(80 64)"
                  >
                    <circle
                      id="Ellipse_23-12"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_13" data-name="Component 15 – 13" transform="translate(0 48)">
                    <circle
                      id="Ellipse_23-13"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_14"
                    data-name="Component 15 – 14"
                    transform="translate(16 48)"
                  >
                    <circle
                      id="Ellipse_23-14"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_15"
                    data-name="Component 15 – 15"
                    transform="translate(32 48)"
                  >
                    <circle
                      id="Ellipse_23-15"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_16"
                    data-name="Component 15 – 16"
                    transform="translate(48 48)"
                  >
                    <circle
                      id="Ellipse_23-16"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_17"
                    data-name="Component 15 – 17"
                    transform="translate(64 48)"
                  >
                    <circle
                      id="Ellipse_23-17"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_18"
                    data-name="Component 15 – 18"
                    transform="translate(80 48)"
                  >
                    <circle
                      id="Ellipse_23-18"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_19" data-name="Component 15 – 19" transform="translate(0 32)">
                    <circle
                      id="Ellipse_23-19"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_20"
                    data-name="Component 15 – 20"
                    transform="translate(16 32)"
                  >
                    <circle
                      id="Ellipse_23-20"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_21"
                    data-name="Component 15 – 21"
                    transform="translate(32 32)"
                  >
                    <circle
                      id="Ellipse_23-21"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_22"
                    data-name="Component 15 – 22"
                    transform="translate(48 32)"
                  >
                    <circle
                      id="Ellipse_23-22"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_23"
                    data-name="Component 15 – 23"
                    transform="translate(64 32)"
                  >
                    <circle
                      id="Ellipse_23-23"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_24"
                    data-name="Component 15 – 24"
                    transform="translate(80 32)"
                  >
                    <circle
                      id="Ellipse_23-24"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_25" data-name="Component 15 – 25" transform="translate(0 16)">
                    <circle
                      id="Ellipse_23-25"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_26"
                    data-name="Component 15 – 26"
                    transform="translate(16 16)"
                  >
                    <circle
                      id="Ellipse_23-26"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_27"
                    data-name="Component 15 – 27"
                    transform="translate(32 16)"
                  >
                    <circle
                      id="Ellipse_23-27"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_28"
                    data-name="Component 15 – 28"
                    transform="translate(48 16)"
                  >
                    <circle
                      id="Ellipse_23-28"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_29"
                    data-name="Component 15 – 29"
                    transform="translate(64 16)"
                  >
                    <circle
                      id="Ellipse_23-29"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g
                    id="Component_15_30"
                    data-name="Component 15 – 30"
                    transform="translate(80 16)"
                  >
                    <circle
                      id="Ellipse_23-30"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_31" data-name="Component 15 – 31">
                    <circle
                      id="Ellipse_23-31"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_32" data-name="Component 15 – 32" transform="translate(16)">
                    <circle
                      id="Ellipse_23-32"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_33" data-name="Component 15 – 33" transform="translate(32)">
                    <circle
                      id="Ellipse_23-33"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_34" data-name="Component 15 – 34" transform="translate(48)">
                    <circle
                      id="Ellipse_23-34"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_35" data-name="Component 15 – 35" transform="translate(64)">
                    <circle
                      id="Ellipse_23-35"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                  <g id="Component_15_36" data-name="Component 15 – 36" transform="translate(80)">
                    <circle
                      id="Ellipse_23-36"
                      data-name="Ellipse 23"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="rgba(241,165,1,0.2)"
                    />
                  </g>
                </svg>
              </span>
              <div className={css.cvReceivedInner}>
                <div className={css.cvReceivedLeft}>
                  <img src={green} alt="img" />
                </div>
                <div className={css.cvReceivedRight}>
                  <div className={css.cvReceivedContent}>
                    <h2 className={css.title}>¡Hemos recibido tu hoja de vida!</h2>
                    <p className={css.subtitle}>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                      eirmod tempor invidunt ueos et accusam et justo duo dolores et ea rebum.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        return window.history.back();
                      }}
                      className={css.button}
                    >
                      Volver al inicio
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default CvPage;
