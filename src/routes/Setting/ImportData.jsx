import React, { Component, PropTypes } from 'react';
import { Steps, message, Row, Col, Pagination, Input, Button, Icon, Tabs, DatePicker, Badge } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import classnames from 'classnames';
import FilesButton from '../../components/Import/FilesButton';
import DownloadModal from '../../components/Import/DownloadModal';
//import SelectData from './SelectData';
//import { apiUrl } from '../utils/constant'
import styles from './importData.less';

const Step = Steps.Step;


const ImportData = ({ importdata, dispatch }) => {
  const { current, isDownShow } = importdata;
  const showDownModal = () => {
    dispatch({
      type: 'importdata/changeDownload',
      payload: {
        isDownShow: true,
      },
    });
  }
  const handleCancel = () => {
    dispatch({
      type: 'importdata/changeDownload',
      payload: {
        isDownShow: false,
      },
    });
  }
  const next = () => {
    const add = current + 1;
    dispatch({
      type: 'importdata/changeDownload',
      payload: {
        current: add,
      },
    });
  }
  const prev = () => {
    const reduce = current - 1;
    dispatch({
      type: 'importdata/changeDownload',
      payload: {
        current: reduce,
      },
    });
  }

  const steps = [{
    title: '数据导入',
    content: <Button onClick={showDownModal} type="primary" icon="download" >开始导入</Button>,
  }, {
    title: '上传文件',
    content: <FilesButton />,
  }, {
    title: '完成状态',
    content: <Button type="ghost">
       文件状态显示
  </Button>,
  }];
  return (
    <div className={styles.import}>
      <Steps current={current}>
        {steps.map((item, key) =>
          <Step key={item.title} icon={(key === 0 && <Icon type="download" />) || (key === 1 && <Icon type="addfile" />) || (key === 2 && <Icon type="file" />)} title={item.title} />)}

      </Steps>
      <div className={styles.steps_content}>
        {steps[current].content}
      </div>
      <div className={styles.steps_action}>
        {
            current < steps.length - 1
            &&
            <Button type="primary" onClick={next}>下一步</Button>
          }
        {
            current === steps.length - 1
            &&
            <Button type="primary" onClick={() => message.success('Processing complete!')}>完成</Button>
          }
        {
            current > 0
            &&
            <Button style={{ marginLeft: 8 }} type="ghost" onClick={prev}>
              上一步
            </Button>
          }
      </div>

      <DownloadModal isDownShow={isDownShow} handleCancel={handleCancel} />
    </div>
  );
}

ImportData.PropTypes = {
}
const mapStateToProps = ({ importdata }) => {
  return { importdata }
}
export default connect(mapStateToProps)(ImportData);
