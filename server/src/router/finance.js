const findOrCreateFinance = function (router) {
  router.post("/api/find-or-create-finance", async (ctx) => {
    const { month, newRemarks } = ctx.request.body;
    ctx.body = await require("../db/finance").findOrCreateFinance(
      month,
      newRemarks
    );
  });
  return router;
};

exports.mutations = [findOrCreateFinance];
