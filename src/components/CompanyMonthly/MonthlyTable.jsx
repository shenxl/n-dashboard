import React from 'react';
import { Table, Button, Row, Col, Tooltip, InputNumber, Popover } from 'antd';

const MonthlyTable = ({
  companyMonthly,
  companyName,
  onRowClick,
  onRemoveInner,
  onCreateInner,
  onInstallSumAddBlur,
}) => {
  const { innerList, loading, installSum } = companyMonthly;
  const renderCompanyName = () => {
    let result = '';
    if (companyName.length > 15) {
      result = (
        <Tooltip placement="bottom" title={companyName}>
          <span>{`${companyName.substr(0, 14)}...`}</span>
        </Tooltip>
        )
    } else {
      result = (<span>{companyName}</span>)
    }
    return result
  }

  const renderDate = (o, row, index) => {
    return `${row.year}-${row.month}`;
  }

  const renderAction = (o, row, index) => {
    return (
      <div>
        <Button type="primary" icon="delete" size="small" onClick={onRemoveInner.bind(this, row)} />
      </div>
    );
  };

  const columns = [
    {
      title: '公司名称',
      dataIndex: 'name',
      key: 'name',
      render: renderCompanyName,
    },
    {
      title: '报活时间',
      dataIndex: 'date',
      key: 'date',
      render: renderDate,
    },
    {
      title: '月报活',
      dataIndex: 'activity_sum',
      key: 'activity_sum',
    },
    {
      title: '日活均值',
      dataIndex: 'activity_avg',
      key: 'activity_avg',
    },
    {
      title: '月安装',
      dataIndex: 'install_sum',
      key: 'install_sum',
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      render: renderAction,
    },
  ];
  const addContent =
    <InputNumber defaultValue={installSum} onChange={onInstallSumAddBlur.bind(this)} />;
  return (
    <div>
      <Row>
        <Col span={9}>
          <span>安装总量 : { installSum || 0 }</span>
        </Col>
        <Col span={15} style={{ textAlign: 'right' }}>
          <Popover
            content={addContent}
            title="录入安装总量(鼠标移出即完成添加)"
            trigger="click"
          >
            <Button type="primary" icon="plus-circle-o" size="small" style={{ marginBottom: '5px' }}>录入安装总量</Button>
          </Popover>
          <Button type="primary" icon="plus-circle-o" size="small" style={{ marginBottom: '5px' }} onClick={onCreateInner}>添加内网信息</Button>
        </Col>
      </Row>
      <Table
        loading={loading}
        columns={columns}
        dataSource={innerList}
        onRowClick={onRowClick}
      />
    </div>
  );
};

MonthlyTable.propTypes = {
};

export default MonthlyTable;
