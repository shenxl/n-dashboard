import React, { Component, PropTypes } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.less';

function IndexPage( { dispatch , example }) {
  const click = () => {
      dispatch({  type: 'example/fetchRemote' })
  }
  return (
    <div className={styles.normal}>
      <h1>Welcome to dva!</h1>
      <hr />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <Button type="primary" onClick={click}>test</Button>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {

};
function mapStateToProps({ example }) {
  return { example }
}

export default  connect(mapStateToProps)(IndexPage);
