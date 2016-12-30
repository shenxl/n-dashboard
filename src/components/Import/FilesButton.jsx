import React, { Component, PropTypes } from 'react';
import { Upload, message, Button, Icon } from 'antd';
import { apiUrl, importFolder } from '../../utils/constant';
/*global localStorage*/
const FilesButton = () => {
  const beforeUpload = (file) => {
    const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (!isExcel) {
      message.error('You can only upload JPG file!');
    }
    return isExcel;
  }

  const onChange = (info) => {
    //console.log(info);
    if (info.file.status === 'uploading') {

    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  const name = 'import';
  const action = `${apiUrl}/${importFolder}/import`;
  const headers = {
    authorization: localStorage.getItem('n-token') || '',
  };
  const data = {
    method: 'POST',
  };
  const UpFiles = {
    onChange,
    beforeUpload,
    name,
    action,
    data,
    headers,
  }
  return (
    <Upload {...UpFiles}>
      <Button type="ghost">
        <Icon type="upload" /> 上传文件
      </Button>
    </Upload>
  );
}
FilesButton.PropTypes = {
}
export default FilesButton
