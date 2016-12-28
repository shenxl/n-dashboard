import React, { Component, PropTypes } from 'react';
import { Upload, message, Button, Icon } from 'antd';
import classnames from 'classnames';
import styles from './downloadModal.less';

const DownloadFilesModal = (props) => {
  const { isUpShow, onclick } = props;
  const showStyle = classnames({
    [styles.sideBoxHide]: !isUpShow,
    [styles.sideBoxShow]: isUpShow,
  });
  return (
    <div className={showStyle} >
      <div className={styles.upButton}>
        <Button type="ghost">
          <Icon type="download" /> 下载文件
        </Button>
      </div>
      <div className={styles.next}>
        <Button onClick={onclick} className={styles.next} type="ghost">
          <Icon type="arrow-right" /> 下一步
      </Button>
      </div>
    </div>
  );
}
DownloadFilesModal.PropTypes = {
}
export default DownloadFilesModal
