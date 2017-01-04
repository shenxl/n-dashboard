import React, { Component, PropTypes } from 'react';
import { Modal, Popover, Row, Col, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
import styles from './completePage.less'

const CheckboxGroup = Checkbox.Group;

const CompletePage = ({ exportData, dispatch }) => {
  return (
    <div>
      <div className={styles.leftBtn}><Button type="primary" icon="tags" >导出明细表</Button></div>
      <div className={styles.rightBtn}><Button type="primary" icon="tag" >导出汇总表</Button></div>
    </div>
  );
}
CompletePage.propTypes = {
};
const mapStateToProps = ({ exportData }) => {
  return { exportData }
}
export default connect(mapStateToProps)(CompletePage);
