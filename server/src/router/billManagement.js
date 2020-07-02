const saveBill = function (router) {
  router.post("/api/save-bill", async (ctx) => {
    ctx.body = await require("../db/billManagement").saveBill(ctx.request.body);
  });
  return router;
};

const queryBill = function (router) {
  router.post("/api/query-bill", async (ctx) => {
    const params = {
      finished: "",
      id: "",
      createdAtInterval: [],
      order: "",
      numberPlate: "",
      VIN: "",
      car: "",
      limit: "",
      offset: "",
    };
    const { body } = ctx.request;
    Object.keys(params).forEach((key) => {
      if (
        (Array.isArray(body[key]) && body[key].length !== 0) ||
        (body[key] !== "" && body[key] !== undefined && body[key] !== null)
      ) {
        params[key] = body[key];
      } else {
        delete params[key];
      }
    });
    ctx.body = await require("../db/billManagement").queryBill(params);
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
