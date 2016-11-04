import React from 'react';
import styles from './SignSuccess.less';
import { loginUrl  } from '../../utils/constant';

import { Button } from 'antd';

const SignSuccess = (props) => {
  return (
    <div>
        <p className={styles.desc}> 注册成功，请访问邮箱进行验证 </p>
        <a href={ loginUrl }><Button type="primary" style={{ marginTop: 5 }}>登录</Button></a>
    </div>
  );
};

SignSuccess.propTypes = {
};

export default SignSuccess;
