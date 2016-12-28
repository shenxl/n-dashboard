import React, { Component, PropTypes } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Import from '../../components/DataProcessing/Import';

function DataProessingImport({ dispatch, example }) {
  return (
    <Import />
  );
}

DataProessingImport.propTypes = {

};
function mapStateToProps({ example }) {
  return { example }
}

export default connect(mapStateToProps)(DataProessingImport);
