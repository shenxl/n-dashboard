import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './company.less';

const Company = ({ children }) => {
  return (
    <div className={styles.normal}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
};

Company.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Company ;
