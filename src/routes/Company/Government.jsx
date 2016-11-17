import React, { Component, PropTypes } from 'react';
import {  Row, Col, Input, Button, Icon , Tabs ,DatePicker} from 'antd';
import moment from 'moment';
import { connect } from 'dva';

import AdvancedSearchForm from '../../components/Company/AdvancedSearch';
import BasicSearch from '../../components/Company/BasicSearch';

import BasicTable from '../../components/Company/BasicTable';
import ActivityTable from '../../components/Company/ActivityTable';

import OverviewPanel from '../../components/Company/OverviewPanel';
import ActivityPanel from '../../components/Company/ActivityPanel';
import BasicPanel from '../../components/Company/BasicPanel';
import SearchTags from '../../components/Company/SearchTags';

import ReportLine from '../../components/Chart/ReportLine';
import VersionPie from '../../components/Chart/VersionPie';

import { converId, converServer, conver } from '../../utils/reportCommon';
import styles from './company.less';

const TabPane = Tabs.TabPane;
const MonthPicker = DatePicker.MonthPicker;

const Government = ({dispatch ,  companies , global , report }) => {

  // 地区变化的 dispatch
  const { hideSearchPanel , tabState , searchInfo ,selectedRowKeys , subSelect } = companies;
  const {versionLoading , version } = report;
  const onTypeChange = (value, selectedOptions) => {
    // console.log(selectedOptions);
  }

  const onRegionChange = (value) => {
    // console.log(value);
  }

  const onTableChange = (pagination, filters, sorter) => {
    let order = ''
    // 点击分页、筛选、排序时触发
    if(sorter.order === "descend"){
      order = sorter.field + " DESC"
    }
    else {
      order = sorter.field
    }
    let payload = {
      limit : pagination.pageSize,
      current : pagination.current,
      order : order
    };

    dispatch({
      type: 'companies/basicPage',
      payload
    });

    dispatch({
      type: 'companies/setSelectedRowKeys',
      payload : { selectedRowKeys : [0] }
    });

    dispatch({
      type: 'companies/query',
    });

  }

  const onDateChange = (date, dateString) => {
    dispatch({
      type: 'companies/changeFilterDate',
      payload : {
        year : date.year(),
        month : date.month() + 1
      }
    });
    dispatch({
      type: 'companies/query',
    });
  }

  const onChartClick = (param, echart) => {
       console.log(param, echart);
       const key = _.split(param.name, '-', 2);
       const query = _.assign({},converId(param.seriesName),{ year:key[0] , month:key[1]});
       const title = `${query.year}年${query.month}月${param.seriesName} 版本分布图`;
       dispatch({
         type: 'companies/setSubSelect',
         payload : { subSelect : "subVersion" }
       });

       dispatch({
         type: 'report/setVersionTitle',
         payload : { versionTitle : title }
       });

       dispatch({
         type: 'report/getVersion',
         payload : query
       });
  };

  const operations = () => {
      switch (tabState) {
        case 'basic':
          return (<div></div>)
        case 'activity':
          return (<div>报活月份:&nbsp;&nbsp;
              <MonthPicker defaultValue={moment(new Date(), 'YYYY-MM-DD')} placeholder="请选择报活月份" onChange={onDateChange}/>
            </div>)
      }
  }

  const onChangeTab = (key) => {
    dispatch({
      type: 'companies/activity',
      payload : key
    });
  }

  const onSubChangeTab = (key) =>{
    dispatch({
      type: 'companies/setSubSelect',
      payload : { subSelect : key }
    });

  }

  const setAdvancedSearch = (basicSearch) => {
    dispatch({
      type: 'companies/hideSearchPanel',
      payload : false
    });
  }

  const hideSearch = () => {
    dispatch({
      type: 'companies/hideSearchPanel',
      payload : true
    });
  }

  const setBasicSearch = (basicSearch) => {
    dispatch({
      type: 'companies/setBasicSearch',
      payload : true
    });
  }

  const onRowClick = (record, index) => {

    dispatch({
      type: 'companies/getCurrentItem',
      payload : record.id
    });

    dispatch({
      type: 'companies/setSelectedRowKeys',
      payload : { selectedRowKeys : [index] }
    });

    dispatch({
      type: 'companies/setSubSelect',
      payload : { subSelect : `sub-${tabState}` }
    });


  }


  const searchShow = () =>{
    if(!hideSearchPanel){
      return (<AdvancedSearchForm {...AdvanceSearchProps} />)
    }
    else{
      return (
        <div>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button icon="down" onClick={setAdvancedSearch}> 高级检索 </Button>
            </Col>
          </Row>
          <SearchTags searchInfo = {searchInfo} />
        </div>)
    }

  };

  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch({
        type: 'companies/getCurrentItem',
        payload : selectedRows[0].id
      });

      dispatch({
        type: 'companies/setSelectedRowKeys',
        payload : { selectedRowKeys }
      });

      dispatch({
        type: 'companies/setSubSelect',
        payload : { subSelect : `sub-${tabState}` }
      });
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };


  const AdvanceSearchProps = {
    global,
    onRegionChange,
    onTypeChange,
    dispatch,
    hideSearch,
    setBasicSearch,
    typeOptions: global.GtypeOptions
  }

  const BasicTableProps = {
    companyList : companies,
    onTableChange,
    onRowClick,
    rowSelection
  }

  const ActivityTableProps = {
    companyList : companies,
    onTableChange,
    onRowClick,
    rowSelection
  }

  const ReportLineProps ={
    report : report,
    onChartClick
  }

  const overviewPanelProps = {
    baseCompanies : companies,
  }

  const BasicPanelProps = {
    company : companies.currentItem
  }

  const ActivityPanelProps = {
    company : companies.currentItem
  }

  const versionPiePanelProps = {
    report
  }

  return (
    <div>
      <h2>党政军民团结一致</h2>
      <Row gutter={40}>

          <Col span={14} key={"data-area"}>
            <div>
              {searchShow ()}
              <div className={styles.datapane}>
                <Tabs defaultActiveKey="basic" tabBarExtraContent={ operations() }  onChange={onChangeTab}>
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

          <Col span={10} key={"info-area"}>
            <OverviewPanel {...overviewPanelProps} />
            <Tabs onChange={onSubChangeTab} activeKey={ subSelect }>
              <TabPane tab={<span><Icon type="solution" />基本信息面板</span>} key="sub-basic">
                <BasicPanel {...BasicPanelProps}/>
              </TabPane>
              <TabPane tab={<span><Icon type="line-chart" />报活面板</span>} key="sub-activity">
                <ActivityPanel {...ActivityPanelProps}/>
              </TabPane>
              <TabPane tab={<span><Icon type="pie-chart" />版本面板</span>} key="subVersion">
                <VersionPie {...versionPiePanelProps} />
              </TabPane>
            </Tabs>
          </Col>
      </Row>
    </div>
  );
};

Government.propTypes = {

};

const mapStateToProps = ({ companies , global , report }) => {
  return { companies , global , report }
}
export default connect(mapStateToProps)(Government);
