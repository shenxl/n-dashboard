import React, { Component, PropTypes } from 'react';
import { Table ,Icon , Tooltip , Button, Row, Col } from 'antd';
import OrderModal from './OrderModal';

import moment from 'moment';

const OrderTable = ({ orders , onEditOrder ,
  onCreateOrder , orderModalHandleOk ,
  orderModalHandleCancle , onOrderFieldsChange,
  onSnAddBlur
}) => {
  const { list , loading } = orders;

  const renderOrder = (o, row, index) => {
    let info = "";
    const item = row;
    if(item.order_number){
      info = <span><Icon type="check-circle" style={{color : "#60BE29" , "marginRight" : '4px'}}/>订单数量:{item.order_number}</span>
    } else if(item.after_authorization){
      info = <span><Icon type="info-circle" style={{color : "#00A0E9", "marginRight" : '4px'}}/>授权到期后数量:{item.after_authorization}</span>
    } else if(item.prediction){
      info = <span><Icon type="question-circle" style={{color : "#01BAD2", "marginRight" : '4px'}}/>预估值:{item.prediction}</span>
    } else {
      info = <span><Icon type="frown-o" style={{ "marginRight" : '4px'}}/>暂无数据</span>
    }
    return info;
  }

  const renderAction = (o, row, index) => {
    return (
      <div>
        <Button type="primary" icon='edit' size="small" onClick={onEditOrder.bind(this, row)}></Button>
      </div>
    );
  };

  const orderInfo = list.map((item) => {
    return {
      id : item.id,
      order_type : item.order_type,
      service_date : moment(item.service_date).format("YYYY-MM-DD"),
      order_number : item.order_number,
      after_authorization : item.after_authorization,
      prediction : item.prediction,
      order_info : ""
    }
  })

  const handleMouseEnter = () => {
    // console.log("On handleMouseEnter");
  }

  const columns = [
    {
      title: '授权类型',
      dataIndex: 'order_type',
      key: 'order_type'
    },
    {
      title: '订单数量',
      dataIndex: 'order_info',
      key: 'order_info',
      render: renderOrder,
    },
    {
      title: '服务截止期',
      dataIndex: 'service_date',
      key: 'service_date'
    },
    {
      title: '操作',
      key: 'operation',
      render: renderAction,
    },

  ];

  const pagination = () => {
    if (5 > list.length) {
      return false
    }
    return {
      total: list.length,
      pageSize: 5,
      showSizeChanger: false,
    }
  };

  const orderModalProps = {
    orderModalHandleOk ,
    orderModalHandleCancle,
    orders,
    onOrderFieldsChange,
    onSnAddBlur
  }

  return (
    <div>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
         <Button type="primary" icon="plus-circle-o" size="small" style={{marginBottom:"5px"}} onClick={onCreateOrder}>添加合同信息</Button>
        </Col>
      </Row>
      <Table
        size="small"
        loading={ loading }
        columns={ columns }
        dataSource={ orderInfo }
        pagination = {pagination()}
      />
    <OrderModal {...orderModalProps} />
    </div>
  );
};

OrderTable.propTypes = {
  orders : PropTypes.object.isRequired,
  onEditOrder : PropTypes.func.isRequired,
  onCreateOrder : PropTypes.func.isRequired,
  orderModalHandleOk:PropTypes.func.isRequired,
  orderModalHandleCancle : PropTypes.func.isRequired,
  onOrderFieldsChange : PropTypes.func.isRequired,
  onSnAddBlur : PropTypes.func.isRequired,
};

export default OrderTable;
