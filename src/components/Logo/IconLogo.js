import React from 'react';
import PropTypes from 'prop-types';
import logo from './logo1.png';

const IconLogo = props => {
  const { className, ...rest } = props;

  return <img className={className} {...rest} src={logo} alt='logotipo' />;
};

const { string } = PropTypes;

IconLogo.defaultProps = {
  className: null,
};

IconLogo.propTypes = {
  className: string,
};

export default IconLogo;
