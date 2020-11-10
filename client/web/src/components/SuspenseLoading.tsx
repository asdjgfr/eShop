import React from "react";
import { Progress } from "antd";
interface iProps {}
interface iState {
  percent: number;
}
let timer: any = undefined;
class SuspenseLoading extends React.Component<iProps, iState> {
  state = {
    percent: 0,
  };
  fakePercent() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.fakePercent.call(this);
    }, Math.round(Math.random() * 800));
    const percent = this.state.percent + Math.round(Math.random() * 20);
    this.setState({
      percent: percent > 96 ? 96 : percent,
    });
  }
  componentDidMount() {
    this.fakePercent();
  }
  componentWillUnmount() {
    this.setState({
      percent: 100,
    });
    clearTimeout(timer);
  }
  render() {
    return (
      <div className="suspense-loading">
        <Progress
          percent={this.state.percent}
          status="active"
          showInfo={false}
          strokeWidth={4}
        />
      </div>
    );
  }
}

export default SuspenseLoading;
