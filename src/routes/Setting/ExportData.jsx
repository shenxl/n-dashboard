import React, { Component, PropTypes } from 'react';
import { Steps, message, Row, Col, Pagination, Input, Button, Icon, Tabs, DatePicker, Badge } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import classnames from 'classnames';
import FilesButton from '../../components/Import/FilesButton';
import ExportDataModal from '../../components/Export/ExportDataModal';
import DownloadFilesModal from '../../components/Export/DownloadFilesModal';
import FilesState from '../../components/Export/FilesState';
//import { apiUrl } from '../utils/constant'
import styles from './exportData.less';

const Step = Steps.Step;

const ExportData = ({ exportdata, dispatch }) => {
  const { isDownData, isDownFiles, current, isStateShow } = exportdata;
  const onChangeDownload = () => {
    dispatch({
      type: 'exportdata/changeDownload',
      payload: {
        isDownData: true,
        isDownFiles: false,
        isStateShow: false,
        current: 0,
      },
    });
  }
  const onHideDownload = () => {
    dispatch({
      type: 'exportdata/changeDownload',
      payload: {
        isDownData: false,
        isDownFiles: true,
        current: 1,
      },
    });
  }
  const onHideUpload = () => {
    dispatch({
      type: 'exportdata/changeDownload',
      payload: {
        isDownFiles: false,
        isStateShow: true,
        current: 2,
      },
    });
  }
  const onHideFilesState = () => {
    dispatch({
      type: 'exportdata/changeDownload',
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
        <ExportDataModal isDownData={isDownData} onclick={onHideDownload} />
      </div>
      <div >
        <DownloadFilesModal isDownFiles={isDownFiles} onclick={onHideUpload} />
      </div>
      <div>
        <FilesState isStateShow={isStateShow} onclick={onHideFilesState} />
      </div>
    </div>
  );
}


ExportData.PropTypes = {
}
const mapStateToProps = ({ exportdata }) => {
  return { exportdata }
}
export default connect(mapStateToProps)(ExportData);
