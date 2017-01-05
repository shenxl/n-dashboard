import React, { Component, PropTypes } from 'react';
import { Select, Icon, Input } from 'antd';
import styles from './control.less';

const Option = Select.Option;
class EditControl extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      value: this.props.value || '',
      isEdit: this.props.mode || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({ value });
    }
  }

  handleBlur(e) {
    this.setState({ isEdit: false });
  }

  handleChange(e) {
    if (!('value' in this.props)) {
      this.setState({ value: e });
    }
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    // this.setState({ isEdit : false });
    if (onChange) {
      onChange(e);
    }
  }

  handleEditClick() {
    this.setState({ isEdit: true });
  }

  renderControl() {
    const props = {
      onClick: this.handleEditClick.bind(this),
    }
    if (this.state.isEdit) {
      return (
        <div>
          <Input type="textarea" value={this.state.value} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)} autosize={{ minRows: 2, maxRows: 6 }} />
        </div>)
    }
    return (
      <div>
        <span className={styles.content}> {this.state.value} </span>
        <a className={styles.editIcon} {...props}><Icon type="edit" /></a>
      </div>)
  }

  render() {
    const resultDom = this.renderControl();
    return (
      <div>
        { resultDom }
      </div>
    );
  }
}

EditControl.propTypes = {

};

export default EditControl;
