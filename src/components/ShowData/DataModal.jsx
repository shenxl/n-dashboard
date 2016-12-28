import React, { Component, PropTypes } from 'react';
import { Modal, Popover, Row, Col, Input, Button } from 'antd';
import CommonShowData from '../Common/CommonShowData';

const DataModal = ({
  showModalHandleOk,
  showdata,
  showModalHandleCancle,
 }) => {
  const { showDataVisibel } = showdata;
  return (
    <div>
      <Modal
        title="数据显示"
        visible={showDataVisibel}
        onOk={showModalHandleOk}
        onCancel={showModalHandleCancle}
        cancelText="取消"
        width={900}
      >
        <CommonShowData />
      </Modal>
    </div>
  );
};

DataModal.propTypes = {
  showModalHandleOk: PropTypes.func.isRequired,
  showModalHandleCancle: PropTypes.func.isRequired,
};

export default DataModal;
