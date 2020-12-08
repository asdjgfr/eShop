import React from "react";
import { Select, Spin, Empty, Form } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import debounce from "lodash/debounce";
import { getGoodsTypes } from "@/api/goodsTypes";

interface iProps extends WithTranslation {
  onChangeGoodsType: (
    data: { id: number | undefined; name: string },
    type: string
  ) => void;
  onRef: (ref: any) => void;
  canCreated?: boolean;
}
interface iGoodsTypes {
  id: number;
  name: string;
}
interface iState {
  data: iGoodsTypes[];
  enterValue: string;
  fetching: boolean;
}

const { Option } = Select;
let cancel = () => {};
class TypesOfGoods extends React.Component<iProps, iState> {
  state: iState = {
    data: [],
    enterValue: "",
    fetching: false,
  };
  componentDidMount() {
    this.props.onRef(this);
  }
  async fetchValue(query: string) {
    const { t } = this.props;
    cancel();
    this.setState({
      fetching: true,
    });
    const ggt = getGoodsTypes(query);
    cancel = ggt.cancel;
    const res = await ggt.data;
    let canCreated = [
      {
        id: -1,
        name: t("add") + t("goodsTypes") + t("：") + query,
      },
    ];
    if (!this.props.canCreated || (!res.goodsTypes.length && query === "")) {
      canCreated = [];
    }
    this.setState({
      data: res.goodsTypes.length ? res.goodsTypes : canCreated,
      fetching: false,
      enterValue: query,
    });
    return res.goodsTypes;
  }
  fetchGoodsType = debounce(this.fetchValue, 400);
  async updateVal(formRef: any, value: number) {
    const data = await this.fetchValue("");
    const findVal = data.find((item: any) => item.id === value);
    const id = findVal === undefined ? undefined : value;
    formRef.setFieldsValue({
      goodsTypes: value,
    });
    this.props.onChangeGoodsType(
      {
        id,
        name: id === -1 ? this.state.enterValue : "",
      },
      "goodsTypes"
    );
  }
  handleChange(id: number, item: any) {
    this.props.onChangeGoodsType(
      {
        id,
        name: id === -1 ? this.state.enterValue : item.name,
      },
      "goodsTypes"
    );
  }
  render() {
    const { fetching, data } = this.state;
    const { t } = this.props;
    return (
      <Form.Item name="goodsTypes" noStyle={true}>
        <Select
          loading={fetching}
          placeholder={t("plsSearch") + t("goodsTypes")}
          notFoundContent={fetching ? <Spin size="small" /> : <Empty />}
          filterOption={false}
          onFocus={this.fetchGoodsType.bind(this, "")}
          onSearch={this.fetchGoodsType.bind(this)}
          showSearch={true}
          onChange={this.handleChange.bind(this)}
        >
          {data.map((d: iGoodsTypes) => (
            <Option key={d.id} value={d.id} name={d.name}>
              {d.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    );
  }
}

export default withTranslation()(TypesOfGoods);
