import React from "react";
import { Button, Skeleton } from "antd";
import { ReactComponent as MainBg } from "@/static/img/main.svg";
import Store from "@/store";
import { inject } from "mobx-react";

interface iProps {
  store?: typeof Store;
}
interface iState {}

@inject("shopInfo")
class Main extends React.Component<iProps, iState> {
  public state = {};
  handleJump(path: string) {
    this.props.store?.history.push(path);
  }
  render() {
    return (
      <div className="main-page">
        <div className="main-page-content">
          <Skeleton
            active
            loading={
              !this.props.store?.shopInfo.title &&
              !this.props.store?.shopInfo.titleSuffix
            }
          >
            <header className="main-page-header">
              {this.props.store?.shopInfo.title}
              <br />
              {this.props.store?.shopInfo.titleSuffix}
            </header>
          </Skeleton>
          <div className="main-page-btn-group">
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={this.handleJump.bind(this, "sign-in")}
            >
              登录
            </Button>
            &emsp;
            <Button
              shape="round"
              size="large"
              onClick={this.handleJump.bind(this, "sign-up")}
            >
              注册
            </Button>
          </div>
          <p className="main-page-introduction">
            {this.props.store?.shopInfo.introduction}
          </p>
        </div>
        <div className="main-page-banner">
          <MainBg />
        </div>
      </div>
    );
  }
}

export default Main;
