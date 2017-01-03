import React, { Component, PropTypes } from 'react';
import { Modal, Popover, Row, Col, Input, Button, Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['政府', '企业', '金融'];
const defaultCheckedList = ['政府'];

const SelectData = React.createClass({

  getInitialState() {
    return {
      checkedList: defaultCheckedList,
      checkAll: false,
    };
  },
//   function onChange(checkedValues) {
//
// }
  onChange(checkedList) {
    console.log(checkedList)
    console.log('checked = ', checkedValues);
    this.setState({
      checkedList,
      checkAll: checkedList.length === plainOptions.length,
    });
  },
  onCheckAllChange(e) {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      checkAll: e.target.checked,
    });
  },
  render() {
    return (
      <div>
        <div>
          <Checkbox

            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            全部
          </Checkbox>
        </div>
        <br />
        <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />
      </div>
    );
  },

});
SelectData.propTypes = {
};

export default SelectData;
