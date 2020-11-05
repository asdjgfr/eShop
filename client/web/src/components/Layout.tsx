import React from "react";
import { Layout } from "antd";

interface iProps {}
interface iState {}
const { Header, Footer, Sider, Content } = Layout;

class Layouts extends React.Component<iProps, iState> {
  render() {
    return (
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>{this.props.children}</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Layouts;
