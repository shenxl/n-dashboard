import React, { Component, PropTypes } from 'react';
import { Modal, Popover, Row, Col, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';

const CheckboxGroup = Checkbox.Group;

const SelectData = ({ exportData, dispatch }) => {
  const { plainOptions, defaultCheckedList, checkAll } = exportData;
  console.log(defaultCheckedList)
  const onChange = (checkedList) => {
    dispatch({
      type: 'exportData/changeChecked',
      payload: { defaultCheckedList: checkedList,
        checkAll: checkedList.length === plainOptions.length },
    })
  }
  const onCheckAllChange = (e) => {
    dispatch({
      type: 'exportData/changeChecked',
      payload: { defaultCheckedList: (e.target.checked ? plainOptions : []),
        checkAll: e.target.checked },
    })
  }
// onChange={onCheckAllChange}
// onChange={onChange}
  return (
    <div>
      <div>
        <Checkbox
          checked={checkAll}
          onChange={onCheckAllChange}
        >
            全部
          </Checkbox>
      </div>
      <br />
      <CheckboxGroup
        options={plainOptions}
        value={defaultCheckedList}
        onChange={onChange}
      />
    </div>
  );
}
SelectData.propTypes = {
};
const mapStateToProps = ({ exportData }) => {
  return { exportData }
}
export default connect(mapStateToProps)(SelectData);
