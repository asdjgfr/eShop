import React from "react";
import { Spin } from "antd";
import store from "@/store";
import { inject, observer } from "mobx-react";
interface iProps {
  globalConfig?: typeof store.globalConfig;
}
interface iState {}

@inject("globalConfig")
@observer
class GlobalLoading extends React.Component<iProps, iState> {
  render() {
    return (
      <div className="global-loading">
        <Spin
          tip={this.props.globalConfig?.loadingTip}
          spinning={this.props.globalConfig?.loading}
        >
          {this.props.children}
        </Spin>
      </div>
    );
  }
}

export default GlobalLoading;
