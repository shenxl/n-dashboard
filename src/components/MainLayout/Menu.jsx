import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import classnames from 'classnames';
import styles from './Menu.less';

const SubMenu = Menu.SubMenu;
const getMenuKeyFromUrl = ({ pathname, onCollapseChange }) => {
  let key = '';
  try {
    key = pathname.match(/\/([^\/]*)/i)[1];
    /* eslint no-empty:0 */
  } catch (e) {}
  return key;
}

const collapse = false;

function MenuBar({ location, mainLayout, onCollapseChange }) {
  const { collapse } = mainLayout;

  const collapseSytle = classnames({
    [styles.sider]: true,
    [styles.sider_collapse]: collapse,
  });

  const analyticalTitle =
    (<span><Icon type="area-chart" />
      <span className={styles.nav_text}>分析</span>
    </span>)

  const settingTitle =
    (<span><Icon type="setting" />
      <span className={styles.nav_text}>管理</span>
    </span>)

  const getMenu = () => {
    if (mainLayout.showMenu) {
      return (<Menu
        mode={mainLayout.menuMode}
        theme="dark"
        selectedKeys={[getMenuKeyFromUrl(location.pathname)]}
      >
        <SubMenu title={analyticalTitle}>
          <Menu.Item key="/company/government">
            <Link to="/company/government">
              <span className={styles.nav_text}>政府管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/company/enterprise">
            <Link to="/company/enterprise">
              <span className={styles.nav_text}>企业管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/company/finance">
            <Link to="/company/finance">
              <span className={styles.nav_text}>金融管理</span>
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu title={settingTitle}>
          <Menu.Item key="/setting/import">
            <Link to="/setting/import">
              <span className={styles.nav_text}>数据导入</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/setting/export">
            <Link to="/setting/export">
              <span className={styles.nav_text}>数据导出</span>
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>)
    }
    return undefined;
  }
  const divprops = {
    onClick: onCollapseChange,
  }
  return (
    <aside className={collapseSytle}>
      <div className={styles.logo} />
      { getMenu() }
      <div className={styles.action} {...divprops}>
        {collapse ? <Icon type="right" /> : <Icon type="left" />}
      </div>
    </aside>
  );
}

MenuBar.propTypes = {
  location: PropTypes.object,
  onCollapseChange: PropTypes.func,
  mainLayout: PropTypes.object,
};

export default MenuBar;


// <Menu.Item key="/">
//   <Link to="/overview"><Icon type="laptop" />
//     <span className={styles.nav_text}>概览</span>
//   </Link>
// </Menu.Item>
// <SubMenu title={analyticalTitle}>
//   <Menu.Item key="/analytical">
//     <Link to="/company">
//       <span className={styles.nav_text}>按企业维度</span>
//     </Link>
//   </Menu.Item>
//   <Menu.Item key="/group">
//     <Link to="/group">
//       <span className={styles.nav_text}>按集团维度</span>
//     </Link>
//   </Menu.Item>
// </SubMenu>
