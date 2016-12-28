import React, { Component, PropTypes } from 'react';
import { Button, Row, Col } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './test.less';

import MonthlyTable from '../../components/CompanyMonthly/MonthlyTable';
import MonthlyFrom from '../../components/CompanyMonthly/MonthlyFrom';


function Test({ dispatch, companyMonthly }) {
  const { selectedRowKeys, currentItem, modalMode } = companyMonthly;
  const company_id = 7522;
  const server_id = 99;
  const loadMonthly = () => {
    dispatch({ type: 'companyMonthly/getInnerData', payload: company_id });
  }
  const onRowClick = (record, index) => {
    dispatch({
      type: 'companyMonthly/getCurrentItem',
      payload: {
        company_id: record.company_id,
        server_id: record.server_id,
        year: record.year,
        month: record.month,
      },
    });

    dispatch({
      type: 'companyMonthly/setSelectedRowKeys',
      payload: { selectedRowKeys: [index] },
    });
  }
  const companyName = '测试企业';
  const onCreateInner = () => {
    const date = new Date();
    dispatch({
      type: 'companyMonthly/setCurrentItem',
      payload: { currentItem: { company_id, server_id, year: date.getFullYear(), month: date.getMonth() + 1 } },
    });
    dispatch({
      type: 'companyMonthly/setModalMode',
      payload: { modalMode: 'create' },
    });
  }
  const onRemoveInner = (record, event) => {
    event.stopPropagation();
    dispatch({
      type: 'companyMonthly/removeCurrentItem',
      payload: {
        company_id: record.company_id,
        server_id: record.server_id,
        year: record.year,
        month: record.month,
      },
    });

    dispatch({
      type: 'companyMonthly/setSelectedRowKeys',
      payload: { selectedRowKeys: [0] },
    });
  }

  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      const record = selectedRows[0];
      dispatch({
        type: 'companyMonthly/getCurrentItem',
        payload: {
          company_id: record.company_id,
          server_id: record.server_id,
          year: record.year,
          month: record.month,
        },
      });

      dispatch({
        type: 'companyMonthly/setSelectedRowKeys',
        payload: { selectedRowKeys },
      });
    },
  };

  const monthlyTableProps = {
    companyMonthly,
    companyName,
    onRowClick,
    rowSelection,
    onRemoveInner,
    onCreateInner,
  }

  const onMonthlyFieldsChange = (fields) => {
    dispatch({
      type: 'companyMonthly/updateCurrentItem',
      payload: fields,
    });
  }

  const onSubmitClick = () => {
    dispatch({
      type: 'companyMonthly/replaceOrCreate',
    });
  }

  const monthlyFromProps = {
    currentItem,
    modalMode,
    onMonthlyFieldsChange,
    onSubmitClick,
  }
  return (
    <div>
      <span className={styles.testTitle} >Hello world </span>
      <Button onClick={loadMonthly}> 加载数据 </Button>
      <Row gutter={40}>
        <Col span={15}>
          <MonthlyTable {...monthlyTableProps} />
        </Col>
        <Col span={9}>
          { modalMode === '' ? (<div />) : <MonthlyFrom {...monthlyFromProps} />}
        </Col>

      </Row>
    </div>
  );
}

Test.propTypes = {

};
function mapStateToProps({ companyMonthly }) {
  return { companyMonthly }
}

export default connect(mapStateToProps)(Test);
