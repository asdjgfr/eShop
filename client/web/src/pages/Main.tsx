import React from "react";
import { Button, Skeleton } from "antd";
import { ReactComponent as MainBg } from "@/static/img/main.svg";
import store from "@/store";
import { inject, observer } from "mobx-react";

interface iProps {
  shopInfo?: typeof store.shopInfo;
  history?: typeof store.history;
  globalConfig?: typeof store.globalConfig;
}
interface iState {}

@inject("shopInfo", "history")
@observer
class Main extends React.Component<iProps, iState> {
  public state = {};
  handleJump(path: string) {
    this.props.history?.push(path);
  }
  componentDidMount() {
    if (localStorage.getItem("autoSignIn") === "true") {
      this.handleJump("/dashboard/analysis");
    }
  }
  render() {
    return (
      <div className="main-page">
        <div className="main-page-content">
          <Skeleton
            active
            loading={
              !this.props.shopInfo?.title && !this.props.shopInfo?.titleSuffix
            }
          >
            <header className="main-page-header">
              {this.props.shopInfo?.title}
              <br />
              {this.props.shopInfo?.titleSuffix}
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
            {this.props.shopInfo?.introduction}
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
