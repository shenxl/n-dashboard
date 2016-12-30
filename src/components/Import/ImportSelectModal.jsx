import React, { Component, PropTypes } from 'react';
import { Steps, message, Row, Col, Pagination, Input, Button, Icon, Tabs, DatePicker, Badge } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import classnames from 'classnames';
import SelectData from './SelectInfo/SelectData';
import styles from './importSelectModal.less';

const Step = Steps.Step;


const ImportSelectModal = ({ importdata, dispatch }) => {
  const { selectCurrent } = importdata;
  //const showDownModal = () => {
  //   dispatch({
  //     type: 'importdata/changeDownload',
  //     payload: {
  //       isDownShow: true,
  //     },
  //   });
  // }
  // const handleCancel = () => {
  //   dispatch({
  //     type: 'importdata/changeDownload',
  //     payload: {
  //       isDownShow: false,
  //     },
  //   });
  // }
  const next = () => {
    const add = selectCurrent + 1;
    dispatch({
      type: 'importdata/changeDownload',
      payload: {
        selectCurrent: add,
      },
    });
  }
  const prev = () => {
    const reduce = selectCurrent - 1;
    dispatch({
      type: 'importdata/changeDownload',
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
    content: <div>日期查询</div>,
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

ImportSelectModal.PropTypes = {
}
const mapStateToProps = ({ importdata }) => {
  return { importdata }
}
export default connect(mapStateToProps)(ImportSelectModal);
