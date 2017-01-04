import React, { Component, PropTypes } from 'react';
import { Steps, message, Row, Col, Pagination, Input, Button, Icon, Tabs, DatePicker, Badge } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import classnames from 'classnames';
import ExportDataModal from '../../components/Export/ExportDataModal';
//import { apiUrl } from '../utils/constant'
import styles from './exportData.less';

const Step = Steps.Step;


const ExportData = ({ exportdata, dispatch }) => {
  const { current, isDownData } = exportdata;
  const showDownModal = () => {
    dispatch({
      type: 'exportdata/changeDownload',
      payload: {
        isDownData: true,
      },
    });
  }
  const handleCancel = () => {
    dispatch({
      type: 'exportdata/changeDownload',
      payload: {
        isDownData: false,
      },
    });
  }

  const next = () => {
    const add = current + 1;
    dispatch({
      type: 'exportdata/changeDownload',
      payload: {
        current: add,
      },
    });
  }
  const prev = () => {
    const reduce = current - 1;
    dispatch({
      type: 'exportdata/changeDownload',
      payload: {
        current: reduce,
      },
    });
  }
  const steps = [{
    title: '数据导出',
    content: <Button onClick={showDownModal} type="primary" icon="export" >开始导出</Button>,
  }, {
    title: '下载文件',
    content: <Button type="primary" icon="download" >文件下载</Button>,
  }, {
    title: '完成状态',
    content: (<Button type="ghost">
       文件状态显示
    </Button>),
  }];
  return (
    <div>
      <Steps current={current}>
        {steps.map((item, key) =>
          <Step key={item.title} icon={(key === 0 && <Icon type="export" />) || (key === 1 && <Icon type="download" />) || (key === 2 && <Icon type="file" />)} title={item.title} />)}
      </Steps>
      <div className={styles.steps_content}>{steps[current].content}</div>
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
      <ExportDataModal isDownData={isDownData} handleCancel={handleCancel} />
    </div>
  );
}


ExportData.PropTypes = {
}
const mapStateToProps = ({ exportdata }) => {
  return { exportdata }
}
export default connect(mapStateToProps)(ExportData);
