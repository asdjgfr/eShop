import server from "@/api/service";
const { service } = server;

// 查找或生成月账单
const findOrCreateFinance = data =>
  service({
    url: "/api/find-or-create-finance",
    method: "post",
    data
  });

export default { findOrCreateFinance };
