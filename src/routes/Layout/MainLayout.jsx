import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Menu, Icon, Dropdown } from 'antd';
import classnames from 'classnames';
import MenuBar from '../../components/MainLayout/Menu';
import Header from '../../components/MainLayout/Header';
import styles from './MainLayout.less';

const MainLayout = ({
  children,
  dispatch,
  location,
  mainLayout,
  auth
}) => {

  const onCollapseChange = (value) => {
    dispatch({
      type:'mainLayout/collapseMenu',
      payload: !mainLayout.collapse
    })
    const mode =  !mainLayout.collapse ? 'vertical' : 'inline';
    dispatch({
      type:'mainLayout/changeMenu',
      payload: mode
    })
  }

  const collapseSytle = classnames({
    [styles.aside]:  true,
    [styles.aside_collapse]:mainLayout.collapse,
  });

  const MenuBarProps = {
    location,
    onCollapseChange,
    mainLayout
  }

  const logOut = () => {
    dispatch({ type: 'auth/logout' });
  }

  const HeaderProps = {
    auth,
    logOut
  }

  return (
    <div className={collapseSytle}>
      <MenuBar {...MenuBarProps} />
      <div className={styles.main}>
        <Header {...HeaderProps} />
        <div className={styles.container}>
          <div className={styles.content}>
            <h2>{ mainLayout.PageTitle }</h2>
            {children}
          </div>
        </div>
        <div className={styles.footer}>
          版权所有 © 2016 金山办公软件技术部
        </div>
      </div>
  </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

function mapStateToProps({ mainLayout , auth}) {
  return { mainLayout, auth }
}

export default connect(mapStateToProps)(MainLayout);
