import React from "react";
import { Result, Button } from "antd";
import { inject } from "mobx-react";
import store from "@/store";

interface iProps {
  errorCode: 403 | 404 | 500;
  history?: typeof store.history;
  error?: string;
}

interface iState {
  error?: string;
}

@inject("history")
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
  backToHome(path: string) {
    if (path === "back") {
      this.props.history?.go(-1);
    } else {
      this.props.history?.push(path);
    }
  }
  render() {
    const { errorCode, history } = this.props;
    const errorMsg: any = history?.location.state;
    return (
      <Result
        status={errorCode}
        title={errorCode}
        subTitle={
          this.errorMsg + (errorCode === 500 ? errorMsg?.error ?? "" : "")
        }
        extra={[
          [
            errorCode === 403 ? (
              <Button
                key="403"
                type="primary"
                onClick={this.backToHome.bind(this, "/sign-in")}
              >
                登录
              </Button>
            ) : null,
            errorCode === 404 ? (
              <Button
                key="404"
                type="primary"
                onClick={this.backToHome.bind(this, "back")}
              >
                返回上一级
              </Button>
            ) : null,
            errorCode === 500 ? (
              <Button
                key="500"
                type="primary"
                onClick={this.backToHome.bind(this, "/feedback")}
              >
                联系管理员
              </Button>
            ) : null,
            <Button
              key="index"
              type="primary"
              onClick={this.backToHome.bind(this, "/")}
            >
              回到首页
            </Button>,
          ],
        ]}
      />
    );
  }
}

export default Error;
