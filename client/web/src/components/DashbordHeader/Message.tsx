import React from "react";
import { List, Tooltip, Drawer, Button, Skeleton, Badge } from "antd";
import { inject, observer } from "mobx-react";
import { BellOutlined } from "@ant-design/icons";
import { withTranslation, WithTranslation } from "react-i18next";
import store from "@/store";
import context from "@/store/context";
import { getMessageByID } from "@/api/user";
import { syncSetState } from "@/lib/pubfn";
import { getUserMessages10 } from "@/api/user";
import { Link } from "react-router-dom";

interface iMessage {
  id: number;
  title: string;
  description: string;
}
interface iProps extends WithTranslation {
  userMessages?: typeof store.userMessages;
}
interface iState {
  visible: boolean;
  childrenDrawer: boolean;
  loading: boolean;
  childLoading: boolean;
  detailsTitle: string;
  details: string;
  cancel: any;
}

@inject("userMenus", "history", "userMessages")
@observer
class Message extends React.Component<iProps, iState> {
  static contextType = context;
  state: iState = {
    visible: false,
    loading: true,
    childLoading: true,
    childrenDrawer: false,
    detailsTitle: "",
    details: "",
    cancel: () => {},
  };
  showDrawer = async () => {
    this.setState({
      visible: true,
    });
    await getUserMessages10();
    this.setState({
      loading: false,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
      loading: true,
    });
  };
  onChildrenDrawerClose = () => {
    this.state.cancel();
    this.setState({
      childLoading: true,
      childrenDrawer: false,
      detailsTitle: "",
      details: "",
    });
  };
  async showDetails(message: iMessage) {
    await syncSetState.call(this, {
      childrenDrawer: true,
      detailsTitle: message.title,
    });
    const getMsg = getMessageByID({ id: message.id });
    await syncSetState.call(this, {
      cancel: getMsg.cancel,
    });
    const res = await getMsg.data;
    if (res.code === 200) {
      this.setState({
        childLoading: false,
        details: res.message.description,
      });
    }
  }
  render() {
    const { detailsTitle, details, childLoading, loading } = this.state;
    const { t, userMessages } = this.props!;
    const messages = userMessages?.messages ?? [];
    const unreadCount = userMessages?.unreadCount ?? 0;
    return (
      <>
        <Tooltip title={t("message")}>
          <Badge size="small" count={unreadCount}>
            <BellOutlined onClick={this.showDrawer} />
          </Badge>
        </Tooltip>
        <Drawer
          title={
            <div className="layout-message-header">
              <span>{t("message") + t("list")}</span>
              <Link to="/dashboard/center?activeKey=allMessages">
                {t("allMessages")}
              </Link>
            </div>
          }
          width={320}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Skeleton loading={loading} active>
            <List
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(message: iMessage) => (
                <List.Item
                  actions={[
                    <Button
                      type="link"
                      onClick={this.showDetails.bind(this, message)}
                    >
                      {t("details")}
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={message.title}
                    description={message.description}
                  />
                </List.Item>
              )}
            />
          </Skeleton>
          <Drawer
            title={detailsTitle}
            width={420}
            closable={false}
            onClose={this.onChildrenDrawerClose}
            visible={this.state.childrenDrawer}
          >
            <Skeleton loading={childLoading} active>
              {details}
            </Skeleton>
          </Drawer>
        </Drawer>
      </>
    );
  }
}
export default withTranslation()(Message);
