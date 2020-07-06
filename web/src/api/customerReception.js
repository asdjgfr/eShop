// 客户接待
import server from "@/api/service";
const { service, CancelToken } = server;

// 获取客户来源
const getCustomerSource = () =>
  service({
    url: "/api/get-customer-source",
    method: "post"
  });
// 创建客户来源
const createCustomerSource = data =>
  service({
    url: "/api/create-customer-source",
    method: "post",
    data
  });
// 删除客户来源
const delCustomerSource = data =>
  service({
    url: "/api/del-customer-source",
    method: "post",
    data
  });

// 获取维修类型
const getRepairTypes = () =>
  service({
    url: "/api/get-repair-types",
    method: "post"
  });
// 创建维修类型
const createRepairTypes = data =>
  service({
    url: "/api/create-repair-types",
    method: "post",
    data
  });
// 删除维修类型
const delRepairType = data =>
  service({
    url: "/api/del-repair-type",
    method: "post",
    data
  });

// 获取车系
const getCars = () =>
  service({
    url: "/api/get-cars",
    method: "post"
  });

// 创建车系
const createCars = data =>
  service({
    url: "/api/create-cars",
    method: "post",
    data
  });

// 删除车系
const delCar = data =>
  service({
    url: "/api/del-car",
    method: "post",
    data
  });
// 保存账单
const saveBill = data =>
  service({
    url: "/api/save-bill",
    method: "post",
    data
  });
// 查询账单
let cancelQueryBill = null;
const queryBill = data => {
  if (cancelQueryBill !== null) {
    cancelQueryBill("cancelByUser");
  }
  return service({
    url: "/api/query-bill",
    method: "post",
    data,
    cancelToken: new CancelToken(function executor(c) {
      cancelQueryBill = c;
      return { code: 555 };
    })
  });
};

// 删除账单
const delBill = data =>
  service({
    url: "/api/del-bill",
    method: "post",
    data
  });
// 查找车主信息
let cancelQueryCarInfo = null;
const queryCarInfo = data => {
  if (cancelQueryCarInfo !== null) {
    cancelQueryCarInfo("cancelByUser");
  }
  return service({
    url: "/api/query-car-info",
    method: "post",
    data,
    cancelToken: new CancelToken(function executor(c) {
      cancelQueryCarInfo = c;
    })
  });
};
// 删除车辆信息
const delCarInfo = data => {
  return service({
    url: "/api/del-car-info",
    method: "post",
    data
  });
};
// 新建或更新车主信息
const createCarInfo = data => {
  return service({
    url: "/api/create-car-info",
    method: "post",
    data
  });
};

export default {
  getCustomerSource,
  createCustomerSource,
  delCustomerSource,
  getRepairTypes,
  createRepairTypes,
  delRepairType,
  getCars,
  createCars,
  delCar,
  saveBill,
  queryBill,
  delBill,
  queryCarInfo,
  delCarInfo,
  createCarInfo
};
