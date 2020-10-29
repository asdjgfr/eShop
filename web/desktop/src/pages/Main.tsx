import React from "react";
import { Button, Skeleton } from "antd";
import { ReactComponent as MainBg } from "@/static/img/main.svg";
import { getShopInfo } from "@/api/universal";
import Store from "@/store";
import { inject } from "mobx-react";

interface iProps {
  store?: Store;
}
interface iState {
  loading: boolean | undefined;
  title: string;
  titleSuffix: string;
  introduction: string;
}

@inject("store")
class Main extends React.Component<iProps, iState> {
  public state = {
    loading: true,
    title: "",
    titleSuffix: "",
    introduction: "",
  };
  async componentDidMount() {
    const res = await getShopInfo();
    if (res.code === 200) {
      this.setState({
        loading: false,
        title: res.data.name,
        titleSuffix: res.data.suffix,
        introduction: res.data.introduction,
      });
    }
  }
  handleJump(path: string) {
    this.props.store?.history.push(path);
  }
  render() {
    return (
      <div className="main-page">
        <div className="main-page-content">
          <Skeleton loading={this.state.loading} active>
            <header className="main-page-header">
              {this.state.title}
              <br />
              {this.state.titleSuffix}
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
          <Skeleton loading={this.state.loading} active>
            <p className="main-page-introduction">{this.state.introduction}</p>
          </Skeleton>
        </div>
        <div className="main-page-banner">
          <MainBg />
        </div>
      </div>
    );
  }
}

export default Main;
