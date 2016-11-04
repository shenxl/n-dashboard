import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';

import styles from './AuthLayout.less';

const AuthLayout = ({ children , authLayout }) => {
  return (
    <div className={styles.normal}>

      <div className={styles.container}>
        <h1 className={styles.title}>{authLayout.title}</h1>
        {children}
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

function mapStateToProps({ authLayout }) {
  return { authLayout }
}

export default connect(mapStateToProps)(AuthLayout);
