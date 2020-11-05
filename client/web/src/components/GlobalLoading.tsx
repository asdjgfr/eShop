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
      <Spin
        tip={this.props.globalConfig?.loadingTip}
        spinning={this.props.globalConfig?.loading}
      >
        <div className="global-loading">{this.props.children}</div>
      </Spin>
    );
  }
}

export default GlobalLoading;
