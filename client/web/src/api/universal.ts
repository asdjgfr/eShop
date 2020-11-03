import axios from "axios";
import { Response } from "./index";

interface shopInfo extends Response {
  data: {
    Email: string;
    introduction: string;
    name: string;
    phones: string;
    suffix: string;
  };
}

export const getShopInfo = function () {
  // 获取店面的信息
  return axios.post<shopInfo>("/info/get-shop-info").then((res) => res.data);
};
