import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button,
    Icon , Tooltip , Cascader , Select, Switch} from 'antd';

import styles from './panel.less';

const FormItem = Form.Item;

const CompanyInfoFrom = ({ company ,form  }) => {

  const { province , city , county , region , address , type , industry , buy } = company;
  const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
  };
  const { getFieldDecorator } = form;

  return (
    <Form
      horizontal
      className={styles.companyInfo}
    >
      <Row gutter={40}>
        
        <Col span={12} key={"type"}>
          <FormItem
            {...formItemLayout}
              label={<span>
              类型&nbsp;
            </span>}
          >
          <span>{type}</span>
          </FormItem>
        </Col>
        <Col span={12} key={"industry"}>
          <FormItem
            {...formItemLayout}
              label={<span>
              行业&nbsp;
            </span>}
          >
          <span>{industry}</span>
          </FormItem>
        </Col>

        <Col span={12} key={"province"}>
          <FormItem
            {...formItemLayout}
              label={<span>
              省&nbsp;
            </span>}
          >
          <span>{province}</span>
          </FormItem>
        </Col>
        <Col span={12} key={"city"}>
          <FormItem
            {...formItemLayout}
              label={<span>
              市&nbsp;
            </span>}
          >
          <span>{city}</span>
          </FormItem>
        </Col>
        <Col span={12} key={"county"}>
          <FormItem
            {...formItemLayout}
              label={<span>
              区/县&nbsp;
            </span>}
          >
          <span>{county}</span>
          </FormItem>
        </Col>

        <Col span={12} key={"buy"}>
          <FormItem
            {...formItemLayout}
              label={<span>
              采购量&nbsp;
            </span>}
          >
          <span>{buy}</span>
          </FormItem>
        </Col>



        <Col span={24} key={"address"}>
          <FormItem
            labelCol = {{ span: 4 }}
            wrapperCol = {{ span: 20 }}
            label={<span>
              地址&nbsp;
            </span>}
          >
          <span>{address}</span>
          </FormItem>
        </Col>

      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">编辑</Button>
        </Col>
      </Row>
    </Form>
  );
};
const CompanyInfo = Form.create()(CompanyInfoFrom);

CompanyInfo.propTypes = {

};


export default CompanyInfo;
