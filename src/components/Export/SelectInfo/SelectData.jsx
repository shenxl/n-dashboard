import React, { Component, PropTypes } from 'react';
import { Modal, Popover, Row, Col, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
import styles from './selectData.less'

const CheckboxGroup = Checkbox.Group;

const SelectData = ({ exportData, dispatch }) => {
  const { plainOptions, defaultCheckedList, checkAll, isSelectDataShow } = exportData;
  const showSelectData = classnames({
    [styles.selectHide]: !isSelectDataShow,
    [styles.selectShow]: isSelectDataShow,
  });
  const selectDataBtn = () => {
    dispatch({ type: 'exportData/toggleSelectData' })
  }
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
      <div className={styles.btns}>
        <Button type="primary" onClick={selectDataBtn}>数据类别查询</Button>
      </div>
      <div className={showSelectData}>
        <div className={styles.checkall}>
          <Checkbox
            checked={checkAll}
            onChange={onCheckAllChange}
          >
              全部
            </Checkbox>
        </div>
        <div>
          <CheckboxGroup
            options={plainOptions}
            value={defaultCheckedList}
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
