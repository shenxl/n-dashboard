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

    dispatch({
      type: 'global/setAddressItem',
      payload: { selectValue : value }
    });

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
        onChange={ this.handleChange }
        showSearch />
    );
  },
});


RegionGlobal.propTypes = {
  global : PropTypes.object.isRequired
};


export default RegionGlobal;
