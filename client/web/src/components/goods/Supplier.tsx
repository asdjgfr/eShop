import React from "react";
import { Select, Spin } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import debounce from "lodash/debounce";
import { getSuppliers } from "@/api/supplies";

interface iProps extends WithTranslation {
  onChangeSupplier: (data: { id: number; name: string }) => void;
}
interface iSupplier {
  id: number;
  name: string;
}
interface iState {
  data: iSupplier[];
  value: number | undefined;
  enterValue: string;
  fetching: boolean;
}

const { Option } = Select;
let cancel = () => {};
class Supplier extends React.Component<iProps, iState> {
  state: iState = {
    data: [],
    value: undefined,
    enterValue: "",
    fetching: false,
  };
  fetchUser = debounce(async function (query: string) {
    const { t } = this.props;
    cancel();
    this.setState({
      fetching: true,
    });
    const gs = getSuppliers(query);
    cancel = gs.cancel;
    const res = await gs.data;
    this.setState({
      data: res.supplies.length
        ? res.supplies
        : [
            {
              id: -1,
              name: t("add") + t(":") + query,
            },
          ],
      fetching: false,
      enterValue: query,
    });
  }, 400);
  handleChange(id: number) {
    this.setState({
      value: id,
    });
    this.props.onChangeSupplier({ id, name: this.state.enterValue });
  }
  render() {
    const { fetching, value, data } = this.state;
    const { t } = this.props;
    return (
      <Select
        value={value}
        placeholder={t("plsSearch") + t("supplier")}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onFocus={this.fetchUser.bind(this, "")}
        onSearch={this.fetchUser.bind(this)}
        showSearch={true}
        onChange={this.handleChange.bind(this)}
      >
        {data.map((d: iSupplier) => (
          <Option key={d.id} value={d.id}>
            {d.name}
          </Option>
        ))}
      </Select>
    );
  }
}

export default withTranslation()(Supplier);
