import React, { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import {
  redirectPathIfRequireAuthFails,
  redirectPathIfNotRequireAuthFails
} from './routes';

import {
  sidebarJSON as routesJSON
} from './sidebar';

import { getLocalStorage } from './common';
import { logoutAction } from '../redux/auth/authSlice';
import Notification from './notification';
import { RootState } from '../redux/store/store';
import { compose, Dispatch } from 'redux';
import { GlobalLoader } from '../components/helping/loader';

export default function (ComposedComponent: any) {
  interface WithAuthProps extends RouteComponentProps {
    auth: any;
    logoutRedux: any;
    match: any;
    history: any;
  };

  interface WithAuthState {
    isAuthenticate: boolean;
  };

  class WithAuth extends PureComponent<WithAuthProps, WithAuthState> {
    constructor (props: any) {
      super(props);

      this.state = {
        isAuthenticate: false
      };
    }

    componentDidMount () {
      this.checkAuth();
    }

    componentDidUpdate (prevProps: any, prevState: any) {
      if (prevProps.auth.isLoggedIn !== this.props.auth.isLoggedIn) {
        this.setState(
          {
            isAuthenticate: false
          },
          () => {
            this.checkAuth();
          }
        );
      }
    }

    checkAuth = () => {
      const isLoggedInProp = this.props.auth.isLoggedIn;
      const userType = this.props.auth.userData.userType;
      const path = this.props.match.path;
      const routePaths = this.getRouteArray(userType, true);
      const notRequireAuthPaths = this.getRouteArray(userType, false);

      if (routePaths.includes(path) && !isLoggedInProp) {
        this.props.history.push({
          pathname: redirectPathIfRequireAuthFails
        });
      } else if (
        (
          notRequireAuthPaths.includes(path) ||
          !routePaths.includes(path)
        ) && isLoggedInProp
      ) {
        if (getLocalStorage({ key: 'token' })) {
          this.props.history.push({
            pathname: this.redirectOn(userType)
          });
        } else {
          <Notification message='Session expired' />;
          this.props.logoutRedux();
        }
      } else {
        this.setState({
          isAuthenticate: true
        });
      }
    };

    getRouteArray = (type = 'all', authReq: boolean) => {
      const routes = routesJSON((arg) => arg);
      const pathArr = [];
      for (let index = 0; index < routes.length; index++) {
        const element: any = routes[index];
        if (element.child && element.child.length > 0) {
          for (let indexJ = 0; indexJ < element.child.length; indexJ++) {
            const elementJ = element.child[indexJ];
            if (
              elementJ.userTypes &&
              (elementJ.userTypes.includes(type) || type === 'all') &&
              elementJ.authRequire === authReq
            ) {
              pathArr.push(elementJ.endPoint);
            }
          }
        } else {
          if (
            element.userTypes &&
            (element.userTypes.includes(type) || type === 'all') &&
            element.authRequire === authReq
          ) {
            pathArr.push(element.endPoint);
          }
        }
      }
      return pathArr;
    }

    redirectOn = (type: string) => {
      let redirectOn = '';
      for (let index = 0; index < redirectPathIfNotRequireAuthFails.length; index++) {
        const element = redirectPathIfNotRequireAuthFails[index];
        if (element.userTypes && element.userTypes.includes(type)) {
          redirectOn = element.path;
        }
      }
      return redirectOn;
    }

    render () {
      const { isAuthenticate } = this.state;

      if (isAuthenticate) {
        return (
          <>
            <ComposedComponent {...this.props} />
          </>
        );
      }

      return <GlobalLoader />;
    }
  }

  const mapStateToProps = (state: RootState) => {
    return {
      auth: state.auth
    };
  };

  const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
      logoutRedux: () => dispatch(logoutAction())
    };
  };

  const connector = connect(mapStateToProps, mapDispatchToProps);

  return compose(
    withRouter,
    connector
  )(WithAuth);
}
