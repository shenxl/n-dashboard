import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Checkbox , Icon} from 'antd';
import { Link } from 'react-router';
import { connect } from 'dva';
import { emailAddonAfter } from '../../utils/constant';

import { loginUrl , signupUrl } from '../../utils/constant';
import styles from './Login.less';

const FormItem = Form.Item;

function noop() {
  return false;
}
const LoginClass = ({ form, location, dispatch}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const {email , password} = values;
      dispatch({
        type: 'auth/login',
        data: {
          email:`${email}@${emailAddonAfter}`,
          password,
          redirect: location.query
        }
      })
    });
  }

  const formItemLayout = {
       labelCol: { span: 4 },
       wrapperCol: { span: 8 },
  };

  const { getFieldDecorator } = form;


  return (
    <Form horizontal className={styles.form}>
      <FormItem
        {...formItemLayout}
        label="Email:"
        hasFeedback
        >
        {getFieldDecorator('email', {
            rules: [
              { required: true,message:'请输入公司邮箱'},
            ],
          })(
          <Input addonBefore={<Icon type="user" />} placeholder="请输入公司邮箱" addonAfter={`@${emailAddonAfter}`} />
        )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="密码:"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [
              { required: true, whitespace: true, message: '请输入密码' },
            ],
          })(
            <Input type="password" autoComplete="off" addonBefore={<Icon type="lock" />}
              onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
            />
          )}
        </FormItem>

        <FormItem wrapperCol={{ span: 6 , offset: 4 }}>
          <Button type="primary" onClick={handleSubmit}>登陆</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost">
             <Link to={signupUrl}>
                <span>快速注册</span>
             </Link>
          </Button>
        </FormItem>
      </Form>)
}

const Login = Form.create()(LoginClass);
function mapStateToProps({ auth }) {
  return {
    data: auth,
  }
}
export default connect(mapStateToProps)(Login);
