import React, { Component, PropTypes } from 'react';
import { Upload, message, Button, Icon } from 'antd';
import classnames from 'classnames';
import styles from './exportDataModal.less';

const ExportDataModal = (props) => {
  const { isDownShow, onclick } = props;
  const showStyle = classnames({
    [styles.sideBoxHide]: !isDownShow,
    [styles.sideBoxShow]: isDownShow,
  });
  return (
    <div className={showStyle} >
      <div className={styles.next}>
        <Button onClick={onclick} className={styles.next} type="ghost">
          <Icon type="arrow-right" /> 下一步
      </Button>
      </div>
    </div>
  );
}
ExportDataModal.PropTypes = {
}
export default ExportDataModal
