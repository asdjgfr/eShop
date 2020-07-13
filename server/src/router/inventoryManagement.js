const saveInventory = function (router) {
  router.post("/api/save-inventory", async (ctx) => {
    ctx.body = await require("../db/inventory").saveInventory(ctx.request.body);
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
  router.post("/api/del-inventory-attrs", async (ctx) => {
    const { q, attributes, query } = ctx.request.body;
    ctx.body = await require("../db/inventory").queryInventoryAttrs(
      attributes,
      q,
      query
    );
  });
  return router;
};

exports.mutations = [
  queryInventory,
  saveInventory,
  delInventory,
  queryInventoryAttrs,
];
