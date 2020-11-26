import { post } from "./index";

export const getLogs = function (data: { page: number; pageSize: number }) {
  return post("/api/get-logs", data);
};
