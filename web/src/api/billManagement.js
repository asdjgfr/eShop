// 账单管理
import server from "@/api/service";
const { service } = server;

// 生成账单pdf
const buildBill = data =>
  service({
    url: "/api/build-bill-pdf",
    method: "post",
    data
  });

export default { buildBill };
