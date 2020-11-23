import React from "react";
import { Layout } from "antd";
import { renderRoutes } from "react-router-config";
import { Switch } from "react-router-dom";

import DashboardSider from "@/components/DashboardSider";
import DashboardHeader from "@/components/DashboardHeader";

interface iProps {
  route: any;
}
interface iState {
  isCollapse: boolean;
}
const { Header, Footer, Sider, Content } = Layout;

class Layouts extends React.Component<iProps, iState> {
  state: iState = {
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
            <DashboardHeader />
          </Header>
          <Content className="layout-content">
            <Switch>{renderRoutes(route.routes)}</Switch>
          </Content>
          <Footer>
            <div className="align-center">
              Copyright&emsp;©&emsp;
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.2077tech.com/"
              >
                Nian.Liu
              </a>
            </div>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Layouts;
