import React from 'react';
import { Table } from 'antd';

const Demo = ({ demo }) => {
  const {list , loading } = demo;
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address'
    }
  ];

  return (
    <div>
      <Table
        loading={ loading }
        columns={ columns }
        dataSource={ list }
      />
    </div>
  );
};

Demo.propTypes = {
};

export default Demo;
