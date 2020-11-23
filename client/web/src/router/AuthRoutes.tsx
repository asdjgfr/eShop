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

interface iProps extends WithTranslation {
  location?: any;
  globalConfig?: typeof store.globalConfig;
  history?: typeof store.history;
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
@inject("globalConfig", "history")
class AuthRoutes extends React.Component<iProps, iState> {
  state = {
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
    const needAuth = this.matchRouter(mainRoutes, this.props.location.pathname);
    if (needAuth) {
      const tip = this.props.t("authing");
      this.props.globalConfig?.setLoadingTip(tip);
      await syncSetState.call(this, {
        needAuth,
        authing: true,
        passAuth: false,
      });
      console.log(123, this.state.authing);
      const cs = checkSignin();
      globalApi["/api/check-sign-in"]?.cancel();
      globalApi["/api/check-sign-in"] = cs;
      const res = await cs.data;
      console.log(456, res);
      if (res.code === 200) {
        await syncSetState.call(this, { passAuth: true });
      }
      await syncSetState.call(this, { authing: false });
      this.props.globalConfig?.toggleLoading(false);
    }
  }
  async componentDidMount() {
    await this.authUser();
    const unListen = this.props.history?.listen(async (location) => {
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
    const { needAuth, passAuth, authing } = this.state;
    let render = null;
    console.log(1, needAuth);
    console.log(2, passAuth);
    console.log(3, authing);
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
