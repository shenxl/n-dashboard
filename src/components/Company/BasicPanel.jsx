import React, { Component, PropTypes } from 'react';
import { Tabs, Modal } from 'antd';
import { connect } from 'dva';
import CompanyInfo from './CompanyInfo';
import OrderTable from '../Order/OrderTable';
import SnTable from '../Sns/SnTable';
import styles from './panel.less';
import { prossessRegionData, prossessRegionName } from '../../utils/globalUtils';

const _ = require('lodash');

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;


const BasicPanel = ({ dispatch, orders, sns, global, currentType, currentIndustry, company }) => {
  const { modalMode } = orders;
  const { province, city } = global;
  const showEditConfirm = (record, value) => {
    const content = `
      请确认是否要将序列号 ${record.sn},
      修改为 ${value} ?
      `;

    confirm({
      title: `请确认修改 ${company.name} 序列号的操作!`,
      content,
      onOk() {
        dispatch({
          type: 'sns/editSn',
          payload: {
            sn: value,
            companyId: company.id,
            id: record.id,
          },
        });
      },
      onCancel() {},
    });
  }

  const showRemoveConfirm = (recode) => {
    const content = `
        请确认是否删除序列号 ${recode.sn} ?
      `;
    confirm({
      title: `请确认删除 ${company.name} 序列号的操作!`,
      content,
      onOk() {
        dispatch({
          type: 'sns/removeSn',
          payload: {
            companyId: company.id,
            id: recode.id,
          },
        });
      },
      onCancel() {

      },
    });
  }

  const showAddConfirm = (value) => {
    const content = `
        请确认是否添加序列号 ${value} ?
      `;
    confirm({
      title: `请确认添加 ${company.name} 序列号的操作!`,
      content,
      onOk() {
        dispatch({
          type: 'sns/addSn',
          payload: {
            companyId: company.id,
            sn: value,
          },
        });
      },
      onCancel() {},
    });
  }

  const onSnAddBlur = (e) => {
    e.preventDefault();
    if (e.target.value !== '' && e.target.value.length === 25) {
      showAddConfirm(e.target.value)
    } else if (e.target.value.length !== 25) {
      Modal.error({
        title: 'SN位数错误',
        content: '请确认SN号位数为25位',
      });
    }
  }

  const onSnEditBlur = (record, e) => {
    e.preventDefault();
    if (e.target.value.length !== 25) {
      Modal.error({
        title: 'SN位数错误',
        content: '请确认SN号位数为25位',
      });
    } else if (record.sn !== e.target.value) {
      showEditConfirm(record, e.target.value)
    }
  }

  const onRemoveSn = (record) => {
    showRemoveConfirm(record)
  }


  const onEditOrder = (record) => {
    dispatch({
      type: 'orders/setCurrentItem',
      payload: record.id,
    });

    dispatch({
      type: 'orders/setModalState',
      payload: {
        modalVisibel: true,
        modalMode: 'edit',
      },
    });
  }
  const onCreateOrder = () => {
    dispatch({
      type: 'orders/setCurrentItem',
      payload: undefined,
    });

    dispatch({
      type: 'orders/setModalState',
      payload: {
        modalVisibel: true,
        modalMode: 'add',
      },
    });
  }

  const orderModalHandleOk = () => {
    switch (modalMode) {
      case 'edit':
        dispatch({
          type: 'orders/edit',
          payload: company.id,
        })
        break;
      case 'add':
        dispatch({
          type: 'orders/create',
          payload: company.id,
        })
        break;
      default:
    }
  }

  const orderModalHandleCancle = () => {
    dispatch({
      type: 'orders/clearModalState',
    });
  }

  const onOrderFieldsChange = (fields) => {
    dispatch({
      type: 'orders/updateCurrentItem',
      payload: fields,
    });
  }

  const showUpdateCompanyConfirm = () => {
    const content = `
        请确认是否对修改内容进行保存?
      `;
    confirm({
      title: '请确认是否对修改内容进行保存',
      content,
      onOk() {
        dispatch({
          type: 'companies/updateCompany',
        });
      },
      onCancel() {
      },
    });
  }
  const saveCompany = () => {
    const isSave = showUpdateCompanyConfirm();
    // if (isSave) {
    //   Modal.success({
    //   title: '保存成功',
    //   content: '保存成功',
    //   });
    // }
  }

  const onCompanyFiledsChange = (fields) => {
    // console.log("fields" , fields);
    if (fields.regionData) {
      const result = prossessRegionName(fields.regionData.value);
      dispatch({
        type: 'companies/updateCurrentItem',
        payload: result,
      });
    } else if (fields.typeData) {
      const length = fields.typeData.value.length;
      const result = {};
      if (length === 2) {
        _.assign(result, { type: { value: fields.typeData.value[0] } });
        _.assign(result, { industry: { value: fields.typeData.value[1] } });
      } else if (length === 1) {
        _.assign(result, { type: { value: fields.typeData.value[0] } });
        _.assign(result, { industry: { value: '' } });
      }
      dispatch({
        type: 'companies/updateCurrentItem',
        payload: result,
      });
    } else {
      dispatch({
        type: 'companies/updateCurrentItem',
        payload: fields,
      });
    }
  }

  const orderProps = {
    orders,
    onEditOrder,
    onCreateOrder,
    orderModalHandleOk,
    orderModalHandleCancle,
    onOrderFieldsChange,
    onSnAddBlur,
  }

  const snProps = {
    sns,
    onSnEditBlur,
    onSnAddBlur,
    onRemoveSn,
  }

  const companyInfoProps = {
    currentItem: company,
    currentType,
    currentIndustry,
    onCompanyFiledsChange,
    saveCompany,
    global,
    dispatch,
  }

  const currentItem = () => {
    return (
      <Tabs tabPosition={'right'}>
        <TabPane tab="基本信息" key="1">
          <CompanyInfo {...companyInfoProps} />
        </TabPane>
        <TabPane tab="合同信息" key="2">
          <OrderTable {...orderProps} />
        </TabPane>
        <TabPane tab="序列号信息" key="3">
          <SnTable {...snProps} /></TabPane>
      </Tabs>
    );
  }

  return (
    <div>
      <h3 style={{ marginBottom: '8px' }}>{company.name}</h3>
      { currentItem() }
    </div>
  );
};

BasicPanel.propTypes = {

};

function mapStateToProps({ orders, sns, global, companies }) {
  const { currentItem: company, currentType, currentIndustry } = companies;
  return { orders, sns, global, currentType, currentIndustry, company }
}

export default connect(mapStateToProps)(BasicPanel);
