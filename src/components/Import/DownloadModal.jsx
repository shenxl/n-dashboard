import React, { Component, PropTypes } from 'react';
import { Upload, Modal, message, Button, Icon } from 'antd';
import classnames from 'classnames';
//import ImportSelectModal from './ImportSelectModal';
import styles from './downloadModal.less';

const DownloadModal = (props) => {
  const { isDownShow, handleCancel } = props;

  return (

    <Modal
      title="链接模板" visible={isDownShow}
      onCancel={handleCancel}
      okText="确认" cancelText="取消"
      width={900}
    />

  );
}
DownloadModal.PropTypes = {
}
export default DownloadModal
