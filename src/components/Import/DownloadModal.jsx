import React, { Component, PropTypes } from 'react';
import { Upload, Modal, message, Button, Icon } from 'antd';
import classnames from 'classnames';
import styles from './downloadModal.less';

const DownloadModal = (props) => {
  const { isDownShow, handleCancel } = props;

  return (
    <Modal
      title="开始数据导入" visible={isDownShow}
      onCancel={handleCancel}
      okText="确认" cancelText="取消"
      width={800}
    >
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Modal>
  );
}
DownloadModal.PropTypes = {
}
export default DownloadModal
