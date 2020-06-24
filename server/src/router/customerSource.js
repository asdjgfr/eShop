exports.createCustomerSource = function (router) {
  router.post("/api/create-customer-source", async (ctx) => {
    const { customerSource } = ctx.request.body;
    ctx.body = await require("../db/customerSource").createCustomerSource(
      customerSource
    );
  });
  return router;
};
exports.getCustomerSource = function (router) {
  router.post("/api/get-customer-source", async (ctx) => {
    ctx.body = await require("../db/customerSource").getCustomerSource();
  });
  return router;
};

exports.delCustomerSource = function (router) {
  router.post("/api/del-customer-source", async (ctx) => {
    const { id } = ctx.request.body;
    ctx.body = await require("../db/customerSource").delCustomerSource(id);
  });
  return router;
};
