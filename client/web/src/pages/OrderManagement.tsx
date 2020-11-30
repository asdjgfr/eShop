import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { Table, Menu, Dropdown } from "antd";

interface iProps extends WithTranslation {}
interface iState {
  loading: boolean;
}

class OrderManagement extends React.Component<iProps, iState> {
  state: iState = {
    loading: false,
  };
  handleMenuClick(item: any, row: any) {
    switch (row.key) {
      case "details":
        this.handleShowDetails(item);
        break;
      case "remarks":
        this.handleRemarks(item);
        break;
      case "delete":
        this.handleDelete(item);
        break;
    }
  }
  handleShowDetails(item: any) {
    console.log("详情", item);
  }
  handleRemarks(item: any) {
    console.log("备注", item);
  }
  handleDelete(item: any) {
    console.log("删除", item);
  }
  render() {
    const { t } = this.props;
    const { loading } = this.state;
    return (
      <>
        <Table
          columns={[
            {
              title: t("createdAt"),
              dataIndex: "createdAt",
              key: "createdAt",
            },
            {
              title: t("transactionNumber"),
              dataIndex: "transactionNumber",
              key: "transactionNumber",
            },
            {
              title: t("customer"),
              dataIndex: "customer",
              key: "customer",
            },
            {
              title: t("money"),
              dataIndex: "money",
              key: "money",
            },
            {
              title: t("status"),
              dataIndex: "status",
              key: "status",
            },
            {
              title: t("action"),
              dataIndex: "action",
              key: "action",
              render: (foo, item) => {
                return (
                  <Dropdown.Button
                    type="primary"
                    onClick={this.handleMenuClick.bind(this, item, {
                      key: "details",
                    })}
                    overlay={
                      <Menu onClick={this.handleMenuClick.bind(this, item)}>
                        <Menu.Item key="remarks">{t("remarks")}</Menu.Item>
                        <Menu.Item danger key="delete">
                          {t("delete")}
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    {t("details")}
                  </Dropdown.Button>
                );
              },
            },
          ]}
          loading={loading}
          dataSource={[
            {
              createdAt: "1",
              transactionNumber: "1",
              customer: "1",
              money: "1",
              status: "1",
              key: "1",
            },
            {
              createdAt: "2",
              transactionNumber: "2",
              customer: "2",
              money: "2",
              status: "2",
              key: "2",
            },
          ]}
        />
      </>
    );
  }
}

export default withTranslation()(OrderManagement);
