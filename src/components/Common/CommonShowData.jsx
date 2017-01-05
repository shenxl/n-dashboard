import React, { Component, PropTypes } from 'react';
import { Row, Col, Input, Button, Icon, Tabs, DatePicker } from 'antd';
import moment from 'moment';
import { connect } from 'dva';

import ActivityPanel from '../../components/Company/ActivityPanel';
import BasicPanel from '../../components/Company/BasicPanel';
import VersionPie from '../../components/Chart/VersionPie';

import { converId, converServer, conver } from '../../utils/reportCommon';

const _ = require('lodash');

const TabPane = Tabs.TabPane;
const MonthPicker = DatePicker.MonthPicker;

const CommonShowData = ({ dispatch, companies, global, report }) => {
  // 地区变化的 dispatch
  const { tabState, selectedRowKeys,
      subSelect, currentType, currentIndustry } = companies;
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


  const onSubChangeTab = (key) => {
    dispatch({
      type: 'companies/setSubSelect',
      payload: { subSelect: key },
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

  const BasicPanelProps = {
  }

  const ActivityPanelProps = {
    company: companies.currentItem,
  }

  const versionPiePanelProps = {
    report,
  }

  return (
    <div>

      <Tabs onChange={onSubChangeTab} activeKey={subSelect}>
        <TabPane tab={<span><Icon type="solution" />基本信息面板</span>} key="sub-basic">
          <BasicPanel {...BasicPanelProps} />
        </TabPane>
        <TabPane tab={<span><Icon type="line-chart" />报活面板</span>} key="sub-activity">
          <ActivityPanel {...ActivityPanelProps} />
        </TabPane>
        <TabPane tab={<span><Icon type="pie-chart" />版本面板</span>} key="subVersion">
          <VersionPie {...versionPiePanelProps} />
        </TabPane>
      </Tabs>

    </div>
  );
};

CommonShowData.propTypes = {

};

const mapStateToProps = ({ companies, global, report }) => {
  return { companies, global, report }
}
export default connect(mapStateToProps)(CommonShowData);
