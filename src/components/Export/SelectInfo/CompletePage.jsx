import React, { Component, PropTypes } from 'react';
import { Modal, Popover, Row, Col, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
import styles from './completePage.less'

const CheckboxGroup = Checkbox.Group;

const CompletePage = ({ exportData, dispatch }) => {
  return (
    <div>
      <div className={styles.leftBtn}><input type="button" value="导出明细" /></div>
      <div className={styles.rightBtn}><input type="button" value="导出汇总" /></div>
    </div>
  );
}
CompletePage.propTypes = {
};
const mapStateToProps = ({ exportData }) => {
  return { exportData }
}
export default connect(mapStateToProps)(CompletePage);
