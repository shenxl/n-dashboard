import React, { Component, PropTypes } from 'react';
import { Modal, Popover, Row, Col, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
import styles from './selectData.less'

const CheckboxGroup = Checkbox.Group;

const SelectData = ({ exportData, dispatch }) => {
<<<<<<< HEAD
  const { customerType, selectedCustomerType, checkAll, isSelectDataShow } = exportData;
=======
  const { plainOptions, defaultCheckedList, checkAll,
    isSelectDataShow, indeterminate } = exportData;
>>>>>>> 2f453609f0122efbc208592fc2247fe866cc7932
  const showSelectData = classnames({
    [styles.selectShow]: true,
  });

  const onChange = (checkedList) => {
    dispatch({
      type: 'exportData/changeChecked',
<<<<<<< HEAD
      payload: { selectedCustomerType: checkedList,
        checkAll: checkedList.length === customerType.length },
=======
      payload: {
        defaultCheckedList: checkedList,
        indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
        checkAll: checkedList.length === plainOptions.length },
>>>>>>> 2f453609f0122efbc208592fc2247fe866cc7932
    })
  }
  const onCheckAllChange = (e) => {
    dispatch({
      type: 'exportData/changeChecked',
<<<<<<< HEAD
      payload: { selectedCustomerType: (e.target.checked ? customerType : []),
=======
      payload: {
        defaultCheckedList: (e.target.checked ? plainOptions : []),
        indeterminate: false,
>>>>>>> 2f453609f0122efbc208592fc2247fe866cc7932
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
