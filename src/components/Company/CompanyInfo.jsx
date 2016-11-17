import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button,
    Icon , Tooltip , Cascader , Select, Switch} from 'antd';

import styles from './panel.less';

const FormItem = Form.Item;

const CompanyInfoFrom = ({ company ,form  }) => {

  const { province , city , county , region , address , type , industry , buy } = company;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
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
              label={<span className={styles.label}>
              类型&nbsp;
            </span>}
          >
          <span className={styles.content}>{type}</span>
          </FormItem>
        </Col>
        <Col span={12} key={"industry"}>
          <FormItem
            {...formItemLayout}
              label={<span className={styles.label}>
              行业&nbsp;
            </span>}
          >
          <span className={styles.content}>{industry}</span>
          </FormItem>
        </Col>

        <Col span={12} key={"province"}>
          <FormItem
            {...formItemLayout}
              label={<span className={styles.label}>
              省&nbsp;
            </span>}
          >
          <span className={styles.content}>{province}</span>
          </FormItem>
        </Col>
        <Col span={12} key={"city"}>
          <FormItem
            {...formItemLayout}
              label={<span className={styles.label}>
              市&nbsp;
            </span>}
          >
          <span className={styles.content}>{city}</span>
          </FormItem>
        </Col>
        <Col span={12} key={"county"}>
          <FormItem
            {...formItemLayout}
              label={<span className={styles.label}>
              区/县&nbsp;
            </span>}
          >
          <span className={styles.content}>{county}</span>
          </FormItem>
        </Col>

        <Col span={12} key={"buy"}>
          <FormItem
            {...formItemLayout}
              label={<span className={styles.label}>
              采购量&nbsp;
            </span>}
          >
          <span className={styles.content}>{buy}</span>
          </FormItem>
        </Col>



        <Col span={24} key={"address"}>
          <FormItem
            labelCol = {{ span: 4 }}
            wrapperCol = {{ span: 20 }}
            label={<span className={styles.label}>
              地址&nbsp;
            </span>}
          >
          <span className={styles.content}>{address}</span>
          </FormItem>
        </Col>

      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Tooltip title="很抱歉：编辑功能测试未通过，暂不开放">
            <Icon type="question-circle-o"  style={{ marginRight : '10px' }} />
          </Tooltip>
          <Button type="primary" htmlType="submit" disabled>编辑</Button>
        </Col>
      </Row>
    </Form>
  );
};
const CompanyInfo = Form.create()(CompanyInfoFrom);

CompanyInfo.propTypes = {

};


export default CompanyInfo;
