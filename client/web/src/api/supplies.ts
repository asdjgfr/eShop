import { post } from "./index";

export const getSuppliers = function (query: string) {
  return post("/api/get-suppliers", {
    query,
  });
};
