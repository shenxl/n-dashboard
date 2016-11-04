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
      formatter: "{b}: {c} ({d}%)"
    },
    series: [
      {
        name: seriesName,
        type: 'pie',
        data,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
        },
        labelLine: {
            normal: {
                show: false
            }
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
