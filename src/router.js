import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/Layout/IndexPage';

import Login from './routes/Auth/Login';
import Signup from './routes/Auth/Signup';

import SignSuccess from './components/Auth/SignSuccess'

import AuthLayout from './routes/Auth/AuthLayout';
import MainLayout from './routes/Layout/MainLayout';
import NotFound from './routes/Layout/NotFound';

import Company from './routes/Company/Company';
import Government from './routes/Company/Government';
import Enterprise from './routes/Company/Enterprise';
import Finance from './routes/Company/Finance';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={MainLayout} >
        <IndexRoute component={IndexPage} />
          <Route path="pass/" component={AuthLayout} >
            <Route path="login" component={Login} />
            <Route path="signup" component={Signup} />
            <Route path="signsuccess" component={SignSuccess} />
          </Route>
          <Route path="company/" component={Company} >
            <Route path="government" component={Government} />
            <Route path="enterprise" component={Enterprise} />
            <Route path="finance" component={Finance} />
          </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};
