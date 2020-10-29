import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

interface iProps {}
interface iState {}
class I18n extends React.Component<iProps, iState> {
  render() {
    return <ConfigProvider locale={zhCN}>{this.props.children}</ConfigProvider>;
  }
}

export default I18n;
