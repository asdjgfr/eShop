import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { inject, observer } from "mobx-react";
import store from "@/store";
interface iProps {
  userMenus?: typeof store.userMenus;
  history?: typeof store.history;
}
interface iState {
  pathname: string;
}

@inject("userMenus", "history")
@observer
class DashboardSider extends React.Component<iProps, iState> {
  state = {
    pathname: "",
  };
  handleClickMenu(item: any) {
    this.setState({
      pathname: item.key,
    });
  }
  componentDidMount() {
    this.setState({
      pathname: this.props.history?.location.pathname ?? "",
    });
  }
  componentDidUpdate(
    prevProps: Readonly<iProps>,
    prevState: Readonly<iState>,
    snapshot?: any
  ) {
    if (this.state.pathname !== this.props.history?.location.pathname) {
      this.setState({
        pathname: this.props.history?.location.pathname ?? "",
      });
    }
  }
  render() {
    const menus = this.props.userMenus?.menus ?? [];
    const defaultSelectedKeys = menus[0] ? [menus[0].key] : [];
    const { pathname } = this.state;

    return (
      <>
        <div className="logo" />
        <div className="layout-sider-container">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={defaultSelectedKeys}
            selectedKeys={[pathname]}
            onClick={this.handleClickMenu.bind(this)}
          >
            {menus.map((menu) => (
              <Menu.Item key={menu.path}>
                <Link to={menu.path}>{menu.title}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </>
    );
  }
}

export default DashboardSider;
