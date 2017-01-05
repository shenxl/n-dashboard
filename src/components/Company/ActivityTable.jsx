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

  const renderItem = (o, row, index) => {
    if (!o) {
      return '暂无记录'
    }
    return o
  }

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: renderText,
    },
    {
      title: '采购量',
      dataIndex: 'buy',
      key: 'buy',
      width: '14%',
      sorter: true,
    },
    {
      title: '本月报活',
      dataIndex: 'activity_sum',
      key: 'activity_sum',
      width: '14%',
      render: renderItem,
      sorter: true,
    },
    {
      title: '日活均值',
      dataIndex: 'activity_avg',
      key: 'activity_avg',
      width: '14%',
      render: renderItem,
      sorter: true,
    },
    {
      title: '本月安装量',
      dataIndex: 'install_sum',
      key: 'install_sum',
      width: '14%',
      render: renderItem,
      sorter: true,
    },
    {
      title: '安装总量',
      dataIndex: 'total',
      key: 'total',
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
      pageSizeOptions: ['6', '10', '20', '30', '40'],
    };
  }

  return (
    <div>
      <Table
        style={{ cursor: 'pointer' }}
        loading={loading}
        onChange={onTableChange}
        columns={columns}
        dataSource={list}
        pagination={pagination()}
        onRowClick={onRowClick}
        scroll={{ y: 340 }}
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
