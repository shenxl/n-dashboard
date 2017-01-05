import React, { Component, PropTypes } from 'react';
import { Row, Col, Input, Button, Icon } from 'antd';

import GaugeReport from '../Chart/GaugeReport';
import CardItem from '../Chart/CardItem';
import SearchTags from './SearchTags';

import styles from './panel.less';

const _ = require('lodash');

const OverviewPanel = ({ baseCompanies }) => {
  const { companies, searchInfo, activityDate } = baseCompanies;
  const { total: buyCount, loading: baseloading, activitytotal: ActiveCount } = companies;

  const gaugeData = {
    data: _.floor((ActiveCount * 100) / buyCount, 1),
    loading: baseloading,
  }
  const base = {
    titleIcon: 'pay-circle',
    title: '已购数',
    number: buyCount,
  }
  const activity = {
    titleIcon: 'line-chart',
    title: `${activityDate.month}月报活数`,
    number: ActiveCount,
  }

  const tagsProps = {
    searchInfo,
  }

  return (
    <div className={styles.showpicks}>
      <Row gutter={40}>
        <SearchTags searchInfo={searchInfo} />
        <Col span={9}>
          <CardItem UIModel={base} />
          <CardItem UIModel={activity} />
        </Col>
        <Col span={15}>
          <GaugeReport gaugeData={gaugeData} style={{ height: 200 }} title="报活占比" />
        </Col>
      </Row>
    </div>
  );
};

OverviewPanel.propTypes = {

};

export default OverviewPanel;
