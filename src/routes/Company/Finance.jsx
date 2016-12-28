import React, { Component, PropTypes } from 'react';
import { Row, Col, Input, Button, Icon, Tabs, DatePicker } from 'antd';
import moment from 'moment';
import { connect } from 'dva';

import AdvancedSearchForm from '../../components/Company/AdvancedSearch';
import BasicTable from '../../components/Company/BasicTable';
import ActivityTable from '../../components/Company/ActivityTable';

import OverviewPanel from '../../components/Company/OverviewPanel';
import SearchTags from '../../components/Company/SearchTags';
import DataModal from '../../components/ShowData/DataModal';
import ReportLine from '../../components/Chart/ReportLine';

import { converId, converServer, conver } from '../../utils/reportCommon';
import styles from './company.less';

const _ = require('lodash');

const TabPane = Tabs.TabPane;
const MonthPicker = DatePicker.MonthPicker;

const Finance = ({ dispatch, companies, global, report, showdata }) => {
  // 地区变化的 dispatch
  const { hideSearchPanel, tabState, searchInfo, selectedRowKeys, subSelect } = companies;
  const { versionLoading, version } = report;
  const { currentTypeOptions } = global;
  const onTypeChange = (value, selectedOptions) => {
    // console.log(selectedOptions);
  }

  const onRegionChange = (value) => {
    // console.log(value);
  }

  const onTableChange = (pagination, filters, sorter) => {
    let order = ''
    // 点击分页、筛选、排序时触发
    if (sorter.order === 'descend') {
      order = `${sorter.field} DESC`
    } else {
      order = sorter.field
    }
    const payload = {
      limit: pagination.pageSize,
      current: pagination.current,
      order,
    };

    dispatch({
      type: 'companies/basicPage',
      payload,
    });

    dispatch({
      type: 'companies/setSelectedRowKeys',
      payload: { selectedRowKeys: [0] },
    });

    dispatch({
      type: 'companies/query',
    });
  }

  const onDateChange = (date, dateString) => {
    dispatch({
      type: 'companies/changeFilterDate',
      payload: {
        year: date.year(),
        month: date.month() + 1,
      },
    });
    dispatch({
      type: 'companies/query',
    });
  }

  const onChartClick = (param, echart) => {
      //  console.log(param, echart);
    const key = _.split(param.name, '-', 2);
    const query = _.assign({}, converId(param.seriesName), { year: key[0], month: key[1] });
    const title = `${query.year}年${query.month}月${param.seriesName} 版本分布图`;
    dispatch({
      type: 'companies/setSubSelect',
      payload: { subSelect: 'subVersion' },
    });

    dispatch({
      type: 'report/setVersionTitle',
      payload: { versionTitle: title },
    });

    dispatch({
      type: 'report/getVersion',
      payload: query,
    });
  };

  const operations = () => {
    switch (tabState) {
      case 'basic':
        return (<div />)
      case 'activity':
        return (
          <div>报活月份:&nbsp;&nbsp;
            <MonthPicker defaultValue={moment(new Date(), 'YYYY-MM-DD')} placeholder="请选择报活月份" onChange={onDateChange} />
          </div>)
      default:
        return undefined;
    }
  }

  const onChangeTab = (key) => {
    dispatch({
      type: 'companies/activity',
      payload: key,
    });
  }


  const setAdvancedSearch = (basicSearch) => {
    dispatch({
      type: 'companies/hideSearchPanel',
      payload: false,
    });
  }

  const hideSearch = () => {
    dispatch({
      type: 'companies/hideSearchPanel',
      payload: true,
    });
  }

  const setBasicSearch = (basicSearch) => {
    dispatch({
      type: 'companies/setBasicSearch',
      payload: true,
    });
  }

  const onRowClick = (record, index) => {
    dispatch({
      type: 'showdata/setModalState',
      payload: {
        showDataVisibel: true,
      },
    });
    dispatch({
      type: 'companies/getCurrentItem',
      payload: record.id,
    });

    dispatch({
      type: 'companies/setSelectedRowKeys',
      payload: { selectedRowKeys: [index] },
    });

    dispatch({
      type: 'companies/setSubSelect',
      payload: { subSelect: `sub-${tabState}` },
    });
  }

  const AdvanceSearchProps = {
    global,
    onRegionChange,
    onTypeChange,
    dispatch,
    hideSearch,
    setBasicSearch,
    typeOptions: currentTypeOptions,
  }

  const searchShow = () => {
    if (!hideSearchPanel) {
      return (<AdvancedSearchForm {...AdvanceSearchProps} />)
    }
    return (
      <div className={styles.simpleSearch}>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button icon="down" onClick={setAdvancedSearch}> 高级检索 </Button>
          </Col>
        </Row>
        <SearchTags searchInfo={searchInfo} />
      </div>)
  };

  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch({
        type: 'companies/getCurrentItem',
        payload: selectedRows[0].id,
      });

      dispatch({
        type: 'companies/setSelectedRowKeys',
        payload: { selectedRowKeys },
      });

      dispatch({
        type: 'companies/setSubSelect',
        payload: { subSelect: `sub-${tabState}` },
      });
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };


  const BasicTableProps = {
    companyList: companies,
    onTableChange,
    onRowClick,
    rowSelection,
  }

  const ActivityTableProps = {
    companyList: companies,
    onTableChange,
    onRowClick,
    rowSelection,
  }

  const ReportLineProps = {
    report,
    onChartClick,
  }

  const overviewPanelProps = {
    baseCompanies: companies,
  }
  const showModalHandleCancle = () => {
    dispatch({
      type: 'showdata/clearModalState',
    });
  }
  const showModalHandleOk = () => {
    dispatch({
      type: 'showdata/clearModalState',
    });
  }
  const orderModalProps = {
    showModalHandleOk,
    showdata,
    showModalHandleCancle,
  }


  return (
    <div>
      <h1 className={styles.h1}>中国经济欣欣向荣</h1>
      <Row gutter={40}>
        {searchShow()}
        <OverviewPanel {...overviewPanelProps} />
        <Col span={23} key={'data-area'}>
          <div>

            <div className={styles.datapane}>
              <Tabs defaultActiveKey="basic" tabBarExtraContent={operations()} onChange={onChangeTab}>
                <TabPane tab={<span><Icon type="solution" />企业明细</span>} key="basic">
                  <BasicTable {...BasicTableProps} />
                </TabPane>
                <TabPane tab={<span><Icon type="line-chart" />报活明细</span>} key="activity">
                  <ActivityTable {...ActivityTableProps} />
                </TabPane>
                <TabPane tab={<span><Icon type="code" />数据展示</span>} key="analysis">
                  <ReportLine {...ReportLineProps} />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Col>

      </Row>
      <DataModal {...orderModalProps} />
    </div>
  );
};

Finance.propTypes = {

};

const mapStateToProps = ({ companies, global, report, showdata }) => {
  return { companies, global, report, showdata }
}
export default connect(mapStateToProps)(Finance);
