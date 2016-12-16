import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Icon, Tooltip } from 'antd';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { converId, converServer, conver } from '../../utils/reportCommon';

const _ = require('lodash');


const ReportLine = ({ company, report, onChartClick }) => {
  const { loading, monthly } = report;


  const init = () => {
    if (!loading) {
      // echarts_instance.clear();
      let serverInfo = [];
      let tokenInfo = [];
      let series = [];
      let seriesActive = [];
      let seriesInstall = [];

      _.forEach(_.chain(monthly).orderBy(['server_id', 'year', 'month'], ['asc', 'asc', 'asc']).value(), (item) => {
        serverInfo.push(item.server_id);
        tokenInfo.push(`${item.year}-${item.month}`);
      });

      serverInfo = _.uniq(serverInfo);
      tokenInfo = _.uniq(tokenInfo);

      seriesActive = _.map(serverInfo, (serverId) => {
        const result = [];
        _.chain(monthly)
          .filter((item) => { return item.server_id === serverId })
          .forEach((item) => {
            _.forEach(tokenInfo, (token, index) => {
              const itemToken = `${item.year}-${item.month}`;
              if (itemToken === token) {
                result[index] = item.activity_sum
              }
            })
          }).value()

        return {
          name: converServer(serverId, 'active'),
          type: 'line',
          data: result,
        }
      })


      seriesInstall = _.map(serverInfo, (serverId) => {
        const result = [];
        _.chain(monthly)
          .filter((item) => { return item.server_id === serverId })
          .forEach((item) => {
            _.forEach(tokenInfo, (token, index) => {
              const itemToken = `${item.year}-${item.month}`;
              if (itemToken === token) {
                result[index] = item.install_sum
              }
            })
          }).value()

        return {
          name: converServer(serverId, 'install'),
          type: 'bar',
          stack: 'install',
          data: result,
        }
      });

      series = _.concat(seriesActive, seriesInstall);
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
        },
        legend: {
          left: 'left',
          data: _.concat(conver(serverInfo)),
        },
        xAxis: {
          axisLabel: {
            interval: 0,
          },
          name: '报活日期',
          data: tokenInfo,
        },
        grid: {
          left: '3%',
          bottom: '3%',
          containLabel: true,
        },
        yAxis: {
          name: '报活数',
        },
        series,
      }
    }
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}',
      },
      legend: {
        left: 'left',
        data: ['暂无'],
      },
      xAxis: {
        splitLine: {
          interval: 0,
        },
        name: '报活日期',
        data: [],
      },
      grid: {
        left: '3%',
        bottom: '3%',
        containLabel: true,
      },
      yAxis: {
        name: '报活数',
      },
      series: [{
        name: '暂无',
        type: 'bar',
        data: [],
      }],
    }
  }
  //'legendselectchanged': onChartLegendselectchanged
  const onEvents = {
    click: onChartClick,
  }

  return (
    <div>
      <Tooltip title="点击任意元素，查看该条件下的版本情况">
        <Icon style={{ color: '#E01515' }} type="question-circle" />
      </Tooltip>
      <span >操作须知&nbsp;</span>
      <ReactEcharts
        showLoading={loading}
        option={init()}
        style={{
          height: 400,
        }}
        notMerge
        onEvents={onEvents}
      />

    </div>
  );
};

ReportLine.propTypes = {
};

export default ReportLine;
