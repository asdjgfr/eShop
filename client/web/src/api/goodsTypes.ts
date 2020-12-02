import { post } from "./index";

export const getGoodsTypes = function (query: string) {
  return post("/api/get-goods-types", {
    query,
  });
};
