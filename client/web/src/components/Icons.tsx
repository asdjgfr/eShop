import React from "react";
import {
  LineChartOutlined,
  FileTextOutlined,
  SettingOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

interface iProps {
  type: string;
}
interface iState {}
class Icons extends React.Component<iProps, iState> {
  render() {
    let icon = null;
    switch (this.props.type) {
      case "LineChartOutlined":
        icon = <LineChartOutlined />;
        break;
      case "FileTextOutlined":
        icon = <FileTextOutlined />;
        break;
      case "SettingOutlined":
        icon = <SettingOutlined />;
        break;
      case "CloseCircleOutlined":
        icon = <CloseCircleOutlined />;
        break;
      default:
        icon = <CloseCircleOutlined />;
        break;
    }
    return <>{icon}</>;
  }
}

export default Icons;
