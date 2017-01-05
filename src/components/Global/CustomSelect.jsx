import React, { Component, PropTypes } from 'react';
import { Select } from 'antd';

const Option = Select.Option;
class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || [],
    };
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({ value });
    }
  }

  handleChange(e) {
    if (!('value' in this.props)) {
      this.setState({ value: e });
    }
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(e);
    }
  }

  render() {
    const children = [];
    this.props.options.map((item, index) => {
      children.push(<Option key={`${item}`}>{item}</Option>);
      return undefined;
    })

    return (
      <Select
        multiple
        placeholder="请选择区域"
        defaultValue={[]}
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
      >
        {children}
      </Select>
    );
  }
}


CustomSelect.propTypes = {
  //options: PropTypes.array.isRequired,
};

export default CustomSelect;
