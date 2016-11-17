import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';

const VersionPie = ({ report }) => {
  const {versionLoading , version , versionTitle} = report;
  const data = _.map(version, (item) => { return { name : item.version , value : item.value }});
  const option = {
    legend: {
      orient: 'vertical',
      x: 'right',
      data: _.map(version, (item) => { return item.version }),
    },
    title: {
       text: versionTitle,
   },
    tooltip: {
      trigger: 'item',
      formatter: "{b}: {c} ({d}%)"
    },
    series: [
      {
        name: '版本分布',
        type: 'pie',
        radius: ['30%', '70%'],
        data,
      },
    ],
  };

  return (<ReactEcharts
    option={option} showLoading={versionLoading}
  />);
};

VersionPie.propTypes = {

};

export default VersionPie;
