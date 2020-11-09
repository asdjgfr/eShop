import React from "react";
import { Layout, Menu } from "antd";
import { renderRoutes } from "react-router-config";
import { Switch } from "react-router-dom";
interface iProps {
  route: any;
}
interface iState {
  isCollapse: boolean;
}
const { Header, Footer, Sider, Content } = Layout;

class Layouts extends React.Component<iProps, iState> {
  state = {
    isCollapse: false,
  };
  handleToggleSider(isCollapse: boolean) {
    this.setState({
      isCollapse,
    });
  }
  render() {
    const { route } = this.props;
    const { isCollapse } = this.state;
    return (
      <Layout className="layout-box">
        <Sider
          collapsible
          collapsed={isCollapse}
          onCollapse={this.handleToggleSider.bind(this)}
          breakpoint="lg"
          style={{
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
          onBreakpoint={(broken) => {
            this.handleToggleSider.call(this, broken);
          }}
        >
          <div className="logo" />
          <div className="layout-sider-container">
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
              <Menu.Item key="4">nav 4</Menu.Item>
              <Menu.Item key="5">nav 5</Menu.Item>
              <Menu.Item key="6">nav 6</Menu.Item>
              <Menu.Item key="7">nav 7</Menu.Item>
              <Menu.Item key="8">nav 8</Menu.Item>
            </Menu>
          </div>
        </Sider>
        <Layout style={{ marginLeft: isCollapse ? 80 : 200 }}>
          <Header style={{ backgroundColor: "#fff" }}>Header</Header>
          <Content>
            <Switch>{renderRoutes(route.routes)}</Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Layouts;
