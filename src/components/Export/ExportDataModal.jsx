import React, { Component, PropTypes } from 'react';
import { Upload, Modal, message, Button, Icon } from 'antd';
import classnames from 'classnames';
import ExportSelectModal from './ExportSelectModal';
import styles from './exportDataModal.less';

const DownloadModal = (props) => {
  const { isDownData, handleCancel } = props;

  return (
    <Modal
      title="开始导出数据" visible={isDownData}
      onCancel={handleCancel}
      okText="确认" cancelText="取消"
      width={900}
    >
      <ExportSelectModal />
    </Modal>
  );
}
DownloadModal.PropTypes = {
}
export default DownloadModal
