import React from "react";
import { Spin } from "antd";
interface iProps {
  tip?: string;
}
interface iState {}

class Loading extends React.Component<iProps, iState> {
  render() {
    const { tip } = this.props;
    return (
      <div className="loading-page">
        <Spin tip={tip ? tip : "页面跳转中，请稍后..."} />
      </div>
    );
  }
}

export default Loading;
