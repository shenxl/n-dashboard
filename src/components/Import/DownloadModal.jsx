import React, { Component, PropTypes } from 'react';
import { Upload, message, Button, Icon } from 'antd';
import classnames from 'classnames';
import styles from './downloadModal.less';

const DownloadModal = (props) => {
  const { isDownShow } = props;
  const showStyle = classnames({
    [styles.sideBoxHide]: !isDownShow,
    [styles.sideBoxShow]: isDownShow,
  });
  return (
    <div className={showStyle} >
      <Button type="primary" icon="download" >数据导入</Button>
    </div>
  );
}
DownloadModal.PropTypes = {
}
export default DownloadModal
