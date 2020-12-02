import { post } from "./index";

export const getUnit = function (query: string) {
  return post("/api/get-unit", {
    query,
  });
};
