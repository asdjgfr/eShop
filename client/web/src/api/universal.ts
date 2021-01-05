import { get } from "./index";

export const getShopInfo = function () {
  // 获取店面的信息
  return get("/info/get-shop-info");
};
