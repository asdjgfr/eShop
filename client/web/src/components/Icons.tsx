import React from "react";
import {
  LineChartOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserOutlined,
  CloseCircleOutlined,
  BankOutlined,
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
      case "UserOutlined":
        icon = <UserOutlined />;
        break;
      case "CloseCircleOutlined":
        icon = <CloseCircleOutlined />;
        break;
      case "BankOutlined":
        icon = <BankOutlined />;
        break;
      default:
        icon = <CloseCircleOutlined />;
        break;
    }
    return <>{icon}</>;
  }
}

export default Icons;
