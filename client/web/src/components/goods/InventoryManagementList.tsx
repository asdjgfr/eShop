import React from "react";
import { Modal, Button, Table, message } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import {
  getInventoryList,
  deleteInventoryByID,
} from "@/api/inventoryManagement";
import { iPagination } from "@/lib/types";
import { formatTime, syncSetState } from "@/lib/pubfn";
import { ExclamationCircleOutlined } from "@ant-design/icons";
interface iProps extends WithTranslation {
  onRef: (ref: any) => void;
}
interface iList {
  key: number;
  index: number;
  averageCostPrice: number;
  inventory: number;
  costPrices: number[];
  goodsTypesID: number;
  goodsTypesName: string;
  guidePrice: number;
  id: number;
  minPackages: number;
  name: string;
  sellingPrice: number;
  supplierID: number;
  supplierName: string;
  unitID: number;
  unitName: string;
  latestStorageTime: string;
  latestTime: string;
}
interface iState {
  loading: boolean;
  total: number;
  list: iList[];
  pagination: iPagination;
}

const { confirm } = Modal;
let cancel = () => {};
let delCancel = () => {};
class InventoryManagementList extends React.Component<iProps, iState> {
  state: iState = {
    loading: true,
    total: 0,
    list: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
  };
  async getList() {
    cancel();
    this.setState({
      loading: true,
    });
    const gil = getInventoryList({
      page: this.state.pagination.current,
      pageSize: this.state.pagination.pageSize,
    });
    cancel = gil.cancel;
    const res = await gil.data;
    const startIndex =
      (this.state.pagination.current - 1) * this.state.pagination.pageSize;
    const inventories = res.inventories.map((item: iList, i: number) => ({
      ...item,
      index: startIndex + i + 1,
      key: item.id,
      latestStorageTime: formatTime(item.latestStorageTime),
      latestTime: formatTime(item.latestTime),
    }));
    this.setState({
      loading: false,
      list: inventories,
      total: res.total,
    });
  }
  async handleDelete(item: iList) {
    delCancel();
    const { t } = this.props;
    const that = this;
    confirm({
      title: t("confirmDelInventory"),
      icon: <ExclamationCircleOutlined />,
      content: t("unrecoverableAfterDeletion"),
      okType: "danger",
      cancelText: t("close"),
      onOk() {
        return new Promise(async (resolve) => {
          const dibi = deleteInventoryByID(item.id);
          delCancel = dibi.cancel;
          const res = await dibi.data;
          await that.getList();
          message.success(res.msg);
          resolve(true);
        });
      },
    });
  }
  async handleChangePage(page: number, pageSize?: number | undefined) {
    await syncSetState.call(this, {
      pagination: { current: page, pageSize },
    });
    await this.getList();
  }
  componentDidMount() {
    this.props.onRef(this);
    this.getList();
  }
  render() {
    const { t } = this.props;
    const { loading, list, pagination, total } = this.state;
    return (
      <Table
        loading={loading}
        scroll={{ x: "max-content" }}
        columns={[
          {
            title: t("index"),
            dataIndex: "index",
            key: "index",
          },
          {
            title: t("goodsName"),
            dataIndex: "name",
            key: "name",
          },
          {
            title: t("goodsTypes"),
            dataIndex: "goodsTypesName",
            key: "goodsTypesName",
          },
          {
            title: t("goodsID"),
            dataIndex: "id",
            key: "id",
          },
          {
            title: t("supplier"),
            dataIndex: "supplierName",
            key: "supplierName",
          },
          {
            title: t("inventory"),
            dataIndex: "inventory",
            key: "inventory",
          },
          {
            title: t("averageCostPrice") + t("monetaryUnit"),
            dataIndex: "averageCostPrice",
            key: "averageCostPrice",
          },
          {
            title: t("totalCost") + t("monetaryUnit"),
            dataIndex: "totalCost",
            key: "totalCost",
          },
          {
            title: t("sellingPrice") + t("monetaryUnit"),
            dataIndex: "sellingPrice",
            key: "sellingPrice",
          },
          {
            title: t("guidePrice"),
            dataIndex: "guidePrice",
            key: "guidePrice",
          },
          {
            title: t("latestPurchasePrice"),
            dataIndex: "latestPurchasePrice",
            key: "latestPurchasePrice",
            render: (item, row) => row.costPrices[row.costPrices.length - 1],
          },
          {
            title: t("unit"),
            dataIndex: "unitName",
            key: "unitName",
          },
          {
            title: t("minPackages"),
            dataIndex: "minPackages",
            key: "minPackages",
          },
          {
            title: t("latestStorageTime"),
            dataIndex: "latestStorageTime",
            key: "latestStorageTime",
          },
          {
            title: t("latestTime"),
            dataIndex: "latestTime",
            key: "latestTime",
          },
          {
            title: t("action"),
            dataIndex: "action",
            key: "action",
            render: (foo, item) => [
              <Button key="edit" type="primary" size="small">
                {t("edit")}
              </Button>,
              <dfn key="emsp">&emsp;</dfn>,
              <Button
                key="delete"
                type="primary"
                size="small"
                danger={true}
                onClick={this.handleDelete.bind(this, item)}
              >
                {t("delete")}
              </Button>,
            ],
          },
        ]}
        expandable={{
          expandedRowRender: (record) => (
            <>
              {t("historyCostPrices") +
                t("monetaryUnit") +
                t("：") +
                record.costPrices.join("，")}
            </>
          ),
        }}
        dataSource={list}
        pagination={{
          ...pagination,
          total,
          onChange: this.handleChangePage.bind(this),
        }}
      />
    );
  }
}

export default withTranslation()(InventoryManagementList);
