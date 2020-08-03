import server from "@/api/service";
const { service } = server;

// 查找或生成月账单
const findOrCreateFinance = data =>
  service({
    url: "/api/find-or-create-finance",
    method: "post",
    data
  });
// 年度统计
const annualStatisticsFinance = data =>
  service({
    url: "/api/annual-statistics-finance",
    method: "post",
    data
  });
// 保存月份备注
const saveFinanceRemarks = data =>
  service({
    url: "/api/save-finance-remarks",
    method: "post",
    data
  });

export default {
  findOrCreateFinance,
  annualStatisticsFinance,
  saveFinanceRemarks
};
