import React from "react";
import { Button } from "antd";
import { getUserInfo } from "@/api/user";

interface iProps {}
interface iState {}

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
