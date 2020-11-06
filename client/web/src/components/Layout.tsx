import React from "react";
import { Layout } from "antd";
import { renderRoutes } from "react-router-config";

interface iProps {
  route: any;
}
interface iState {}
const { Header, Footer, Sider, Content } = Layout;

class Layouts extends React.Component<iProps, iState> {
  render() {
    const { route } = this.props;
    return (
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>{renderRoutes(route.routes)}</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Layouts;
