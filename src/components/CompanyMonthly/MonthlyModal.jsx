import React, { Component, PropTypes } from 'react';
import { Modal ,Popover ,Row ,Col ,Input,Button  } from 'antd';
import { connect } from 'dva';
import MonthlyTable from './MonthlyTable';
import MonthlyFrom from './MonthlyFrom';

const confirm = Modal.confirm;
const MonthlyModal = ({ companyMonthly , dispatch , company , width  }) => {

 const { selectedRowKeys , currentItem , modalMode , modalVisibel } = companyMonthly;
 const { id: company_id , name } = company;
 const server_id = 99;

  const monthlyModalCancle = () => {
    dispatch({
      type: 'companyMonthly/clearModalState'
    });
  }

  const monthlyModalOK = () => {
    dispatch({
      type: 'companyMonthly/clearModalState'
    });

    dispatch({
      type: 'companies/query',
    });

    dispatch({
      type: 'report/queryMonthly'
    });
  }


  const modalProps = {
    title :  "内网数据录入" ,
    visible : modalVisibel,
    onOk: monthlyModalOK,
    onCancel: monthlyModalCancle,
    cancelText:"取消",
    width
  }


 const onRowClick = (record, index) => {
   dispatch({
     type: 'companyMonthly/getCurrentItem',
     payload : {
       company_id : record.company_id,
       server_id : record.server_id,
       year : record.year,
       month : record.month
     }
   });

   dispatch({
     type: 'companyMonthly/setSelectedRowKeys',
     payload : { selectedRowKeys : [index] }
   });

 }
 const companyName = name;
 const onCreateInner = () => {
   const date = new Date();
   dispatch({
     type: 'companyMonthly/setCurrentItem',
     payload : { currentItem : { company_id ,server_id , year :date.getFullYear() , month: date.getMonth() + 1 } }
   });

   dispatch({
     type: 'companyMonthly/setModalMode',
     payload : { modalMode : 'create' }
   });

 }
 const onRemoveInner = (record, event) => {
   event.stopPropagation();
   dispatch({
     type: 'companyMonthly/removeCurrentItem',
     payload : {
       company_id : record.company_id,
       server_id : record.server_id,
       year : record.year,
       month : record.month
     }
   });

   dispatch({
     type: 'companyMonthly/setSelectedRowKeys',
     payload : { selectedRowKeys : [0] }
   });

 }

 const rowSelection = {
   type: 'radio',
   selectedRowKeys,
   onChange: (selectedRowKeys, selectedRows) => {
     const record = selectedRows[0];
     dispatch({
       type: 'companyMonthly/getCurrentItem',
       payload : {
         company_id : record.company_id,
         server_id : record.server_id,
         year : record.year,
         month : record.month
       }
     });

     dispatch({
       type: 'companyMonthly/setSelectedRowKeys',
       payload : { selectedRowKeys }
     });
   },
 };
 const showAddConfirm = (value) => {
   const content = `
       请确认手动录入内网安装量: ${value} ?
     `;
   confirm({
     title: `请确认录入${name} 内网安装量的操作!`,
     content: content,
     onOk() {
       dispatch({
         type: 'companyMonthly/addInstallSum',
         payload : {
           company_id :company_id,
           server_id : 99,
           sum : value
         }
       });
     },
     onCancel() {},
   });
 }

 const onInstallSumAddBlur = (e) =>{
   e.preventDefault();
   showAddConfirm(e.target.value)
 }

 const monthlyTableProps = {
   companyMonthly ,
   companyName ,
   onRowClick ,
   rowSelection,
   onRemoveInner,
   onCreateInner,
   onInstallSumAddBlur
 }

 const onMonthlyFieldsChange = (fields) => {
   dispatch({
     type: 'companyMonthly/updateCurrentItem',
     payload : fields
   });

 }

 const onSubmitClick = () => {
   dispatch({
     type: 'companyMonthly/replaceOrCreate'
   });
 }

 const monthlyFromProps = {
   currentItem ,
   modalMode ,
   onMonthlyFieldsChange,
   onSubmitClick
 }
 return (
   <Modal {...modalProps} >
     <Row gutter={40}>
       <Col span={15}>
         <MonthlyTable {...monthlyTableProps} />
       </Col>
       <Col span={9}>
         {  modalMode === ''   ? (<div></div>) : <MonthlyFrom {...monthlyFromProps} />}
       </Col>
     </Row>
   </Modal>

 );
};

MonthlyModal.propTypes = {

};

function mapStateToProps({ companyMonthly }) {
  return { companyMonthly }
}
export default  connect(mapStateToProps)(MonthlyModal);
