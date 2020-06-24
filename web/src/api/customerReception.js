// 客户接待
import service from "@/api/service";
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

export default { getCustomerSource, createCustomerSource, delCustomerSource };
