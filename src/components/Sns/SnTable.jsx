import React, { Component, PropTypes } from 'react';
import { Table ,Icon , Tooltip , Button , Popover , Input ,Row ,Col} from 'antd';
import classnames from 'classnames';

import styles from './snTable.less'

const SnTable = ({ sns , onSnEditBlur ,onSnAddBlur , onRemoveSn}) => {


  const {list , loading } = sns;

  const renderDelete = (o, record, index) => {
    return (
      <div>
        <Button type="primary" size="small" icon="delete" onClick={onRemoveSn.bind(this,record)} />
      </div>
    );
  };
  const renderEdit =  (sn, record, index) => {

      const editStyles = classnames({
        [styles.app_name_edit]:  true,
        [styles.app_name_normal]: false,
      });

      const content = <Input type="textarea"  autosize={{ minRows: 2, maxRows: 6 }} defaultValue={record.sn} onBlur={onSnEditBlur.bind(this,record)}  />;
      // const visible = this.state.visible[index];
      return (
        <div>
          <span className={styles.app_name}>
            {record.sn}
          </span>
          <Popover content={content} title="修改序列号(鼠标移出即完成修改)" trigger="click">
            <Icon type="edit" className={editStyles} />
          </Popover>
        </div>
      );
    };

  const columns = [
    {
      title: '序列号',
      dataIndex: 'sn',
      key: 'sn',
      render:renderEdit
    },
    {
      title: '序列号',
      dataIndex: 'opt',
      key: 'opt',
      render:renderDelete
    }
  ];

  const pagination = () => {
    if (5 > list.length) {
      return false
    }
    return {
      total: list.length,
      pageSize: 5,
      showSizeChanger: false,
    }
  };

  const addContent = <Input  type="textarea"  autosize={{ minRows: 2, maxRows: 6 }} defaultValue={""} onBlur={onSnAddBlur.bind(this)} />;
  return (
    <div>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Popover
           content={ addContent }
           title="添加序列号(鼠标移出即完成添加)"
           trigger="click"
         >
          <Button type="primary" icon="plus-circle-o" size="small" style={{marginBottom:"5px"}}>添加序列号</Button>
        </Popover>

        </Col>
      </Row>

      <Table
        size="small"
        loading={ loading }
        columns={ columns }
        dataSource={ list }
        pagination ={ pagination() }
      />
    </div>
  );
};

SnTable.propTypes = {
  sns : PropTypes.object.isRequired,
  onSnEditBlur:PropTypes.func.isRequired,
  onSnAddBlur : PropTypes.func.isRequired,
  onRemoveSn : PropTypes.func.isRequired
};

export default SnTable;
