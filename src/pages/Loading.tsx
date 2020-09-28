import React from "react";
import { Spin } from "antd";
interface iProps {}
interface iState {}
class Admin extends React.Component<iProps, iState> {
  render() {
    return (
      <div className="loading-page">
        <Spin tip="页面跳转中，请稍后..." />
      </div>
    );
  }
}

export default Admin;
