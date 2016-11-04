import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button,
    Icon , Tooltip , Cascader , Select,
    Switch , InputNumber  , DatePicker} from 'antd';
import moment from 'moment';
var _ = require('lodash');

import styles from './order.less';

const FormItem = Form.Item;
const Option = Select.Option;

const OrderFromCreate = ({ currentItem  ,form , modalMode , onOrderFieldsChange }) => {

  const { id , company_id ,order_type ,  order_name , order_area , order_number  ,
        after_authorization, prediction ,authorization_years , authorization_date,
        length_of_service , service_date } = currentItem;

  const formItemLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
  };
  const { getFieldDecorator } = form;

  return (
    <Form
      horizontal
      className={styles.orderFrom}
    >
      <Row gutter={40}  style={{ "marginTop" : "10px" }}>

        <Col span={24} key={"order_name"}>
          <FormItem
            labelCol = {{ span: 6 }}
            wrapperCol = {{ span: 18 }}
              label={<span>
              订方名称&nbsp;
            </span>}
          >
          {getFieldDecorator('order_name', {
            initialValue:  order_name.value || ""
          })(
            <Input style={{ width: 280 }} />
          )}
          </FormItem>
        </Col>

        <Col span={24} key={"order_area"}>
          <FormItem
            labelCol = {{ span: 6 }}
            wrapperCol = {{ span: 18 }}
              label={<span>
              授权范围&nbsp;
            </span>}
          >
          {getFieldDecorator('order_area', {
            initialValue:  order_area.value || ""
          })(
            <Input type="textarea" autosize={{ minRows: 2, maxRows: 4 }} style={{ width: 280 }} />
          )}
          </FormItem>
        </Col>
        <Col span={12} key={"order_type"}>
          <FormItem
            {...formItemLayout}
              label={<span>
              授权类型&nbsp;
            </span>}
          >
          {getFieldDecorator('order_type', {
            initialValue:  order_type.value || "场地授权"
          })(
            <Select style={{ width: 100 }}>
              <Option value="数量授权">数量授权</Option>
              <Option value="场地授权">场地授权</Option>
              <Option value="随机数量授权">随机数量授权</Option>
              <Option value="年场地授权">年场地授权</Option>
            </Select>
          )}
          </FormItem>
        </Col>
        <Col span={12} key={"order_number"}>
          <FormItem
            {...formItemLayout}
              label={<span>
              订单数量&nbsp;
            </span>}
          >
          {getFieldDecorator('order_number', {
            initialValue : order_number.value || 0
          })(
            <InputNumber min={0} max={100000} style={{ width: 100 }} />
          )}
          </FormItem>
        </Col>
        <Col span={12} key={"after_authorization"}>
          <FormItem
            {...formItemLayout}
              label={<span>
              到期后授权数量&nbsp;
            </span>}
          >
          {getFieldDecorator('after_authorization', {
            initialValue: after_authorization.value || 0,
          })(
            <InputNumber min={0} max={100000} style={{ width: 100 }} />
          )}
          </FormItem>
        </Col>
        <Col span={12} key={"prediction"}>
          <FormItem
            {...formItemLayout}
              label={<span>
              预估值&nbsp;
            </span>}
          >
          {getFieldDecorator('prediction', {
            initialValue:  prediction.value || 0,
          })(
            <InputNumber min={0} max={100000} style={{ width: 100 }} />
          )}
          </FormItem>
        </Col>

        <Col span={12} key={"authorization_years"}>
          <FormItem
            {...formItemLayout}
              label={<span>
              授权年限&nbsp;
            </span>}
          >
          {getFieldDecorator('authorization_years', {
            initialValue: authorization_years.value || 0,
          })(
            <InputNumber min={0} max={100000} style={{ width: 60 }} />
          )}
          </FormItem>
        </Col>

        <Col span={12} key={"authorization_date"}>
          <FormItem
            {...formItemLayout}
              label={<span>
              授权截止时间&nbsp;
            </span>}
          >
          {getFieldDecorator('authorization_date', {
            initialValue: (authorization_date.value ?
            moment(authorization_date.value, 'YYYY-MM-DD') :
            moment(new Date(), 'YYYY-MM-DD')),
          })(
            <DatePicker style={{ width: 100 }}/>
          )}
          </FormItem>
        </Col>

        <Col span={12} key={"length_of_service"}>
          <FormItem
            {...formItemLayout}
              label={<span>
              服务年限&nbsp;
            </span>}
          >
          {getFieldDecorator('length_of_service', {
            initialValue:  length_of_service.value || 0,
          })(
            <InputNumber min={0} max={100000} style={{ width: 60 }} />
          )}
          </FormItem>
        </Col>

        <Col span={12} key={"service_date"}>
          <FormItem
            {...formItemLayout}
              label={<span>
              服务截至时间&nbsp;
            </span>}
          >
          {getFieldDecorator('service_date', {
            initialValue:(service_date.value ?
            moment(service_date.value, 'YYYY-MM-DD') :
            moment(new Date(), 'YYYY-MM-DD')),
          })(
            <DatePicker style={{ width: 100 }}/>
          )}
          </FormItem>
        </Col>

      </Row>
    </Form>
  );
};
const OrderFrom = Form.create({
  onFieldsChange(props, fields) {
    // TODO　：　input 输入卡顿明显，待解决。
    props.onOrderFieldsChange(fields);
  },
  mapPropsToFields(props) {
    return { "currentItem" : props.currentItem };
  },
})(OrderFromCreate);

OrderFrom.propTypes = {

};


export default OrderFrom;
