import React, { Component, PropTypes } from 'react';
import {  Row, Col, Input, Button, Icon} from 'antd';

import PieChart from '../Chart/PieChart';
import CardItem from '../Chart/CardItem'
import styles from './panel.less';

const OverviewPanel = ({ baseCompanies }) => {
  const {companies , activeCompanies , searchInfo, activityDate} = baseCompanies;
  const {total : buyCount , loading : baseloading} = companies;
  const {total : ActiveCount, loading : activeloading} = activeCompanies;

  const versionData = {
    data: [{name:"无报活",value:buyCount - ActiveCount},{name:"有报活",value:ActiveCount}],
    loading: activeloading || baseloading,
    seriesName: '购买&报活比例',
    dataName:["有报活","无报活"]
  }
  const base = {
    titleIcon: 'pay-circle',
    title: '已购数',
    number: buyCount
  }
  const activity = {
    titleIcon: 'line-chart',
    title:`${activityDate.month}月报活数`,
    number: ActiveCount
  }

  return (
    <div>
      <Row gutter={40}>
        <h3>{searchInfo}</h3>
        <Col span={7}>
          <CardItem UIModel={base}/>
        </Col>
        <Col span={7}>
          <CardItem UIModel={activity}/>
        </Col>
        <Col span={10}>
          <PieChart chartData={versionData} style={{height:200}} title={"活跃占比"}/>
        </Col>
      </Row>

    </div>
  );
};

OverviewPanel.propTypes = {

};

export default OverviewPanel;
