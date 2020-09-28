import React from "react";
import { Result, Button } from "antd";
import { inject, observer } from "mobx-react";
import Store from "@/store";

interface iProps {
  errorCode: 403 | 404 | 500;
  store?: Store;
}

interface iState {}

@inject("store")
class Error extends React.Component<iProps, iState> {
  get errorMsg() {
    let msg = "对不起，";
    switch (this.props.errorCode) {
      case 403:
        msg = msg + "您暂无访问权限。";
        break;
      case 404:
        msg = msg + "访问的页面不存在。";
        break;
      case 500:
        msg = msg + "服务器出错了。";
        break;
    }
    return msg;
  }
  backToHome() {
    this.props.store?.history.push("/");
  }
  render() {
    return (
      <Result
        status={this.props.errorCode}
        title={this.props.errorCode}
        subTitle={this.errorMsg}
        extra={
          <Button type="primary" onClick={this.backToHome.bind(this)}>
            回到首页
          </Button>
        }
      />
    );
  }
}

export default Error;
