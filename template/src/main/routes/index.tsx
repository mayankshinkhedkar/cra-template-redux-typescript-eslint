import React from 'react';
import { Switch, Router } from 'react-router-dom';
import RouteWithLayout from './routeWithLayout';

import browserHistory from '../utilities/browserHistory';
import WithAuth from '../utilities/withAuth';
import logger from '../utilities/logger';

import MainLayout from '../layouts/main';
import AuthLayout from '../layouts/auth';

import ScrollToTop from '../components/scrollToTop';
import Login from '../container/login';
import Dashboard from '../container/dashboard';
import Notfound from '../container/notfound';
import NetworkDetector from '../components/networkDetector';
import Signup from '../container/signup';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../redux/store/store';

interface RoutesProps {
  isLoggedIn: boolean;
};
class Routes extends React.PureComponent<RoutesProps> {
  componentDidMount () {
    // connectSocketOn(this.socketConnectionCheck)
  }

  componentWillUnmount () {
    // disconnectSocketEmit()
  }

  socketConnectionCheck = () => {
    logger('socket connected');
  };

  render () {
    const { isLoggedIn } = this.props;

    return (
      <Router history={browserHistory}>
        <NetworkDetector />
        <ScrollToTop />
        <Switch>
          <RouteWithLayout
            component={Login}
            exact
            layout={WithAuth(AuthLayout)}
            path='/'
          />

          <RouteWithLayout
            component={Signup}
            exact
            layout={WithAuth(AuthLayout)}
            path='/signup'
          />

          <RouteWithLayout
            component={Dashboard}
            exact
            layout={WithAuth(MainLayout)}
            path='/dashboard'
          />

          <RouteWithLayout component={Notfound} layout={isLoggedIn ? MainLayout : AuthLayout} path='*' />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

const connector = connect(mapStateToProps);

export default compose(
  connector
)(Routes);
