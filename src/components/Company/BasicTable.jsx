import React, { Component, PropTypes } from 'react';
import { Table, Icon, Tooltip } from 'antd';
import styles from './table.less';

const BasicTable = ({ companyList, onTableChange, onRowClick, rowSelection }) => {
  const { companies, loading, filterOption } = companyList;
  const { list, total, current } = companies;
  const { limit } = filterOption;

  const renderImportant = (o, row, index) => {
      // console.log(o, row, index);
    if (row.important === '1') {
      return (<Icon type="check-circle" style={{ color: '#60BE29' }} />)
    }
    return undefined;
  }


  const renderText = (o, row, index) => {
    let companyName = '';
    if (row.name.length > 15) {
      companyName = (
        <Tooltip placement="bottom" title={row.name}>
          <span>{`${row.name.substr(0, 14)}...`}</span>
        </Tooltip>
        )
    } else {
      companyName = (<span>{row.name}</span>)
    }
    return companyName
  }

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      render: renderText,
    },
    {
      title: '重点关注',
      dataIndex: 'important',
      key: 'important',
      width: 65,
      render: renderImportant,
    },
    {
      title: '采购量',
      dataIndex: 'buy',
      key: 'buy',
      sorter: true,
    },
    {
      title: '区域',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: '省',
      dataIndex: 'province',
      key: 'province',
    },
    {
      title: '市',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: '区/县',
      dataIndex: 'county',
      key: 'county',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
    },
  ];
  const showTotal = () => {
    return `共 ${total} 条`;
  }

  const pagination = () => {
    if (limit > total) {
      return false
    }
    return {
      total,
      defaultCurrent: 1,
      current: (current / limit) + 1,
      pageSize: limit,
      showTotal,
      showSizeChanger: true,
    };
  }

  return (
    <div>
      <h4>
        操作须知&nbsp;
        <Tooltip title="点击或选中单选框，可以对该用户对应的合同、序列号等信息进行修改">
          <Icon type="question-circle-o" />
        </Tooltip>
      </h4>
      <Table
        style={{ cursor: 'pointer' }}
        rowSelection={rowSelection}
        loading={loading}
        onChange={onTableChange}
        columns={columns}
        dataSource={list}
        pagination={pagination()}
        onRowClick={onRowClick}
      />
    </div>
  );
};

BasicTable.propTypes = {
  companyList: PropTypes.object.isRequired,
  onTableChange: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default BasicTable;
