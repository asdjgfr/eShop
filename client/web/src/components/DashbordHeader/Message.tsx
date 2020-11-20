import React from "react";
import { List, Tooltip, Drawer, Button, Skeleton } from "antd";
import { inject, observer } from "mobx-react";
import { BellOutlined } from "@ant-design/icons";
import { withTranslation, WithTranslation } from "react-i18next";
import store from "@/store";
import context from "@/store/context";
import { getMessageByID } from "@/api/user";
import { syncSetState } from "@/lib/pubfn";

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
  childLoading: boolean;
  detailsTitle: string;
  details: string;
  cancel: any;
}

@inject("userMenus", "history", "userMessages")
@observer
class Message extends React.Component<iProps, iState> {
  static contextType = context;
  state = {
    visible: false,
    childLoading: true,
    childrenDrawer: false,
    detailsTitle: "",
    details: "",
    cancel: () => {},
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
    this.state.cancel();
    this.setState({
      childLoading: true,
      childrenDrawer: false,
      detailsTitle: "",
      details: "",
    });
  };
  async showDetails(message: iMessage) {
    await syncSetState({
      childrenDrawer: true,
      detailsTitle: message.title,
    });
    console.log(111, message.id);
    // this.setState({
    //   childrenDrawer: true,
    //   detailsTitle: message.title,
    // });
    // const getMsg = getMessageByID({ id: message.id });
    //
    // await syncSetState({
    //   cancel: getMsg.cancel,
    // });
    // const res = await getMsg.data;
    // if (res.code === 200) {
    //   this.setState({
    //     childLoading: false,
    //   });
    // }
    // this.setState({
    //   details: res.message,
    // });
  }
  markRead(message: iMessage) {
    console.log(message);
  }
  render() {
    const { detailsTitle, details, childLoading } = this.state;
    const { t, userMessages } = this.props!;
    const messages = userMessages?.messages ?? [];
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
