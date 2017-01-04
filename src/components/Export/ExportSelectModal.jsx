import React, { Component, PropTypes } from 'react';
import { Steps, message, Row, Col, Pagination, Input, Button, Icon, Tabs, DatePicker, Badge } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import classnames from 'classnames';
import SelectData from './SelectInfo/SelectData';
import DateQuery from './SelectInfo/DateQuery';
import ConditionQuery from './SelectInfo/ConditionQuery';
import ConditionSearchTag from './SelectInfo/ConditionSearchTag';
import CompletePage from './SelectInfo/CompletePage';
import styles from './exportSelectModal.less';

const Step = Steps.Step;


const ExportSelectModal = ({ dispatch, global, companies, exportData }) => {
  const { searchInfo } = companies;
  const { date, defaultCheckedList, selectCurrent } = exportData;
  const { currentTypeOptions } = global;
  const next = () => {
    const add = selectCurrent + 1;
    dispatch({
      type: 'exportData/changeDownload',
      payload: {
        selectCurrent: add,
      },
    });
  }
  const prev = () => {
    const reduce = selectCurrent - 1;
    dispatch({
      type: 'exportData/changeDownload',
      payload: {
        selectCurrent: reduce,
      },
    });
  }
  const onRegionChange = (value) => {
    // console.log(value);
  }
  const onTypeChange = (value, selectedOptions) => {
    // console.log(selectedOptions);
  }
  const setBasicSearch = (basicSearch) => {
    dispatch({
      type: 'companies/setBasicSearch',
      payload: true,
    });
  }
  const AdvanceSearchProps = {
    global,
    onRegionChange,
    onTypeChange,
    dispatch,
    setBasicSearch,
    typeOptions: currentTypeOptions,
  }

  const steps = [{
    title: '数据选择',
    content: <SelectData />,
  }, {
    title: '条件查询',
    content: <div><ConditionQuery {...AdvanceSearchProps} /></div>,
  }, {
    title: '日期查询',
    content: <DateQuery />,
  }, {
    title: '完成',
    content: <CompletePage />,
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
        <div className={styles.steps_content_right}>
          <h3 className={styles.h3}>查询信息显示</h3>
          <div className={styles.selectdatas}>
            数据类别：{defaultCheckedList.join('-')}
          </div>
        开始日期： {date.end.year}-{date.end.month} <br />
        结束日期： {date.start.year}-{date.start.month}
          <div className={styles.conditionQuery}>查询条件：</div>
          <ConditionSearchTag searchInfo={searchInfo} />
        </div>
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
const mapStateToProps = ({ global, companies, exportData }) => {
  return { global, companies, exportData }
}
export default connect(mapStateToProps)(ExportSelectModal);
