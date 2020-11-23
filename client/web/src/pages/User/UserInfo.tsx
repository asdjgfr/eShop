import React from "react";
import { Descriptions } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import { inject, observer } from "mobx-react";
import store from "@/store";
import dayjs from "dayjs";

interface iProps extends WithTranslation {
  userInfo: typeof store.userInfo;
}
interface iState {}

@inject("userInfo")
@observer
class UserInfo extends React.Component<iProps, iState> {
  render() {
    const { t } = this.props;
    const { username, role, phone, email, birthday } = this.props.userInfo!;
    return (
      <>
        <Descriptions
          className="layout-content-item"
          title={t("basicInformation")}
        >
          <Descriptions.Item label={t("username")}>
            {username}
          </Descriptions.Item>
          <Descriptions.Item label={t("role")}>{role}</Descriptions.Item>
          <Descriptions.Item label={t("birthday")}>
            {dayjs(birthday).format("YYYY-MM-DD hh:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label={t("userGroup")}>YES</Descriptions.Item>
        </Descriptions>
        <Descriptions
          className="layout-content-item"
          title={t("contactInformation")}
        >
          <Descriptions.Item label={t("phoneNumber")}>
            {phone}
          </Descriptions.Item>
          <Descriptions.Item label={t("email")}>{email}</Descriptions.Item>
          <Descriptions.Item label={t("wechat")}>YES</Descriptions.Item>
        </Descriptions>
      </>
    );
  }
}

export default withTranslation()(UserInfo);
