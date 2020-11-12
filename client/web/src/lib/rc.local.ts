import { observable } from "mobx";
import store from "@/store";
import { getShopInfo } from "@/api/universal";

// 需要初始化执行的内容
const initFn = async function () {
  await initShopInfo();
};

/**
 * @description 初始化店铺的信息
 * */
async function initShopInfo() {
  const gsi = getShopInfo();
  const res = await gsi.data;
  store.shopInfo.setShopInfo({
    title: res.data.name,
    titleSuffix: res.data.suffix,
    introduction: res.data.introduction,
  });
}
export default initFn;
