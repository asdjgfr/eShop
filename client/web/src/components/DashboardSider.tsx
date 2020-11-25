import React from "react";
import { Link } from "react-router-dom";
import { Menu, Spin, message } from "antd";
import { inject, observer } from "mobx-react";
import store from "@/store";
import { getUserMenus } from "@/api/user";
import { syncSetState } from "@/lib/pubfn";
import { withTranslation, WithTranslation } from "react-i18next";
import Icons from "@/components/Icons";
import history from "@/router/history";

interface iProps extends WithTranslation {
  userMenus?: typeof store.userMenus;
}
interface iState {
  pathname: string;
  loading: boolean;
  cancelReq: any;
}
let unListen: any = () => {};
@inject("userMenus")
@observer
class DashboardSider extends React.Component<iProps, iState> {
  state: iState = {
    pathname: "",
    loading: true,
    cancelReq: () => {},
  };
  async loadUserMenu() {
    this.setState({
      loading: true,
    });
    const userMenus = getUserMenus();
    await syncSetState.call(this, {
      cancelReq: userMenus.cancel,
    });
    const res = await userMenus.data;
    if (res.code === 200) {
      this.props.userMenus?.setUserMenus(
        Array.isArray(res.menus)
          ? res.menus.sort(
              (menu1: any, menu2: any) => menu1.order - menu2.order
            )
          : []
      );
    } else {
      message.error(this.props.t("加载菜单失败：") + res.msg);
    }
    if (/\/dashboard/.test(history.location.pathname ?? "")) {
      this.setState({
        loading: false,
        pathname: history.location.pathname ?? "",
      });
    }
  }
  componentDidMount() {
    this.loadUserMenu();
    unListen = history.listen((location: any) => {
      // 最新路由的 location 对象，可以通过比较 pathname 是否相同来判断路由的变化情况
      if (this.state.pathname !== location.pathname) {
        this.setState({
          pathname: location.pathname,
        });
      }
    });
  }
  componentWillUnmount() {
    this.state.cancelReq();
    unListen();
  }
  render() {
    const menus = this.props.userMenus?.menus ?? [];
    const defaultSelectedKeys = menus.length ? [menus[0].path] : [];
    const { loading, pathname } = this.state;
    return (
      <>
        <div className="layout-logo" />
        <div className="layout-sider-container">
          <Spin spinning={loading}>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={defaultSelectedKeys}
              selectedKeys={[pathname]}
            >
              {menus.map((menu) => (
                <Menu.Item key={menu.path} icon={<Icons type={menu.icon} />}>
                  <Link to={menu.path}>{menu.title}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Spin>
        </div>
      </>
    );
  }
}

export default withTranslation()(DashboardSider);
