import React, { Component, PropTypes } from 'react';
import { Steps, message, Row, Col, Pagination, Input, Button, Icon, Tabs, DatePicker, Badge } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import classnames from 'classnames';
import FilesButton from '../../components/Import/FilesButton';
import DownloadModal from '../../components/Import/DownloadModal';
import UploadModal from '../../components/Import/UploadModal';
import FilesState from '../../components/Import/FilesState';
//import { apiUrl } from '../utils/constant'
import styles from './importData.less';

const Step = Steps.Step;
const steps = [{
  title: '数据导入',
  content: <Button type="primary" icon="download" >开始导入</Button>,
}, {
  title: '上传文件',
  content: <FilesButton />,
}, {
  title: '完成状态',
  content: <Button type="ghost">
     文件状态显示
</Button>,
}];

class ImportData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map((item, key) =>
            <Step icon={(key === 0 && <Icon type="download" />) || (key === 1 && <Icon type="addfile" />) || (key === 2 && <Icon type="file" />)} title={item.title} />)}

        </Steps>
        <div className={styles.steps_content}>{steps[this.state.current].content}</div>
        <div className={styles.steps_action}>
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>下一步</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" onClick={() => message.success('Processing complete!')}>完成</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} type="ghost" onClick={() => this.prev()}>
              上一步
            </Button>
          }
        </div>
      </div>
    );
  }
}

ImportData.PropTypes = {
}
const mapStateToProps = ({ importdata }) => {
  return { importdata }
}
export default connect(mapStateToProps)(ImportData);
