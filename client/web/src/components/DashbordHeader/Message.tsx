import React from "react";
import { List, Tooltip, Drawer, Button } from "antd";
import { inject, observer } from "mobx-react";

import { BellOutlined } from "@ant-design/icons";
import { withTranslation, WithTranslation } from "react-i18next";

interface iMessage {
  title: string;
  description: string;
}
interface iProps extends WithTranslation {}
interface iState {
  visible: boolean;
  childrenDrawer: boolean;
  messages: iMessage[];
}

@inject("userMenus", "history")
@observer
class Message extends React.Component<iProps, iState> {
  state = {
    visible: false,
    childrenDrawer: false,
    messages: [
      {
        title: "消息1",
        description:
          "详情1详情1详情1详情1详情1详情1详情1详情1详情1详情1详情1详情1详情1详情1详情1详情1详情1详情1详情1",
      },
    ],
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };
  showDetails(message: iMessage) {
    console.log(message);
    this.setState({
      childrenDrawer: true,
    });
  }
  markRead(message: iMessage) {
    console.log(message);
  }
  render() {
    const { t } = this.props;
    return (
      <>
        <Tooltip title={t("message")}>
          <BellOutlined onClick={this.showDrawer} />
        </Tooltip>
        <Drawer
          title={t("message") + t("list")}
          width={320}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <List
            itemLayout="horizontal"
            dataSource={this.state.messages}
            renderItem={(message: iMessage) => (
              <List.Item
                actions={[
                  <Button
                    type="link"
                    onClick={this.showDetails.bind(this, message)}
                  >
                    {t("details")}
                  </Button>,
                  <Button
                    type="link"
                    onClick={this.markRead.bind(this, message)}
                  >
                    {t("markRead")}
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
          <Drawer
            title={t("message") + t("details")}
            width={420}
            closable={false}
            onClose={this.onChildrenDrawerClose}
            visible={this.state.childrenDrawer}
          >
            消息详情
          </Drawer>
        </Drawer>
      </>
    );
  }
}
export default withTranslation()(Message);
