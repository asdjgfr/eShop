import React from "react";

import { renderRoutes } from "react-router-config";
import { mainRoutes, flatRoutes } from "@/router/routeMap";
import find from "lodash/find";
import Loading from "@/pages/Loading";
import { Redirect } from "react-router-dom";
import { checkSignin } from "@/api/user";
import { inject } from "mobx-react";
import store from "@/store";

interface iProps {
  location?: any;
  globalConfig?: typeof store.globalConfig;
}

interface iState {
  // 是否需要验证
  needAuth: boolean;
  // 是否通过验证
  passAuth: boolean;
  // 正在验证
  authing: boolean;
}
@inject("globalConfig")
class AuthRoutes extends React.Component<iProps, iState> {
  state = {
    needAuth: false,
    passAuth: false,
    authing: true,
  };
  matchRouter(mainRoutes: any[], path: string) {
    return find(flatRoutes(mainRoutes), { path, auth: true }) !== undefined;
  }
  async authUser() {
    this.setState({ authing: true });
    const res = await checkSignin();
    if (res.code === 200) {
      this.setState({ authing: false, passAuth: true });
    }
    this.props.globalConfig?.toggleLoading(false);
  }
  componentDidMount() {
    const needAuth = this.matchRouter(mainRoutes, this.props.location.pathname);
    if (needAuth) {
      this.authUser();
    }
    this.setState({
      needAuth,
    });
  }
  componentDidUpdate(
    prevProps: Readonly<iProps>,
    prevState: Readonly<iState>,
    snapshot?: any
  ) {
    const needAuth = this.matchRouter(mainRoutes, this.props.location.pathname);
    if (needAuth !== this.state.needAuth) {
      this.authUser();
      this.setState({
        needAuth,
      });
    }
    if (this.state.authing) {
      this.props.globalConfig?.toggleLoading(true);
      this.props.globalConfig?.setLoadingTip("正在验证身份...");
    }
  }
  render() {
    const { needAuth, passAuth, authing } = this.state;
    let render = null;
    if (needAuth) {
      if (!authing) {
        if (passAuth) {
          render = renderRoutes(mainRoutes);
        } else {
          render = <Redirect to="/403" />;
        }
      }
    } else {
      render = renderRoutes(mainRoutes);
    }
    return <>{render}</>;
  }
}

export default AuthRoutes;
