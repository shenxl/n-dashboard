import React, { Component, PropTypes } from 'react';
import { Modal, Popover, Row, Col, Input, Button, Checkbox, DatePicker } from 'antd';
import moment from 'moment';

const { MonthPicker, RangePicker } = DatePicker;

class MonthRange extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };
  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }


  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }
  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div>
        <MonthPicker
          disabledDate={this.disabledStartDate}
          showTime
          format="YYYY-MM"
          value={startValue}
          defaultValue={moment(new Date(), 'YYYY-MM')}
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        <MonthPicker
          disabledDate={this.disabledEndDate}
          showTime
          format="YYYY-MM"
          value={endValue}
          defaultValue={moment(new Date(), 'YYYY-MM')}
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        />
      </div>
    );
  }
}
MonthRange.propTypes = {
};

export default MonthRange;
