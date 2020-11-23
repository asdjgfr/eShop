import React from "react";
import { Descriptions } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";

interface iProps extends WithTranslation {}
interface iState {}

class UserInfo extends React.Component<iProps, iState> {
  render() {
    const { t } = this.props;

    return (
      <>
        <Descriptions
          className="layout-content-item"
          title={t("basicInformation")}
        >
          <Descriptions.Item label={t("username")}>
            Cloud Database
          </Descriptions.Item>
          <Descriptions.Item label={t("role")}>Prepaid</Descriptions.Item>
          <Descriptions.Item label={t("userGroup")}>YES</Descriptions.Item>
        </Descriptions>
        <Descriptions
          className="layout-content-item"
          title={t("contactInformation")}
        >
          <Descriptions.Item label={t("phoneNumber")}>
            Cloud Database
          </Descriptions.Item>
          <Descriptions.Item label={t("email")}>Prepaid</Descriptions.Item>
          <Descriptions.Item label={t("wechat")}>YES</Descriptions.Item>
        </Descriptions>
      </>
    );
  }
}

export default withTranslation()(UserInfo);
