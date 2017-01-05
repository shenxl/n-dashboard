import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';

const Setting = ({ children }) => {
  return (
    <div >
      <div>
        {children}
      </div>
    </div>
  );
};

Setting.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Setting ;
