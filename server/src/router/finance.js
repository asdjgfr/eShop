const findOrCreateFinance = function (router) {
  router.post("/api/find-or-create-finance", async (ctx) => {
    const { month, session, deviceID } = ctx.request.body;
    ctx.body = await require("../db/finance").findOrCreateFinance(
      month,
      session,
      deviceID
    );
  });
  return router;
};

const annualStatisticsFinance = function (router) {
  router.post("/api/annual-statistics-finance", async (ctx) => {
    const { year, session, deviceID } = ctx.request.body;
    ctx.body = await require("../db/finance").annualStatisticsFinance(
      year,
      session,
      deviceID
    );
  });
  return router;
};
const saveFinanceRemarks = function (router) {
  router.post("/api/save-finance-remarks", async (ctx) => {
    ctx.body = await require("../db/finance").saveFinanceRemarks(
      ctx.request.body
    );
  });
  return router;
};

exports.mutations = [
  findOrCreateFinance,
  annualStatisticsFinance,
  saveFinanceRemarks,
];
