import React, { Component, PropTypes } from 'react';
import { Upload, message, Button, Icon } from 'antd';
import classnames from 'classnames';
import FilesButton from './FilesButton';
import styles from './uploadModal.less';

const UploadModal = (props) => {
  const { isUpShow, onclick } = props;
  const showStyle = classnames({
    [styles.sideBoxHide]: !isUpShow,
    [styles.sideBoxShow]: isUpShow,
  });
  return (
    <div className={showStyle} >
      <div className={styles.upButton}>
        <FilesButton />
      </div>
      <div className={styles.next}>
        <Button onClick={onclick} className={styles.next} type="ghost">
          <Icon type="arrow-right" /> 下一步
      </Button>
      </div>
    </div>
  );
}
UploadModal.PropTypes = {
}
export default UploadModal
