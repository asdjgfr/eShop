import React from "react";
import { Link } from "react-router-dom";
import { Menu, Spin, message } from "antd";
import { inject, observer } from "mobx-react";
import store from "@/store";
import { getUserMenus } from "@/api/user";
import { syncSetState } from "@/lib/pubfn";

interface iProps {
  userMenus?: typeof store.userMenus;
  history?: typeof store.history;
}
interface iState {
  pathname: string;
  loading: boolean;
  unListen: any;
  cancelReq: any;
}

@inject("userMenus", "history")
@observer
class DashboardSider extends React.Component<iProps, iState> {
  state = {
    pathname: "",
    loading: true,
    unListen: () => {},
    cancelReq: () => {},
  };
  async loadUserMenu() {
    this.setState({
      loading: true,
    });
    const userMenus = getUserMenus();
    await syncSetState({
      cancelReq: userMenus.cancel,
    });
    const res = await userMenus.data;
    if (res.code === 200) {
      this.props.userMenus?.setUserMenus(res.menus);
    } else {
      message.error("菜单加载失败，请刷新后重试！" + res.msg);
    }
    this.setState({
      loading: false,
      pathname: this.props.history?.location.pathname ?? "",
    });
  }
  componentDidMount() {
    this.loadUserMenu();
    const unListen = this.props.history?.listen((location) => {
      // 最新路由的 location 对象，可以通过比较 pathname 是否相同来判断路由的变化情况
      if (this.state.pathname !== location.pathname) {
        this.setState({
          pathname: location.pathname,
        });
      }
    });
    this.setState({
      unListen,
    });
  }
  componentWillUnmount() {
    this.state.cancelReq();
    this.state.unListen();
  }
  render() {
    const menus = this.props.userMenus?.menus ?? [];
    const defaultSelectedKeys = menus.length ? [menus[0].path] : [];
    const { loading, pathname } = this.state;
    return (
      <>
        <div className="logo" />
        <Spin spinning={loading}>
          <div className="layout-sider-container">
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={defaultSelectedKeys}
              selectedKeys={[pathname]}
            >
              {menus.map((menu) => (
                <Menu.Item key={menu.path}>
                  <Link to={menu.path}>{menu.title}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </Spin>
      </>
    );
  }
}

export default DashboardSider;
