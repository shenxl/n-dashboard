import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button,
    Icon, Tooltip, Cascader, Select,
    Switch, InputNumber, DatePicker } from 'antd';
import moment from 'moment';
import styles from './monthly.less';

const _ = require('lodash');

const MonthPicker = DatePicker.MonthPicker;
const FormItem = Form.Item;

const MonthlyFromCreate = ({
  currentItem,
  form,
  modalMode,
  onMonthlyFieldsChange,
  onSubmitClick,
}) => {
  const {
  company_id,
  server_id,
  year,
  month,
  activity_sum: activitySum,
  activity_avg: activityAvg,
  install_sum: installSum,
} = currentItem;
  const toolTitle = modalMode === 'create' ? '创建' : '编辑';
  const activeDate = year ?
    moment(`${year}-${month}`, 'YYYY-MM-DD') :
    moment(new Date(), 'YYYY-MM-DD')
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const { getFieldDecorator } = form;

  return (
    <Form
      horizontal
      className={styles.monthlyFrom}
    >
      <Row gutter={40} style={{ marginTop: '10px' }}>
        <Col span={24} key={'active_date'}>
          <FormItem
            {...formItemLayout}
            label={<span>
              报活月份&nbsp;
            </span>}
          >
            {getFieldDecorator('active_date', {
              initialValue: activeDate,
            })(
              <MonthPicker />
            )}
          </FormItem>
        </Col>

        <Col span={24} key={'activity_sum'}>
          <FormItem
            {...formItemLayout}
            label={<span>
              当月报活&nbsp;
            </span>}
          >
            {getFieldDecorator('activity_sum', {
              initialValue: activitySum || '',
            })(
              <InputNumber
                min={0}
                max={99999}
              />
            )}
          </FormItem>
        </Col>

        <Col span={24} key={'activity_avg'}>
          <FormItem
            {...formItemLayout}
            label={<span>
              月活均值&nbsp;
            </span>}
          >
            {getFieldDecorator('activity_avg', {
              initialValue: activityAvg || '',
            })(
              <InputNumber
                min={0}
                max={99999}
              />
            )}
          </FormItem>
        </Col>

        <Col span={24} key={'install_sum'}>
          <FormItem
            {...formItemLayout}
            label={<span>
              当月安装量&nbsp;
            </span>}
          >
            {getFieldDecorator('install_sum', {
              initialValue: installSum || '',
            })(
              <InputNumber
                min={0}
                max={99999}
              />
            )}
          </FormItem>
        </Col>
        <Col span={18} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" onClick={onSubmitClick}>{ toolTitle }</Button>
        </Col>
      </Row>
      <Row style={{ marginTop: '10px' }} />
    </Form>
  );
};
const MonthlyFrom = Form.create({
  onFieldsChange(props, fields) {
    // TODO:input 输入卡顿明显，待解决。
    props.onMonthlyFieldsChange(fields);
  },
  mapPropsToFields(props) {
    return { currentItem: props.currentItem };
  },
})(MonthlyFromCreate);

MonthlyFrom.propTypes = {

};


export default MonthlyFrom;
