import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import i18next from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: "zh-CN",
    fallbackLng: "zh-CN",
    load: "currentOnly",
    backend: {
      loadPath: `/i18n/{{lng}}.json`,
    },
  });
// i18next.changeLanguage("en-US");

interface iProps {}
interface iState {}
class I18n extends React.Component<iProps, iState> {
  render() {
    return <ConfigProvider locale={zhCN}>{this.props.children}</ConfigProvider>;
  }
}

export default I18n;
