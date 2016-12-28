/*global FileReader*/
import React, { Component, PropTypes } from 'react';
import { Upload, Icon, message } from 'antd';
import { apiUrl } from '../../utils/constant'

const Import = () => {
  const handleChange = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  };

  const uploadProps = {
    action: `${apiUrl}/containers/import/upload`,
    data: { method: 'POST' },
    beforeUpload,
    onChange: handleChange,
  }

  return (
    <Upload {...uploadProps} />
  );
}

Import.propTypes = {
};

export default Import;
