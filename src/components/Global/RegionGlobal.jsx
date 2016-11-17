import React, { Component, PropTypes } from 'react';
import { Cascader } from 'antd';
import { connect } from 'dva';

import styles from './regionGlobal.less';

const RegionGlobal = React.createClass({

  getInitialState() {
    // console.log("getInitialState");
    return {
      value : this.props.value || [],
    };
  },

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
        this.setState({ value: nextProps.value || [] });
      }
  },

  handleChange(value, selectedOptions) {
    const dispatch = this.props.dispatch;
    switch (value.length) {
      case 1:
        if(value[0] !== 0){
          dispatch({
            type: 'global/getCity',
            payload:{
              provinceId: value[0]
            }
          });
        }
        dispatch({
          type: 'global/setProvinceItem',
          payload: selectedOptions[0]
        });
        break;
      case 2:
          if(value[1] !== 0){
            dispatch({
              type: 'global/getCountry',
              payload:{
                cityId: value[1]
              }
            });
          }
          dispatch({
            type: 'global/setCityItem',
            payload: selectedOptions[1]
          });
          break;
      case 3:
          dispatch({
              type: 'global/setCountryItem',
              payload: selectedOptions[2]
            });
        break;
      default:
    }

    if (!('value' in this.props)) {
      this.setState({ value : value});
    }
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(value, selectedOptions);
    }
  },

  render() {

    return (
      <Cascader
        value = {this.props.value}
        options= { this.props.global.addressOptions }
        changeOnSelect= { this.props.changeOnSelect }
        placeholder= { this.props.placeholder }
        onChange={ this.handleChange } />
    );
  },
});


RegionGlobal.propTypes = {
  global : PropTypes.object.isRequired
};


export default RegionGlobal;
