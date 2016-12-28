import React, { Component, PropTypes } from 'react';
import { Upload, message, Button, Icon } from 'antd';
import { apiUrl } from '../../utils/constant';

const FilesButton = () => {
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
  const name = 'file';
  const action = `${apiUrl}/containers/import/upload`
  const data = {
    method: 'POST',
  };
  const UpFiles = {
    onChange,
    name,
    action,
    data,
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
