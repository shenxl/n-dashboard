import React, { Component, PropTypes } from 'react';
import ReportLine from '../Chart/ReportLine';
import MonthlyModal from '../CompanyMonthly/MonthlyModal';
import { Tabs , Modal ,Row ,Col,Button } from 'antd';
import { connect } from 'dva';

import { converId, converServer, conver } from '../../utils/reportCommon';
import styles from './panel.less';



const ActivityPanel = ({ company , report , dispatch}) => {

  const onChartClick = (param, echart) => {
       const key = _.split(param.name, '-', 2);
       const query = _.assign({},converId(param.seriesName),{ year:key[0] , month:key[1]});
       const title = `${query.year}年${query.month}月${param.seriesName} 版本分布图`;
       dispatch({
         type: 'companies/setSubSelect',
         payload: {
           subSelect: "subVersion"
         }
       });
       dispatch({
         type: 'report/setVersionTitle',
         payload: {
           versionTitle: title,
           type : 'single'
         }
       });

       dispatch({
         type: 'versionMonthly/query',
         payload: {
           query: query
         }
       });
  };

  const ReportLineProps ={
    report,
    company,
    onChartClick
  };

  const MonthlyModalProps = {
    company , 
    width : 920
  }

  const showInnerDataInput = () =>{
    dispatch({
      type : "companyMonthly/getInnerData",
      payload : company.id
    });

    dispatch({
      type: 'companyMonthly/showModal',
      payload : { modalVisibel : true }
    });
  }

  return (
    <div>
        <Row>
          <h3 style={{"marginBottom" : "8px"}}>{company.name} 报活情况</h3>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={ showInnerDataInput }>内网信息录入</Button>
          </Col>
        </Row>
      <ReportLine { ...ReportLineProps } />
      <MonthlyModal { ...MonthlyModalProps } />
    </div>
  );
};

ActivityPanel.propTypes = {

};

function mapStateToProps({ companyMonthly }) {
  return {
     report : {
       loading : companyMonthly.loading ,
       monthly  : companyMonthly.list
     },

   }
}

export default connect(mapStateToProps)(ActivityPanel);
