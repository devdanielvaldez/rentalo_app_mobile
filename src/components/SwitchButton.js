import React from 'react';
import Switch from 'react-switch';

const SwitchButton = props => {
  return (
    <Switch
      {...props}
      className="react-switch"
      onColor="#000000"
      onHandleColor="#FFFFFF"
      handleDiameter={30}
      uncheckedIcon={false}
      checkedIcon={false}
      offHandleColor="#eee"
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      height={30}
      width={53}
    />
  );
};

export default SwitchButton;
