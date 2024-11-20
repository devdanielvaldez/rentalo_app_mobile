import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconUser.module.css';

const IconUser = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg className={classes} width="14" height="14" viewBox="0 0 19.655 21.862">
      <g id="Icon_feather-user" data-name="Icon feather-user" transform="translate(-5 -3.5)">
        <path
          id="Path_5437"
          data-name="Path 5437"
          d="M23.655,29.121V26.914A4.414,4.414,0,0,0,19.241,22.5H10.414A4.414,4.414,0,0,0,6,26.914v2.207"
          transform="translate(0 -4.759)"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          id="Path_5438"
          data-name="Path 5438"
          d="M20.827,8.914A4.414,4.414,0,1,1,16.414,4.5,4.414,4.414,0,0,1,20.827,8.914Z"
          transform="translate(-1.586)"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};

IconUser.defaultProps = {
  rootClassName: null,
  className: null,
  pencilClassName: null,
};

const { string } = PropTypes;

IconUser.propTypes = {
  rootClassName: string,
  className: string,
  pencilClassName: string,
};

export default IconUser;
