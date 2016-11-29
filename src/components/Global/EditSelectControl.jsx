import React, { Component, PropTypes } from 'react';
import { Select , Icon , Input } from 'antd';
const Option = Select.Option;

import styles from './control.less';

const EditSelectControl = React.createClass({

  getInitialState() {
    return {
      value: this.props.value || "",
      isEdit : this.props.mode || false
    };
  },

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({ value });
    }
  },

  handleBlur(e){
    this.setState({ isEdit : false });
  },

  handleChange(e) {
    if (!('value' in this.props)) {
      this.setState({ value : e });
    }
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    // this.setState({ isEdit : false });
    if (onChange) {
      onChange(e);
    }
  },

  handleEditClick(){
    this.setState({ isEdit : true });
  },

  renderControl(){
    if(this.state.isEdit){
      const children = this.props.options.map((item) => {
        return (<Option value={item}>{item}</Option>)
      })
      return (
        <Select defaultValue={this.state.value} style={{ width: 200 }} onBlur={this.handleBlur} onChange={this.handleChange}>
          { children }
       </Select>
      )
    } else {
      return (<div>
          <span className={styles.content}> {this.state.value} </span>
          <a className={styles.editIcon} onClick={ this.handleEditClick }><Icon type="edit" /></a>
        </div>)
    }
  },

  render() {
    const resultDom = this.renderControl();
    return (
      <div>
        { resultDom }
      </div>
    );
  },
});


EditSelectControl.propTypes = {

};

export default EditSelectControl;
