import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';

const PieChart = ({ chartData, title, name, style }) => {
  const { dataName, data, loading, seriesName } = chartData;
  const option = {
    legend: {
      orient: 'vertical',
      x: 'right',
      data: dataName,
    },
    title: {
      text: title,
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    grid: {
      top: '5%',
      bottom: '3%',
    },
    series: [
      {
        name: seriesName,
        type: 'pie',
        data,
        label: {
          normal: {
            show: false,
            position: 'center',
          },
        },
        center: ['60%', '50%'],
        labelLine: {
          normal: {
            show: false,
          },
        },
      },
    ],
  };

  return (<ReactEcharts
    option={option} showLoading={loading} style={style}
  />);
};

PieChart.propTypes = {

};

export default PieChart;
