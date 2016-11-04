import React, { Component, PropTypes } from 'react';
import { Modal ,Popover ,Row ,Col ,Input,Button  } from 'antd';
import OrderFrom from './OrderFrom';

import styles from './order.less';

const OrderModal = ({
  orderModalHandleOk ,
  orders ,
  orderModalHandleCancle ,
  onOrderFieldsChange ,
  onSnAddBlur }) => {

  const { modalVisibel , modalMode , currentItem } = orders;

  const orderFromProps = {
    modalMode,
    currentItem,
    onOrderFieldsChange
  }
  const okText = () => {
    switch (modalMode) {
      case 'edit':
        return '编辑'
        break;
      case 'add':
        return '添加'
        break;
      default:
    }
  }

  const addContent = <Input  type="textarea"  autosize={{ minRows: 2, maxRows: 6 }} defaultValue={""} onBlur={onSnAddBlur.bind(this)} />;

  return (
    <div>
      <Modal
        title={currentItem.order_name && currentItem.order_name.value || "请填写合同内容" }
        visible={ modalVisibel }
        onOk = {orderModalHandleOk}
        onCancel = {orderModalHandleCancle}
        okText={okText()} cancelText="取消"
      >
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
        <OrderFrom {...orderFromProps}/>
      </Modal>
    </div>
  );
};

OrderModal.propTypes = {
    orderModalHandleOk : PropTypes.func.isRequired,
    orderModalHandleCancle : PropTypes.func.isRequired,
    onOrderFieldsChange : PropTypes.func.isRequired,
    onSnAddBlur : PropTypes.func.isRequired,
};

export default OrderModal;
