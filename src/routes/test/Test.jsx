import React, { Component, PropTypes } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import RegionGlobal from '../../components/Global/RegionGlobal';

function Test( { dispatch , global }) {

const RegionProps = {
  global,
  dispatch
}
  return (
    <div>
        <RegionGlobal
          {...RegionProps}
          changeOnSelect
          placeholder="请选择省 / 市 / 区"
        />
    </div>
  );
}

Test.propTypes = {

};
function mapStateToProps({ global }) {
  return { global }
}

export default  connect(mapStateToProps)(Test);
