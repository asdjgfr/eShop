import React from "react";
import { Select, Spin } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import { priceFormatter } from "@/lib/pubfn";
import debounce from "lodash/debounce";

interface iProps extends WithTranslation {}
interface iSupplier {
  value: number;
  label: string;
}
interface iState {
  data: iSupplier[];
  value: number;
  fetching: boolean;
}

const { Option } = Select;
class Supplier extends React.Component<iProps, iState> {
  state: iState = {
    data: [
      {
        value: 123,
        label: "asdasd",
      },
    ],
    value: 123,
    fetching: false,
  };
  fetchUser = debounce(function (a: any) {
    this.setState({
      fetching: true,
    });
    console.log(a);
  }, 800);
  handleChange(a: any) {
    console.log(a);
  }
  render() {
    const { fetching, value, data } = this.state;
    return (
      <Select
        value={value}
        placeholder="Select users"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser.bind(this)}
        showSearch={true}
        onChange={this.handleChange.bind(this)}
      >
        {data.map((d: iSupplier) => (
          <Option key={d.value} value={d.value}>
            {d.label}
          </Option>
        ))}
      </Select>
    );
  }
}

export default withTranslation()(Supplier);
