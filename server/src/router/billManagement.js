const saveBill = function (router) {
  router.post("/api/save-bill", async (ctx) => {
    ctx.body = await require("../db/billManagement").saveBill(ctx.request.body);
  });
  return router;
};

const queryBill = function (router) {
  router.post("/api/query-bill", async (ctx) => {
    ctx.body = await require("../db/billManagement").queryBill(
      ctx.request.body.id
    );
  });
  return router;
};
const delBill = function (router) {
  router.post("/api/del-bill", async (ctx) => {
    ctx.body = await require("../db/billManagement").delBill(
      ctx.request.body.id
    );
  });
  return router;
};

exports.mutations = [saveBill, queryBill, delBill];
