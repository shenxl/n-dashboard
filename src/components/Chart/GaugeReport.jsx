import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';

const GaugeReport = ({ gaugeData, title, name, style }) => {
  const { data, loading } = gaugeData;
  const option = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: title,
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: data, name: '报活覆盖率' }],
        axisLabel: {
          textStyle: { fontSize: '12px' },
        },
      },
    ],
  };

  return (<ReactEcharts
    option={option} showLoading={loading}
    style={{
      height: 260,
    }}
  />);
};

GaugeReport.propTypes = {

};

export default GaugeReport;
