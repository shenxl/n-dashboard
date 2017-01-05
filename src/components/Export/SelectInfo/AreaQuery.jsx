import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button,
    Icon, Tooltip, Cascader, Select, Switch } from 'antd';
import RegionGlobal from '../../Global/RegionGlobal';
import CustomSelect from '../../Global/CustomSelect';
import styles from './areaQuery.less';

const _ = require('lodash');

const FormItem = Form.Item;
const Option = Select.Option;
const AdvancedSearch = ({
  form,
  global,
  dispatch,
  typeOptions,
}) => {
  const { addressOptions, regionList, provinceItem, cityItem, countryItem } = global;
  const handleSearch = (e) => {
    e.preventDefault();
    //校验并获取一组输入域的值与 Error
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const and = [];
      const or = [];
      const areaStatus = [];
      // make query
      if (values.address && values.address.length !== 0) {
        switch (values.address.length) {
          case 1:
            and.push({ province: { like: `%25${provinceItem.Name}%25` } })
            areaStatus.push({ key: 'address', value: provinceItem.Name });
            break;
          case 2:
            and.push({ province: { like: `%25${provinceItem.Name}%25` } });
            and.push({ city: { like: `%25${cityItem.Name}%25` } });
            areaStatus.push({ key: 'address', value: `${provinceItem.Name} - ${cityItem.Name}` });
            break;
          case 3:
            and.push({ province: { like: `%25${provinceItem.Name}%25` } });
            and.push({ city: { like: `%25${cityItem.Name}%25` } });
            and.push({ county: { like: `%25${countryItem.Name}%25` } });
            areaStatus.push({ key: 'address', value: `${provinceItem.Name} - ${cityItem.Name} - ${countryItem.Name}` });
            break;
          default:
        }
      } else if (values.region) {
        and.push({ region: { inq: values.region } })
        areaStatus.push({ key: 'address', value: _.join(values.region, '、') });
      }


      if (values.type && values.type[0]) {
        if (values.type.length === 1 || (values.type.length === 2 && values.type[1] === '所有')) {
          and.push({ type: values.type[0] });
          areaStatus.push({ key: 'type', value: values.type[0] });
        } else {
          and.push({ type: values.type[0] });
          and.push({ industry: values.type[1] });
          areaStatus.push({ key: 'type', value: `${values.type[0]}/${values.type[1]}` });
        }
      }


      dispatch({
        type: 'exportData/exportSetSearchInfo',
        payload: areaStatus,
      });
    });
  };

  const exportHandleReset = () => {
    dispatch({
      type: 'exportData/exportClearQuery',
    });
    form.resetFields();
  };

  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  const RegionProps = {
    global,
    dispatch,
  }

  return (
    <Form
      horizontal
      className={styles.advanced_search_form}
      onSubmit={handleSearch}
    >
      <Row gutter={40}>
        <Col span={16} key={'region'}>
          <FormItem
            {...formItemLayout}
            label={<span>
              区域查询&nbsp;
              <Tooltip title="注意:区域查询与省市查询互斥,优先取省市值!">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>}
          >
            { getFieldDecorator('region')(
              <CustomSelect options={regionList} />,
            )}
          </FormItem>
        </Col>
        <Col span={16} key={'type'}>
          <FormItem
            {...formItemLayout}
            label={'企业类型'}
          >
            { getFieldDecorator('type')(
              <Cascader
                options={typeOptions}

                changeOnSelect
                placeholder="请选择类型 / 行业"
              />,
            )}
          </FormItem>
        </Col>
        <Col span={16} key={'address'}>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                省市查询&nbsp;
                <Tooltip title="首次点选后会取下级城市信息，如需要选择多级请再次点击">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
          )}
          >
            {getFieldDecorator('address')(
              <RegionGlobal
                {...RegionProps}
                changeOnSelect
                placeholder="请选择省 / 市 / 区"
              />,
            )}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">确定</Button>
          <Button onClick={exportHandleReset}>清空</Button>
        </Col>
      </Row>
    </Form>
  );
};
const AreaQuery = Form.create()(AdvancedSearch);

AreaQuery.propTypes = {
};


export default AreaQuery
