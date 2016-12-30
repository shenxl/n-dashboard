import React, { Component, PropTypes } from 'react';
import { Upload, message, Button, Icon } from 'antd';
import classnames from 'classnames';
import styles from './filesState.less';

const FilesState = (props) => {
  const { isStateShow, onclick } = props;
  const showStyle = classnames({
    [styles.sideBoxHide]: !isStateShow,
    [styles.sideBoxShow]: isStateShow,
  });
  return (
    <div className={showStyle} >
      <div className={styles.next}>
        <Button onClick={onclick} className={styles.next} type="ghost">
          <Icon type="arrow-right" /> 完成
        </Button>
      </div>
    </div>
  );
}
FilesState.PropTypes = {
}
export default FilesState
