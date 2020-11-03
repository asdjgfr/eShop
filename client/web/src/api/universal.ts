import { post } from "./index";

export const getShopInfo = function () {
  // 获取店面的信息
  return post("/info/get-shop-info");
};
