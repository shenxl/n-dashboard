import React, { Component, PropTypes } from 'react';
import { Modal, Popover, Row, Col, Input, Button, Checkbox, DatePicker } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import classnames from 'classnames';
import MonthRange from './MonthRange'
import styles from './dateQuery.less'


const { MonthPicker, RangePicker } = DatePicker;
const DateQuery = ({ exportData, dispatch }) => {
  const { date, isMonthesShow, isRangeMonthShow, isSingleMonthShow } = exportData;
  const showMonthes = classnames({
    [styles.monthesHide]: !isMonthesShow,
    [styles.monthesShow]: isMonthesShow,
  });
  const showSingleMonthes = classnames({
    [styles.singleMonthHide]: !isSingleMonthShow,
    [styles.singleMonthShow]: isSingleMonthShow,
  });
  const showRangeMonthes = classnames({
    [styles.rangeMonthHide]: !isRangeMonthShow,
    [styles.rangeMonthShow]: isRangeMonthShow,
  });
  const monthesBtn = () => {
    dispatch({ type: 'exportData/toggleMonthes' })
  }
  const monthesSingleBtn = () => {
    dispatch({ type: 'exportData/toggleSigleMonth' })
  }
  const monthesRangeBtn = () => {
    dispatch({ type: 'exportData/toggleRangeMonth' })
  }
  const changeOneMonth = () => {
    const now = moment(new Date());
    dispatch({
      type: 'exportData/changeDate',
      payload: { start: { year: now.year(), month: now.month() + 1 },
        end: { year: now.year(), month: now.month() + 1 } },
    });
  }

  const changeThreeMonthes = () => {
    const now = moment(new Date());
    const beforeThreeMonth = moment(new Date()).add(-2, 'M');
    dispatch({
      type: 'exportData/changeDate',
      payload: {
        start: { year: now.year(), month: now.month() + 1 },
        end: { year: beforeThreeMonth.year(), month: beforeThreeMonth.month() + 1 },
      },
    });
  }
  const changeSixMonthes = () => {
    const now = moment(new Date());
    const beforeSixMonth = moment(new Date()).add(-5, 'M');

    dispatch({
      type: 'exportData/changeDate',
      payload: {
        start: { year: now.year(), month: now.month() + 1 },
        end: { year: beforeSixMonth.year(), month: beforeSixMonth.month() + 1 },
      },
    });
  }
  const onMontChange = (date, dateString) => {
    dispatch({
      type: 'exportData/changeDate',
      payload: {
        start: { year: date.year(), month: date.month() + 1 },
        end: { year: date.year(), month: date.month() + 1 },
      },
    });
  }
  const onRangeChange = (date, dateString) => {
    dispatch({
      type: 'exportData/changeDate',
      payload: {
        start: { year: date[1].year(), month: date[1].month() + 1 },
        end: { year: date[0].year(), month: date[0].month() + 1 },
      },
    });
  }
  return (
    <div>
      <div className={styles.btns}>
        <Button type="primary" onClick={monthesBtn}>近期查询</Button>
        <Button style={{ marginLeft: 10 }}type="primary" onClick={monthesSingleBtn}>单月查询</Button>
        <Button style={{ marginLeft: 10 }} type="primary" onClick={monthesRangeBtn}>月区间查询</Button>
      </div>
      <div className={showMonthes}>
        <Button onClick={changeOneMonth} type="primary">最近一月</Button>
        <Button onClick={changeThreeMonthes} style={{ marginLeft: 6 }} type="primary">最近三月</Button>
        <Button onClick={changeSixMonthes} style={{ marginLeft: 6 }} type="primary">最近半年</Button>
      </div>
      <div className={showSingleMonthes}>
        <MonthPicker onChange={onMontChange} defaultValue={moment(new Date(), 'YYYY-MM')} placeholder="请选择月份" />
      </div>
      <div className={showRangeMonthes}>
        <RangePicker
          onChange={onRangeChange}
          format="YYYY-MM"
          defaultValue={[moment(new Date(), 'YYYY-MM-DD'), moment(new Date(), 'YYYY-MM-DD')]}
        />
      </div>
    </div>
  );
}


DateQuery.propTypes = {
};
const mapStateToProps = ({ exportData }) => {
  return { exportData }
}
export default connect(mapStateToProps)(DateQuery);
