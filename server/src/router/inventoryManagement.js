const saveInventory = function (router) {
  router.post("/api/save-inventory", async (ctx) => {
    ctx.body = await require("../db/inventory").saveInventory(ctx.request.body);
  });
  return router;
};

const saveInventoryBulk = function (router) {
  router.post("/api/save-inventory-bulk", async (ctx) => {
    ctx.body = await require("../db/inventory").saveInventoryBulk(
      ctx.request.body
    );
  });
  return router;
};

const queryInventory = function (router) {
  router.post("/api/query-inventory", async (ctx) => {
    ctx.body = await require("../db/inventory").queryInventory(
      ctx.request.body
    );
  });
  return router;
};

const delInventory = function (router) {
  router.post("/api/del-inventory", async (ctx) => {
    ctx.body = await require("../db/inventory").delInventory(
      ctx.request.body.id
    );
  });
  return router;
};
const queryInventoryAttrs = function (router) {
  router.post("/api/query-inventory-attrs", async (ctx) => {
    const { q, attributes, query, notIn = [] } = ctx.request.body;
    ctx.body = await require("../db/inventory").queryInventoryAttrs(
      attributes,
      q,
      query,
      notIn
    );
  });
  return router;
};

const downloadInventoryTemplate = function (router) {
  router.get("/api/download-inventory-template", async (ctx) => {
    ctx.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", //告诉浏览器这是一个二进制文件
    });
    ctx.body = await require("../db/inventory").downloadITemplate();
  });
  return router;
};

exports.mutations = [
  queryInventory,
  saveInventory,
  delInventory,
  queryInventoryAttrs,
  downloadInventoryTemplate,
  saveInventoryBulk,
];
