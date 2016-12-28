import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button,
    Icon, Tooltip, Cascader, Select, Switch } from 'antd';
import RegionGlobal from '../Global/RegionGlobal';
import CustomSelect from '../Global/CustomSelect';
import styles from './search.less';

const _ = require('lodash');

const FormItem = Form.Item;
const Option = Select.Option;
const usualShowedChildren = 2 * 5; // row * col
const AdvancedSearch = ({
  form,
  onRegionChange,
  onAddressChange,
  onTypeChange,
  global,
  dispatch,
  hideSearch,
  setBasicSearch,
  typeOptions,
}) => {
  const { addressOptions, regionList, provinceItem, cityItem, countryItem } = global;
  const handleSearch = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const and = [];
      const or = [];
      const status = [];
      // make query
      if (values.address && values.address.length !== 0) {
        switch (values.address.length) {
          case 1:
            and.push({ province: { like: `%25${provinceItem.Name}%25` } })
            status.push({ key: 'address', value: provinceItem.Name });
            break;
          case 2:
            and.push({ province: { like: `%25${provinceItem.Name}%25` } });
            and.push({ city: { like: `%25${cityItem.Name}%25` } });
            status.push({ key: 'address', value: `${provinceItem.Name} - ${cityItem.Name}` });
            break;
          case 3:
            and.push({ province: { like: `%25${provinceItem.Name}%25` } });
            and.push({ city: { like: `%25${cityItem.Name}%25` } });
            and.push({ county: { like: `%25${countryItem.Name}%25` } });
            status.push({ key: 'address', value: `${provinceItem.Name} - ${cityItem.Name} - ${countryItem.Name}` });
            break;
          default:
        }
      } else if (values.region) {
        and.push({ region: { inq: values.region } })
        status.push({ key: 'address', value: _.join(values.region, '、') });
      }

      if (values.keyword) {
        status.push({ key: 'keyword', value: values.keyword });
        and.push({ name: { like: `%25${values.keyword}%25` } });
      }

      if (values.type && values.type[0]) {
        if (values.type.length === 1 || (values.type.length === 2 && values.type[1] === '所有')) {
          and.push({ type: values.type[0] });
          status.push({ key: 'type', value: values.type[0] });
        } else {
          and.push({ type: values.type[0] });
          and.push({ industry: values.type[1] });
          status.push({ key: 'type', value: `${values.type[0]}/${values.type[1]}` });
        }
      }

      if (values.important) {
        and.push({ important: 1 });
        status.push({ key: 'important', value: 1 });
      }

      dispatch({
        type: 'companies/updateFilter',
        payload: {
          and,
          skip: 0,
        },
      });

      dispatch({
        type: 'companies/setSearchInfo',
        payload: status,
      });

      dispatch({
        type: 'companies/query',
      });

      dispatch({
        type: 'report/queryMonthly',
      });
    });
  };

  const handleReset = () => {
    dispatch({
      type: 'companies/clearQuery',
    });

    dispatch({
      type: 'companies/query',
    });

    dispatch({
      type: 'companies/setSelectedRowKeys',
      payload: { selectedRowKeys: [0] },
    });

    form.resetFields();
  };

  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
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
              <CustomSelect options={regionList} handleChange={onRegionChange} />,
            )}
          </FormItem>
        </Col>
        <Col span={8} key={'type'}>
          <FormItem
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            label={'企业类型'}
          >
            { getFieldDecorator('type')(
              <Cascader
                options={typeOptions}
                onChange={onTypeChange}
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
        <Col span={6} key={'important'}>
          <FormItem
            label="显示重点用户"
            labelCol={{ span: 19 }}
            wrapperCol={{ span: 5 }}
          >
            {getFieldDecorator('important')(
              <Switch />,
            )}
          </FormItem>
        </Col>
        <Col span={16} key={'keyword'}>
          <FormItem
            {...formItemLayout}
            label={'关键字'}
          >
            {getFieldDecorator('keyword')(
              <Input placeholder="请输入关键字" />,
            )}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button onClick={handleReset}>清空</Button>
          <Button icon="up" onClick={hideSearch}>精简模式</Button>
        </Col>
      </Row>
    </Form>
  );
};
const AdvancedSearchForm = Form.create()(AdvancedSearch);

AdvancedSearchForm.propTypes = {
  onRegionChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  setBasicSearch: PropTypes.func.isRequired,
  global: PropTypes.object.isRequired,
  typeOptions: PropTypes.array.isRequired,
  hideSearch: PropTypes.func.isRequired,
};


export default AdvancedSearchForm
