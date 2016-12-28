import React, { Component, PropTypes } from 'react';
import { Steps, message, Row, Col, Pagination, Input, Button, Icon, Tabs, DatePicker, Badge } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import classnames from 'classnames';
import FilesButton from '../../components/Import/FilesButton';
import ExportDataModal from '../../components/Export/ExportDataModal';
import DownloadFilesModal from '../../components/Export/DownloadFilesModal';
import FilesState from '../../components/Import/FilesState';
//import { apiUrl } from '../utils/constant'
import styles from './exportData.less';

const Step = Steps.Step;

const ExportData = ({ importdata, dispatch }) => {
  const { isDownShow, isUpShow, current, isStateShow } = importdata;
  const onChangeDownload = () => {
    dispatch({
      type: 'importdata/changeDownload',
      payload: {
        isDownShow: true,
        isUpShow: false,
        isStateShow: false,
        current: 0,
      },
    });
  }
  const onHideDownload = () => {
    dispatch({
      type: 'importdata/changeDownload',
      payload: {
        isDownShow: false,
        isUpShow: true,
        current: 1,
      },
    });
  }
  const onHideUpload = () => {
    dispatch({
      type: 'importdata/changeDownload',
      payload: {
        isUpShow: false,
        isStateShow: true,
        current: 2,
      },
    });
  }
  const onHideFilesState = () => {
    dispatch({
      type: 'importdata/changeDownload',
      payload: {
        isStateShow: false,
        current: 0,
      },
    });
  }
  return (
    <div>
      <Steps current={current}>
        <Step title="导出数据" icon={<Icon type="export" />} />
        <Step title="下载文件" icon={<Icon type="download" />} />
        <Step title="完成状态" icon={<Icon type="file" />} />
      </Steps>
      <div className={styles.downButton}>
        <Button onClick={onChangeDownload} type="primary" icon="upload" >开始导出</Button>
      </div>

      <div >
        <ExportDataModal isDownShow={isDownShow} onclick={onHideDownload} />
      </div>
      <div >
        <DownloadFilesModal isUpShow={isUpShow} onclick={onHideUpload} />
      </div>
      <div>
        <FilesState isStateShow={isStateShow} onclick={onHideFilesState} />
      </div>
    </div>
  );
}


ExportData.PropTypes = {
}
const mapStateToProps = ({ importdata }) => {
  return { importdata }
}
export default connect(mapStateToProps)(ExportData);
