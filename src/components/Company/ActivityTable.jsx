import React, { Component, PropTypes } from 'react';
import { Table ,Icon , Tooltip} from 'antd';
import styles from './table.less';

const ActivityTable= ({ companyList , onTableChange}) => {

  const {activeCompanies , loading , filterOption } = companyList;
  const { list , total , current} = activeCompanies;
  const { limit } = filterOption.active

  const renderImportant = (o, row, index) => {
      // console.log(o, row, index);
    if (row.important) {
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
      render:renderText
    },
    {
      title: '采购量',
      dataIndex: 'buy',
      key: 'buy',
      sorter: true,
    },
    {
      title: '重点用户',
      dataIndex: 'important',
      key: 'important',
      className: styles.text_center,
      width: 70,
      render: renderImportant,
    },
    {
      title: '月报活',
      dataIndex: 'activity_sum',
      key: 'activity_sum',
      sorter: true,
    },
    {
      title: '日活均值',
      dataIndex: 'activity_avg',
      key: 'activity_avg',
      sorter: true,
    },
    {
      title: '当月安装量',
      dataIndex: 'install_sum',
      key: 'install_sum',
      sorter: true,
    },
    {
      title: '安装总量',
      dataIndex: 'install_total',
      key: 'install_total',
      sorter: true,
    }
  ];
  const showTotal = () => {
    return `共 ${total} 条`;
  }

  const pagination = () => {
    if (limit >total) {
      return false
    }
    return {
      total: total,
      defaultCurrent: 1,
      current: current / limit + 1 ,
      pageSize: limit,
      showTotal,
      showSizeChanger: true,
    };
  }

  return (
    <div>
      <Table
        loading={ loading }
        onChange={ onTableChange }
        columns={columns}
        dataSource={list}
        pagination={pagination()}
      />
    </div>
  );
};

ActivityTable.propTypes = {
  companyList : PropTypes.object.isRequired,
  onTableChange : PropTypes.func.isRequired
};

export default ActivityTable;
