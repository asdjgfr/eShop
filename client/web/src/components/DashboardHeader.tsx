import React from "react";
import { Tooltip } from "antd";
import { inject, observer } from "mobx-react";
import { withTranslation, WithTranslation } from "react-i18next";
import { QuestionCircleOutlined } from "@ant-design/icons";

import Message from "@/components/DashbordHeader/Message";
import User from "@/components/DashbordHeader/User";

interface iProps extends WithTranslation {}
interface iState {}

@inject("userMenus")
@observer
class DashboardHeader extends React.Component<iProps, iState> {
  state = {};
  render() {
    const { t } = this.props;
    return (
      <div className="layout-header">
        <Tooltip title={t("help")}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://shop.2077tech.com"
          >
            <QuestionCircleOutlined />
          </a>
        </Tooltip>
        <Message />
        <User />
      </div>
    );
  }
}

export default withTranslation()(DashboardHeader);
