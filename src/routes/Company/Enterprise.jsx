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

import styles from './company.less';

const TabPane = Tabs.TabPane;
const MonthPicker = DatePicker.MonthPicker;

const Enterprise = ({dispatch ,  companies , global }) => {

  // 地区变化的 dispatch
  const { isBasic , isActivity } = companies;

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
      type: 'companies/query',
    });
  }

  const onActivityChange = (pagination, filters, sorter) => {
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
      type: 'companies/activityPage',
      payload
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

  const operations = !isActivity
  ? (<div></div>)
  : (<div>报活月份:&nbsp;&nbsp;
      <MonthPicker defaultValue={moment(new Date(), 'YYYY-MM-DD')} placeholder="请选择报活月份" onChange={onDateChange}/>
    </div>);


  const onChangeTab = (key) => {
    if(key == 1){
      dispatch({
        type: 'companies/activity',
        payload : false
      });

    }else{
      dispatch({
        type: 'companies/activity',
        payload : true
      });
    }
  }

  const setAdvancedSearch = (basicSearch) => {
    dispatch({
      type: 'companies/setBasicSearch',
      payload : false
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
  }


  const searchShow = () =>{
    if(!isBasic){
      return (<AdvancedSearchForm {...AdvanceSearchProps} />)
    }
    else{
      return (
        <div className={styles.basicSearch}>
          <span className={styles.text}>检索关键字:</span>
          <BasicSearch style={{width : '200px'}} />
          <span className={styles.text}><a onClick={setAdvancedSearch}> 高级检索 </a></span>
        </div>)
    }

  };

  const AdvanceSearchProps = {
    global,
    onRegionChange,
    onTypeChange,
    dispatch,
    setBasicSearch,
    typeOptions: global.EtypeOptions
  }

  const BasicTableProps = {
    companyList : companies,
    onTableChange,
    onRowClick
  }

  const ActivityTableProps = {
    companyList : companies,
    onTableChange: onActivityChange,
    onRowClick
  }

  const overviewPanelProps = {
    baseCompanies : companies,
  }

  const BasicPanelProps = {
    company : companies.currentItem
  }

  return (
    <div>
      国有企业继往开来
      <Row gutter={40}>

          <Col span={14} key={"data-area"}>
            <div style={{"overflowY" : "scroll" , "overflowX" : "hidden" , height:"680px"}}>
              {searchShow ()}
              <div className={styles.datapane}>
                <Tabs defaultActiveKey="1" tabBarExtraContent={operations}  onChange={onChangeTab}>
                  <TabPane tab={<span><Icon type="solution" />企业情况</span>} key="1">
                    <BasicTable {...BasicTableProps} />
                  </TabPane>
                  <TabPane tab={<span><Icon type="line-chart" />报活情况</span>} key="2">
                    <ActivityTable {...ActivityTableProps} />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </Col>

          <Col span={10} key={"info-area"}>
            <OverviewPanel {...overviewPanelProps} />
            <Tabs activeKey={isActivity? "2":"1"}>
              <TabPane tab={<span><Icon type="solution" />基本信息维护</span>} key="1" disabled>
                <BasicPanel {...BasicPanelProps}/>
              </TabPane>
              <TabPane tab={<span><Icon type="line-chart" />报活数据分析</span>} key="2" disabled>
                <ActivityPanel />
              </TabPane>
            </Tabs>
          </Col>
      </Row>
    </div>
  );
};

Enterprise.propTypes = {

};

const mapStateToProps = ({ companies , global }) => {
  return { companies , global }
}
export default connect(mapStateToProps)(Enterprise);
