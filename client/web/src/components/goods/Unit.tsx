import React from "react";
import { Select, Spin, Empty, Form } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import debounce from "lodash/debounce";
import { getUnit } from "@/api/unit";

interface iProps extends WithTranslation {
  onChangeUnit: (
    data: { id: number | undefined; name: string },
    type: string
  ) => void;
  onRef: (ref: any) => void;
  canCreated?: boolean;
}
interface iUnit {
  id: number;
  name: string;
}
interface iState {
  data: iUnit[];
  enterValue: string;
  fetching: boolean;
}

const { Option } = Select;
let cancel = () => {};
class Unit extends React.Component<iProps, iState> {
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
    const gu = getUnit(query);
    cancel = gu.cancel;
    const res = await gu.data;
    let canCreated = [
      {
        id: -1,
        name: t("add") + t("unit") + t("：") + query,
      },
    ];
    if (!this.props.canCreated || (!res.unit.length && query === "")) {
      canCreated = [];
    }
    this.setState({
      data: res.unit.length ? res.unit : canCreated,
      fetching: false,
      enterValue: query,
    });
    return res.unit;
  }
  fetchUnit = debounce(this.fetchValue, 400);
  async updateVal(formRef: any, value: number) {
    const data = await this.fetchValue("");
    const findVal = data.find((item: any) => item.id === value);
    const id = findVal === undefined ? undefined : value;
    formRef.setFieldsValue({
      unit: value,
    });
    this.props.onChangeUnit(
      {
        id,
        name: id === -1 ? this.state.enterValue : "",
      },
      "unit"
    );
  }
  handleChange(id: number, item: any) {
    this.props.onChangeUnit(
      {
        id,
        name: id === -1 ? this.state.enterValue : item.name,
      },
      "unit"
    );
  }
  render() {
    const { fetching, data } = this.state;
    const { t } = this.props;
    return (
      <Form.Item name="unit" noStyle={true}>
        <Select
          loading={fetching}
          placeholder={t("plsSearch") + t("unit")}
          notFoundContent={fetching ? <Spin size="small" /> : <Empty />}
          filterOption={false}
          onFocus={this.fetchUnit.bind(this, "")}
          onSearch={this.fetchUnit.bind(this)}
          showSearch={true}
          onChange={this.handleChange.bind(this)}
        >
          {data.map((d: iUnit) => (
            <Option key={d.id} value={d.id} name={d.name}>
              {d.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    );
  }
}

export default withTranslation()(Unit);
