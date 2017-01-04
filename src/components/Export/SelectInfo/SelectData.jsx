import React, { Component, PropTypes } from 'react';
import { Modal, Popover, Row, Col, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
import styles from './selectData.less'

const CheckboxGroup = Checkbox.Group;

const SelectData = ({ exportData, dispatch }) => {
  const { customerType, selectedCustomerType, checkAll,
    isSelectDataShow, indeterminate } = exportData;
  const showSelectData = classnames({
    [styles.selectShow]: true,
  });

  const onChange = (checkedList) => {
    dispatch({
      type: 'exportData/changeChecked',
      payload: {
        selectedCustomerType: checkedList,
        indeterminate: !!checkedList.length && (checkedList.length < customerType.length),
        checkAll: checkedList.length === customerType.length },
    })
  }
  const onCheckAllChange = (e) => {
    dispatch({
      type: 'exportData/changeChecked',

      payload: {
        selectedCustomerType: (e.target.checked ? customerType : []),
        indeterminate: false,
        checkAll: e.target.checked },
    })
  }
  return (
    <div>
      <div className={styles.btns} />
      <div className={showSelectData}>
        <div className={styles.checkall}>
          <Checkbox
            indeterminate={indeterminate}
            checked={checkAll}
            onChange={onCheckAllChange}
          >
              全部
          </Checkbox>
        </div>
        <div>
          <CheckboxGroup
            options={customerType}
            value={selectedCustomerType}
            onChange={onChange}
          />
        </div>
      </div>


    </div>
  );
}
SelectData.propTypes = {
};
const mapStateToProps = ({ exportData }) => {
  return { exportData }
}
export default connect(mapStateToProps)(SelectData);
