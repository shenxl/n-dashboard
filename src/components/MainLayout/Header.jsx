
import React, { PropTypes } from 'react';
import { Menu, Icon, Popover} from 'antd';
import { Link } from 'dva/router';
import classnames from 'classnames';
import styles from './Header.less';

const Header = ({ auth , logOut }) => {

  const logoutShow = classnames({
    [styles.logout_hide]: !auth.isLogin,
  })
  const { currentUser } = auth;

  const content = (
      <div className={styles.Inner}>
        <div className={styles.Title}>
          <div className={styles.PopoverAvtar}>
            <img className={styles.thumb60} src="http://avatar.qwps.cn/avatar/%E6%B2%88%E9%9C%84%E9%9B%B7" />
          </div>
          <div className={styles.PopoverContact}>{currentUser.email}</div>
        </div>
          <div className={styles.InnerContent}>
              <li><Link to="/user/info">个人中心</Link></li>
              <li><a href="#" onClick={logOut}>退出</a></li>
          </div>
      </div>
  );

  const loginPanel = () => {
    if(auth.isLogin){
      return (
        <li>
          <Popover placement="bottomRight" content={content} trigger="click">
            <span className={styles.userName}>
              {currentUser.email}
              <Icon type="down" />
            </span>
          </Popover>
        </li>
      );
    }
  }

  return (
    <div className={styles.ceiling}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.h1}>
            WPS 企业数据中心
          </h1>
        </div>
        <ul className={styles.right}>
          { loginPanel() }
          <li>|</li>
          <li>帮助中心</li>
        </ul>
      </div>
    </div>
  );
};

Header.propTypes = {
  auth : PropTypes.object.isRequired,
  logOut : PropTypes.func.isRequired,
};

export default Header;
