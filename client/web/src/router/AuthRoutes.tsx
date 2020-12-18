import React from "react";

import { renderRoutes } from "react-router-config";
import { mainRoutes, flatRoutes } from "@/router/routeMap";
import find from "lodash/find";
import { withTranslation, WithTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import { checkSignin } from "@/api/user";
import { inject } from "mobx-react";
import store from "@/store";
import { syncSetState } from "@/lib/pubfn";
import globalApi from "@/api/globalApi";
import history from "@/router/history";

interface iProps extends WithTranslation {
  globalConfig?: typeof store.globalConfig;
}

interface iState {
  // 是否需要验证
  needAuth: boolean;
  // 是否通过验证
  passAuth: boolean;
  // 正在验证
  authing: boolean;
  // 当前保存的路由地址
  pathname: string;
  unListen: any;
}
@inject("globalConfig")
class AuthRoutes extends React.Component<iProps, iState> {
  state: iState = {
    needAuth: false,
    passAuth: false,
    authing: false,
    pathname: "",
    unListen: () => {},
  };
  matchRouter(mainRoutes: any[], path: string) {
    return find(flatRoutes(mainRoutes), { path, auth: true }) !== undefined;
  }
  async authUser() {
    const needAuth = this.matchRouter(mainRoutes, history.location.pathname);
    if (needAuth) {
      const tip = this.props.t("authing")?.toString() ?? "";
      this.props.globalConfig?.setLoadingTip(tip);
      await syncSetState.call(this, {
        needAuth,
        authing: true,
        passAuth: false,
      });
      const cs = checkSignin();
      globalApi["/api/check-sign-in"]?.cancel();
      globalApi["/api/check-sign-in"] = cs;
      const res = await cs.data;
      if (res.code === 200) {
        await syncSetState.call(this, { passAuth: true });
      }
      await syncSetState.call(this, { authing: false });
      this.props.globalConfig?.toggleLoading(false);
    }
  }
  async componentDidMount() {
    await this.authUser();
    const unListen = history.listen(async (location: any) => {
      // 最新路由的 location 对象，可以通过比较 pathname 是否相同来判断路由的变化情况
      if (this.state.pathname !== location.pathname) {
        await syncSetState.call(this, {
          pathname: location.pathname,
          needAuth: false,
          passAuth: false,
          authing: false,
        });
        await this.authUser();
      }
    });
    this.setState({
      unListen,
    });
  }
  componentWillUnmount() {
    this.state.unListen();
  }
  shouldComponentUpdate(
    nextProps: Readonly<iProps>,
    nextState: Readonly<iState>,
    nextContext: any
  ): boolean {
    return !nextState.authing;
  }
  render() {
    const { needAuth, passAuth } = this.state;
    let render = null;
    if (needAuth) {
      if (passAuth) {
        render = renderRoutes(mainRoutes);
      } else {
        render = <Redirect to="/403" />;
      }
    } else {
      render = renderRoutes(mainRoutes);
    }
    return <>{render}</>;
  }
}
export default withTranslation()(AuthRoutes);
