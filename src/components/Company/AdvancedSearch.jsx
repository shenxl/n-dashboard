import React, { Component, PropTypes } from 'react';

import { Form, Row, Col, Input, Button,
    Icon , Tooltip , Cascader , Select, Switch} from 'antd';
import RegionGlobal from '../Global/RegionGlobal';
import CustomSelect from '../Global/CustomSelect';
var _ = require('lodash');

const FormItem = Form.Item;
const Option = Select.Option;
import styles from './search.less';

const usualShowedChildren = 2 * 5; // row * col

const AdvancedSearch = ({ form , onRegionChange , onAddressChange ,onTypeChange , global , dispatch , setBasicSearch ,typeOptions}) => {
  const { addressOptions , regionList , provinceItem , cityItem , countryItem} = global;
  const handleSearch = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let and = [];
      let or = [];
      let status = "";
      // make query
      if(values.address &&  values.address.length !== 0){
        console.log(values.address);
        status += " 地区 : [ "
        switch (values.address.length) {
          case 1:
            and.push({province:{like:`%25${provinceItem.label}%25`}})
            status += provinceItem.label;
            break;
          case 2:
            and.push({province:{like:`%25${provinceItem.label}%25`}});
            and.push({city:{like:`%25${cityItem.label}%25`}});
            status += `${provinceItem.label} - ${cityItem.label}` ;
            break;
          case 3:
            and.push({province:{like:`%25${provinceItem.label}%25`}});
            and.push({city:{like:`%25${cityItem.label}%25`}});
            and.push({county:{like:`%25${countryItem.label}%25`}});
            status += `${provinceItem.label} - ${cityItem.label} - ${countryItem.label}` ;
            break;
          default:
        }
        status += " ]"
      } else if(values.region) {
        status += " 区域 : [ "
        values.region.forEach((item) => {
          or.push({region:item});
          status += item + ','
        })
        and.push({or:or});
        status += " ]"
      }

      if(values.keyword){
        status += `关键字: ${values.keyword}`
        and.push({name:{like:`%25${values.keyword}%25`}});
      }

      if(values.type){
        status += " 类型 : [ "
        if(values.type.length === 1){
          and.push({type:values.type[0]});
          status += values.type[0] ;
        } else if(values.type.length === 2 && values.type[1] === '所有'){
          status += values.type[0] ;
          and.push({type:values.type[0]});
        } else {
          and.push({type:values.type[0]});
          and.push({industry:values.type[1]});
          status += values.type[0] + '/' + values.type[1];
        }
        status += " ]"
      }

      if(values.important){
          console.log(values.important);
          status += ' 重点用户 '
          and.push({important:1});
      }

      dispatch({
        type: 'companies/updateFilter',
        payload : {
          and,
          skip : 0
        }
      });

      dispatch({
        type: 'companies/setSearchInfo',
        payload : status
      });

      dispatch({
        type: 'companies/query',
      });

      console.log(status);
    });
  };

  const handleReset = () => {
    form.resetFields();
  };

  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <Form
      horizontal
      className={styles.advanced_search_form}
      onSubmit={handleSearch}
    >
      <Row gutter={40}>
        <Col span={16} key={"region"}>
          <FormItem
            {...formItemLayout}
              label={<span>
              区域查询&nbsp;
              <Tooltip title="注意:区域查询与省市查询互斥,优先取省市值!">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>}
          >
            { getFieldDecorator(`region`)(
              <CustomSelect options={regionList} handleChange={onRegionChange}/>
            )}
          </FormItem>
        </Col>
        <Col span={8} key={"type"}>
          <FormItem
            labelCol={{ span: 10}}
            wrapperCol={{ span: 14}}
            label={`企业类型`}
          >
          {getFieldDecorator(`type`)(
            <Cascader options={typeOptions}
              onChange={ onTypeChange }
              changeOnSelect
              placeholder="请选择类型 / 行业"
              />
          )}
          </FormItem>
        </Col>
        <Col span={16} key={"address"}>
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
            {getFieldDecorator(`address`)(
              <RegionGlobal
                changeOnSelect
                placeholder="请选择省 / 市 / 区"
                />
            )}
          </FormItem>
        </Col>
        <Col span={6} key={"important"}>
          <FormItem
            label="显示重点用户"
            labelCol={{ span: 19}}
            wrapperCol={{ span: 5}}
          >
            {getFieldDecorator('important')(
              <Switch />
            )}
          </FormItem>
        </Col>
        <Col span={16} key={"keyword"}>
          <FormItem
            {...formItemLayout}
            label={`关键字`}
          >
            {getFieldDecorator(`keyword`)(
              <Input placeholder="请输入关键字" />
            )}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button onClick={handleReset}>清空</Button>
        </Col>
      </Row>
    </Form>
  );
};
const AdvancedSearchForm = Form.create()(AdvancedSearch);

AdvancedSearchForm.propTypes = {
  onRegionChange : PropTypes.func.isRequired ,
  onTypeChange : PropTypes.func.isRequired ,
  setBasicSearch : PropTypes.func.isRequired ,
  global : PropTypes.object.isRequired,
  typeOptions : PropTypes.array.isRequired,
};


export default AdvancedSearchForm
