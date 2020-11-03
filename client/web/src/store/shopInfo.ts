import { action, observable } from "mobx";

interface shopInfo {
  // 店铺的标题
  title: string;
  // 店铺的后缀
  titleSuffix: string;
  // 店铺的说明
  introduction: string;
}

class ShopInfo implements shopInfo {
  @observable public title = "";
  @observable public titleSuffix = "";
  @observable public introduction = "";

  @action.bound setShopInfo(info: shopInfo) {
    this.title = info.title;
    this.titleSuffix = info.titleSuffix;
    this.introduction = info.introduction;
  }
}

export default ShopInfo;
