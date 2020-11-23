import React from "react";
import { Tabs } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import store from "@/store";
import Messages from "@/pages/User/Messages";
import UserInfo from "@/pages/User/UserInfo";
import OperationRecord from "@/pages/User/OperationRecord";

interface iProps extends WithTranslation {
  history?: typeof store.history;
}
interface iTab {
  type: string;
  component: any;
  i18n: string;
}
interface iState {
  tabs: iTab[];
}

const { TabPane } = Tabs;
class Center extends React.Component<iProps, iState> {
  state: iState = {
    tabs: [
      {
        type: "userInfo",
        component: <UserInfo />,
        i18n: "userInfo",
      },
      {
        type: "operationRecord",
        component: <OperationRecord />,
        i18n: "operationRecord",
      },
      {
        type: "allMessages",
        component: <Messages />,
        i18n: "allMessages",
      },
    ],
  };
  handleClickTab(activeKey: string) {
    this.props.history?.replace(
      `/dashboard/center?${new URLSearchParams({ activeKey }).toString()}`
    );
  }
  render() {
    const { t } = this.props;
    const { tabs } = this.state;

    let activeKey =
      new URLSearchParams(this.props.history?.location.search).get(
        "activeKey"
      ) ?? "userInfo";
    return (
      <>
        <Tabs
          tabPosition="left"
          activeKey={activeKey}
          onTabClick={this.handleClickTab.bind(this)}
        >
          {tabs.map((tab: iTab) => (
            <TabPane tab={t(tab.i18n)} key={tab.type}>
              {tab.component}
            </TabPane>
          ))}
        </Tabs>
      </>
    );
  }
}

export default withTranslation()(Center);
