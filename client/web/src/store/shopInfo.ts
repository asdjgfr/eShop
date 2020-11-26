import { makeAutoObservable } from "mobx";

interface iShopInfo {
  // 店铺的标题
  title: string;
  // 店铺的后缀
  titleSuffix: string;
  // 店铺的说明
  introduction: string;
}

class ShopInfo implements iShopInfo {
  public title = "";
  public titleSuffix = "";
  public introduction = "";
  constructor() {
    makeAutoObservable(this);
  }
  setShopInfo(info: iShopInfo) {
    this.title = info.title;
    this.titleSuffix = info.titleSuffix;
    this.introduction = info.introduction;
  }
}
const shopInfo = new ShopInfo();
export default shopInfo;
