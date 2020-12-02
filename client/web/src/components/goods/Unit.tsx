import React from "react";
import { Select, Spin, Empty } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import debounce from "lodash/debounce";
import { getUnit } from "@/api/unit";

interface iProps extends WithTranslation {
  onChangeUnit: (data: { id: number; name: string }, type: string) => void;
  canCreated?: boolean;
}
interface iUnit {
  id: number;
  name: string;
}
interface iState {
  data: iUnit[];
  value: number | undefined;
  enterValue: string;
  fetching: boolean;
}

const { Option } = Select;
let cancel = () => {};
class Unit extends React.Component<iProps, iState> {
  state: iState = {
    data: [],
    value: undefined,
    enterValue: "",
    fetching: false,
  };
  fetchUnit = debounce(async function (query: string) {
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
  }, 400);
  handleChange(id: number, item: any) {
    this.setState({
      value: id,
    });
    this.props.onChangeUnit(
      {
        id,
        name: id === -1 ? this.state.enterValue : item.name,
      },
      "unit"
    );
  }
  render() {
    const { fetching, value, data } = this.state;
    const { t } = this.props;
    return (
      <Select
        value={value}
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
    );
  }
}

export default withTranslation()(Unit);
