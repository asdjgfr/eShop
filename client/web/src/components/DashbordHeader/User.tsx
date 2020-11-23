import React from "react";
import { Link } from "react-router-dom";
import { Modal, Dropdown, Menu, Avatar, message } from "antd";
import { inject, observer } from "mobx-react";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { withTranslation, WithTranslation } from "react-i18next";
import { getUserInfo } from "@/api/user";
import store from "@/store";
import { syncSetState } from "@/lib/pubfn";
import { signOut } from "@/api/user";

interface iProps extends WithTranslation {
  userInfo?: typeof store.userInfo;
  history?: typeof store.history;
}
interface iState {
  cancel: any;
}

const { confirm } = Modal;

@inject("userInfo", "history")
@observer
class User extends React.Component<iProps, iState> {
  state = {
    cancel: () => {},
  };
  async componentDidMount() {
    const ui = getUserInfo();
    await syncSetState.call(this, {
      cancel: ui.cancel,
    });
    const res = await ui.data;
    if (res.code === 200) {
      this.props.userInfo?.setUserInfo(res.userinfo);
    }
  }
  componentWillUnmount() {
    this.state.cancel();
  }

  async handleSignOut(item: any) {
    const that = this;
    if (item.key === "signOut") {
      confirm({
        title: that.props.t("sureSignOut"),
        icon: <ExclamationCircleOutlined />,
        okType: "danger",
        onOk() {
          return new Promise(async (resolve) => {
            signOut()
              .data.then((res) => {
                if (res.code === 200) {
                  message.success(
                    that.props.t("signOut") +
                      that.props.t("success") +
                      that.props.t("!")
                  );
                  localStorage.removeItem("autoSignIn");
                  that.props.history?.replace("/");
                } else {
                  message.error(
                    that.props.t("signOut") +
                      that.props.t("fail") +
                      that.props.t("!")
                  );
                }
                resolve();
              })
              .catch((e) => {
                resolve(e);
              });
          });
        },
      });
    }
  }
  render() {
    const { t } = this.props;
    return (
      <Dropdown
        overlay={
          <Menu onClick={this.handleSignOut.bind(this)}>
            <Menu.Item key="center">
              <Link to="/dashboard/center">
                <UserOutlined />
                {t("person")}
                {t("center")}
              </Link>
            </Menu.Item>
            <Menu.Item key="setting">
              <Link to="/dashboard/settings">
                <SettingOutlined />
                {t("person")}
                {t("setting")}
              </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="signOut" danger>
              <LogoutOutlined />
              {t("signOut")}
            </Menu.Item>
          </Menu>
        }
      >
        <div>
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
          &nbsp;
          {this.props.userInfo?.username}
        </div>
      </Dropdown>
    );
  }
}
export default withTranslation()(User);
