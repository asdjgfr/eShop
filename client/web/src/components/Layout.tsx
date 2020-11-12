import React from "react";
import { Layout } from "antd";
import { renderRoutes } from "react-router-config";
import { Switch } from "react-router-dom";

import DashboardSider from "@/components/DashboardSider";
import DashbordHeader from "@/components/DashbordHeader";

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
          <DashboardSider />
        </Sider>
        <Layout style={{ marginLeft: isCollapse ? 80 : 200 }}>
          <Header style={{ backgroundColor: "#fff" }}>
            <DashbordHeader />
          </Header>
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
