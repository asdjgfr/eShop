import React from "react";
import { Select, Spin, Empty, Form } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import debounce from "lodash/debounce";
import { getInventoryByName } from "@/api/inventoryManagement";

interface iProps extends WithTranslation {
  onChangeGoodsName: (
    data: { id: number | undefined; name: string },
    type: string,
    item: any
  ) => void;
  canCreated?: boolean;
  nameType?: "id" | "name";
  name?: "id" | "name";
}
interface iGoodsName {
  id: number;
  name: string;
  costPrice?: number;
  goodsTypesID?: number;
  guidePrice?: number;
  minPackages?: number;
  sellingPrice?: number;
  supplierID?: number;
  unitID?: number;
}
interface iState {
  data: iGoodsName[];
  enterValue: string;
  fetching: boolean;
}

const { Option } = Select;
let cancel = () => {};

class GoodsName extends React.Component<iProps, iState> {
  state: iState = {
    data: [],
    enterValue: "",
    fetching: false,
  };
  fetchGoodsName = debounce(async function (query: string) {
    const { t } = this.props;
    cancel();
    this.setState({
      fetching: true,
    });

    const gibn = getInventoryByName(query);
    cancel = gibn.cancel;
    const res = await gibn.data;
    let canCreated = [
      {
        id: -1,
        name: t("addInventory") + t("：") + query,
      },
    ];
    if (!this.props.canCreated || (!res.inventories.length && query === "")) {
      canCreated = [];
    }
    this.setState({
      data: res.inventories.length ? res.inventories : canCreated,
      fetching: false,
      enterValue: query,
    });
  }, 400);
  handleChange(id: number, item: any) {
    this.props.onChangeGoodsName(
      {
        id,
        name: id === -1 ? this.state.enterValue : item.name,
      },
      "name",
      item.item
    );
  }
  render() {
    const { fetching, data } = this.state;
    const { t, nameType, name } = this.props;
    return (
      <Form.Item name={name === "id" ? "id" : "name"} noStyle={true}>
        <Select
          loading={fetching}
          placeholder={t("searchOrCreateInventory")}
          notFoundContent={fetching ? <Spin size="small" /> : <Empty />}
          filterOption={false}
          onFocus={this.fetchGoodsName.bind(this, "")}
          onSearch={this.fetchGoodsName.bind(this)}
          showSearch={true}
          onChange={this.handleChange.bind(this)}
        >
          {data.map((d: iGoodsName) => (
            <Option
              key={d.id}
              value={d.id}
              name={nameType === "id" ? d.id : d.name}
              item={d}
            >
              {nameType === "id" ? d.id : d.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    );
  }
}

export default withTranslation()(GoodsName);
