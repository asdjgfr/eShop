import React from "react";
import { Button, Skeleton } from "antd";
import Store from "@/store";
import { inject } from "mobx-react";
import { getUserInfo } from "@/api/user";

interface iProps {
  store?: typeof Store;
}
interface iState {}

@inject("store")
class ShopList extends React.Component<iProps, iState> {
  state = {};
  async getMsg() {
    const res = await getUserInfo();
    console.log(res);
  }

  render() {
    return (
      <div className="shop-list" onClick={this.getMsg}>
        <Button>获取</Button>
      </div>
    );
  }
}

export default ShopList;
