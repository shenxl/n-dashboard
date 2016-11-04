import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Checkbox , Icon} from 'antd';
import { Link } from 'react-router';
import { connect } from 'dva';
import styles from './Singup.less';
import { loginUrl , signupUrl } from '../../utils/constant';

const FormItem = Form.Item;

function noop() {
  return false;
}
const SignupClass = ({ form, location, dispatch , data}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const {email , password} = values;
      dispatch({
        type: 'auth/signup',
        data: {
          email:`${email}@kingsoft.com`,
          password
        }
      })
    });
  }


  const formItemLayout = {
       labelCol: { span: 4 },
       wrapperCol: { span: 8 },
  };

  const { getFieldDecorator } = form;

  const checkPass = (rule, value, callback) => {
     const { validateFields } = form;
     if (value) {
       validateFields(['rePasswd'], { force: true });
     }
     callback();
   };

  const checkPass2 = (rule, value, callback) => {
     const { getFieldValue } = form;
     if (value && value !== getFieldValue('password')) {
       callback('两次输入的密码不一致');
     } else {
       callback();
     }
   };

  return (
    <Form horizontal className={styles.form}>
      <FormItem
        {...formItemLayout}
        label="Email"
        hasFeedback
        >
        {getFieldDecorator('email', {
            validateFirst: true,
            rules: [
              { required: true, min: 5, message: '用户名至少需要5个字符' }
            ],
          })(
          <Input addonBefore={<Icon type="user" />} placeholder="请输入公司邮箱" addonAfter="@kingsoft.com"  placeholder="您的名字" />
        )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [
              { required: true, whitespace: true, message: '请输入密码' },
              { validator: checkPass },
            ],
          })(
            <Input type="password" autoComplete="off" placeholder="请输入密码" addonBefore={<Icon type="lock" />}
              onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="确认密码"
          hasFeedback
        >
          {getFieldDecorator('rePasswd', {
            rules: [{
              required: true,
              whitespace: true,
              message: '请确认您的密码',
            }, {
              validator: checkPass2,
            }],
          })(
            <Input type="password" autoComplete="off" placeholder="两次输入的密码要一致"
              onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
            />
          )}
        </FormItem>
          <FormItem wrapperCol={{ span: 8, offset: 6 }}>
          <Button type="primary" onClick={handleSubmit}>注册</Button>

          <span className={styles.signuptext}>已有账号？<Link to={ loginUrl }>直接登陆</Link></span>

        </FormItem>
      </Form>)
}

const Signup = Form.create()(SignupClass);
function mapStateToProps({ auth }) {
  return {
    data: auth,
  }
}
export default connect(mapStateToProps)(Signup);
