// 库存
import server from "@/api/service";
const { service } = server;

// 查询库存
const queryInventory = data =>
  service({
    url: "/api/query-inventory",
    method: "post",
    data
  });

// 删除库存
const delInventory = data =>
  service({
    url: "/api/del-inventory",
    method: "post",
    data
  });

// 查询库存属性
const queryInventoryAttrs = data =>
  service({
    url: "/api/del-inventory-attrs",
    method: "post",
    data
  });
// 保存更新库存
const saveInventory = data =>
  service({
    url: "/api/save-inventory",
    method: "post",
    data
  });

export default {
  queryInventory,
  queryInventoryAttrs,
  delInventory,
  saveInventory
};
