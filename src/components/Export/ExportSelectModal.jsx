import React, { Component, PropTypes } from 'react';
import { Steps, message, Row, Col, Pagination, Input, Button, Icon, Tabs, DatePicker, Badge } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import classnames from 'classnames';
import SelectData from './SelectInfo/SelectData';
import DateQuery from './SelectInfo/DateQuery';
import styles from './exportSelectModal.less';

const Step = Steps.Step;


const ExportSelectModal = ({ exportdata, dispatch, global }) => {
  const { selectCurrent } = exportdata;
  const next = () => {
    const add = selectCurrent + 1;
    dispatch({
      type: 'exportdata/changeDownload',
      payload: {
        selectCurrent: add,
      },
    });
  }
  const prev = () => {
    const reduce = selectCurrent - 1;
    dispatch({
      type: 'exportdata/changeDownload',
      payload: {
        selectCurrent: reduce,
      },
    });
  }

  const steps = [{
    title: '数据选择',
    content: <SelectData />,
  }, {
    title: '条件查询',
    content: <div>条件查询</div>,
  }, {
    title: '日期查询',
    content: <DateQuery />,
  }, {
    title: '字段查询',
    content: <div>字段查询</div>,
  }, {
    title: '完成',
    content: <div>完成</div>,
  },
  ];

  return (
    <div className={styles.import}>
      <Steps current={selectCurrent}>
        {steps.map((item, key) =>
          <Step key={item.title} title={item.title} />)}

      </Steps>
      <div className={styles.steps_content}>
        <div className={styles.steps_content_left}>{steps[selectCurrent].content}</div>
        <div className={styles.steps_content_right}>显示已选条件</div>
      </div>
      <div className={styles.steps_action}>
        {
            selectCurrent < steps.length - 1
            &&
            <Button type="primary" onClick={next}>下一步</Button>
          }
        {
            selectCurrent === steps.length - 1
            &&
            <Button type="primary" onClick={() => message.success('Processing complete!')}>完成</Button>
          }
        {
            selectCurrent > 0
            &&
            <Button style={{ marginLeft: 8 }} type="ghost" onClick={prev}>
              上一步
            </Button>
          }
      </div>
    </div>
  );
}

ExportSelectModal.PropTypes = {
}
const mapStateToProps = ({ exportdata, global }) => {
  return { exportdata, global }
}
export default connect(mapStateToProps)(ExportSelectModal);
