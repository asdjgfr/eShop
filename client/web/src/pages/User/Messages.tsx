import React from "react";
import { Table, Skeleton, Tag } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import { getUserMessages, getMessageByID } from "@/api/user";
import { syncSetState } from "@/lib/pubfn";

interface iMessage {
  title: string;
  description: string;
  id: number;
  loading: boolean;
  details: string;
}
interface iProps extends WithTranslation {}
interface iState {
  page: number;
  pageSize: number;
  count: number;
  cancel: any;
  getMessageCancel: any;
  messages: iMessage[];
  loading: boolean;
}

class Messages extends React.Component<iProps, iState> {
  state: iState = {
    count: 0,
    page: 1,
    pageSize: 10,
    cancel: () => {},
    getMessageCancel: () => {},
    messages: [],
    loading: true,
  };
  componentDidMount() {
    this.getMessages();
  }
  async getMessages() {
    this.setState({ loading: true });
    this.state.cancel();
    const gum = getUserMessages({
      page: this.state.page,
      pageSize: this.state.pageSize,
      getAll: true,
    });
    await syncSetState.call(this, {
      cancel: gum.cancel,
    });
    const res = await gum.data;
    if (res.code === 200) {
      this.setState({
        messages: res.messages.map((msg: any) => ({
          ...msg,
          key: msg.id,
          loading: true,
        })),
        count: res.count,
      });
    }
    this.setState({ loading: false });
  }
  async handleGetMessage(expanded: boolean, record: iMessage) {
    const { messages } = this.state;
    const currentVal =
      messages[this.state.messages.findIndex((msg) => msg === record)];
    if (expanded) {
      const gmbID = getMessageByID({ id: record.id });
      const res = await gmbID.data;
      if (res.code === 200) {
        currentVal.loading = false;
        currentVal.details = res.message.description;
        this.setState({ messages });
      }
    } else {
      currentVal.loading = true;
      this.setState({ messages });
      this.state.getMessageCancel();
    }
  }
  async handleChangePage(page: number, pageSize?: number | undefined) {
    await syncSetState.call(this, {
      page,
      pageSize,
    });
    await this.getMessages();
  }
  render() {
    const { t } = this.props;
    const { messages, pageSize, count, loading } = this.state;

    return (
      <>
        <Table
          loading={loading}
          columns={[
            {
              title: t("read/unread"),
              dataIndex: "read",
              key: "read",
              render: (read) =>
                read ? (
                  <Tag color="success">{t("read")}</Tag>
                ) : (
                  <Tag color="warning">{t("unread")}</Tag>
                ),
            },
            {
              title: t("title"),
              dataIndex: "title",
              key: "title",
            },
            {
              title: t("description"),
              dataIndex: "description",
              key: "description",
            },
          ]}
          expandable={{
            expandedRowRender: (record: iMessage) => (
              <Skeleton loading={record.loading} active>
                <p>{record.details}</p>
              </Skeleton>
            ),
          }}
          onExpand={this.handleGetMessage.bind(this)}
          dataSource={messages}
          pagination={{
            total: count,
            showSizeChanger: true,
            defaultPageSize: pageSize,
            onChange: this.handleChangePage.bind(this),
          }}
        />
      </>
    );
  }
}

export default withTranslation()(Messages);
