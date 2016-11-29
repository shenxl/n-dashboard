import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button,
    Icon , Tooltip , Cascader , Select, Switch} from 'antd';
import EditControl from '../Global/EditControl';
import EditSelectControl from '../Global/EditSelectControl';
import RegionGlobal from '../Global/RegionGlobal';
import { prossessRegionData } from '../../utils/globalUtils';
import styles from './panel.less';

const FormItem = Form.Item;

const CompanyInfoFrom = ({ dispatch , currentType , currentIndustry,
  currentItem ,form , saveCompany , global ,onProvinceChange , onCityChange }) => {

  const { province , city , county , region , address , type , industry } = currentItem;
  const regionValue = prossessRegionData(province,city,county);
  const { currentTypeOptions , regionList } = global;
  const typeValue = [ type , industry ];

  const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
  };

  const { getFieldDecorator } = form;
  const RegionProps = {
    global,
    dispatch
  }

  return (
    <Form
      horizontal
      className={styles.companyInfo}
    >
      <Row gutter={40}>

        <Col span={20} key={"region"}>
          <FormItem
            {...formItemLayout}
              label={<span className={styles.label}>
              区域&nbsp;
            </span>}
          >
          {getFieldDecorator('region', {
            initialValue:  region || ""
          })(
            <EditSelectControl options={ regionList } />
          )}
          </FormItem>
        </Col>

        <Col span={20} key={"typeData"}>
          <FormItem
            {...formItemLayout}
              label={<span className={styles.label}>
              类型&nbsp;
            </span>}
          >
          {getFieldDecorator('typeData', {
            initialValue:  typeValue || []
          })(
            <Cascader options={ currentTypeOptions }
              changeOnSelect
              placeholder="请选择类型 / 行业"
              />
          )}
          </FormItem>
        </Col>

        <Col span={20} key={"regionData"}>
          <FormItem
            {...formItemLayout}
            label={(
            <span>
              省 / 市 / 区县 &nbsp;
            </span>
          )}
          >
            { getFieldDecorator(`regionData`, {
              initialValue:  regionValue || []
            })(
              <RegionGlobal
                {...RegionProps}
                changeOnSelect
                placeholder="请选择省 / 市 / 区"
                />
            ) }
          </FormItem>
        </Col>
        <Col span={20} key={"address"}>
          <FormItem
            {...formItemLayout}
            label={<span className={styles.label}>
              地址&nbsp;
            </span>}
          >
          { getFieldDecorator(`address`, {
            initialValue:  address || []
          })(
            <EditControl mode={ false }/>
          ) }
          </FormItem>
        </Col>

      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" onClick={ saveCompany }>保存</Button>
        </Col>
      </Row>
    </Form>
  );
};
const CompanyInfo = Form.create({
  onFieldsChange(props, fields) {
    // TODO　：　input 输入卡顿明显，待解决。
    props.onCompanyFiledsChange(fields);
  },
  mapPropsToFields(props) {
    return { "currentItem" : props.currentItem };
  },
})(CompanyInfoFrom);

CompanyInfo.propTypes = {

};


export default CompanyInfo;
