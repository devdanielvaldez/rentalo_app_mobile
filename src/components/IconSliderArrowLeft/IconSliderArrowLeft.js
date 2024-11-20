import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconSliderArrowLeft.module.css';

const IconSliderArrowLeft = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg
      className={classes}
      xmlns="http://www.w3.org/2000/svg"
      width="90px"
      height="90px"
      viewBox="0 0 92.063 92.063"
    >
      <defs>
        <filter
          id="Ellipse_18"
          x="0"
          y="0"
          width="92.063"
          height="92.063"
          filterUnits="userSpaceOnUse"
        >
          <feOffset input="SourceAlpha" />
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feFlood floodOpacity="0.141" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g id="Group_6542" dataname="Group 6542" transform="translate(62.055 60.761) rotate(178)">
        <g transform="matrix(-1, -0.03, 0.03, -1, 59.9, 62.89)" filter="url(#Ellipse_18)">
          <circle
            id="Ellipse_18-2"
            dataname="Ellipse 18"
            cx="15.5"
            cy="15.5"
            r="15.5"
            transform="translate(62.06 60.98) rotate(178)"
            fill="#fff"
          />
        </g>
        <g
          id="Icon_feather-chevronsLeft"
          dataname="Icon feather-chevronsLeft"
          transform="translate(10.077 10.671)"
        >
          <path
            id="Path_49"
            dataname="Path 49"
            d="M9,19.466l4.483-4.483L9,10.5"
            transform="translate(-2.724 -10.5)"
            fill="none"
            stroke="#627178"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            id="Path_50"
            dataname="Path 50"
            d="M19.5,19.466l4.483-4.483L19.5,10.5"
            transform="translate(-19.5 -10.5)"
            fill="none"
            stroke="#627178"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </g>
    </svg>
  );
};

IconSliderArrowLeft.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

IconSliderArrowLeft.propTypes = {
  rootClassName: string,
  className: string,
};

export default IconSliderArrowLeft;
