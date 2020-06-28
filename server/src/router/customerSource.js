const createCustomerSource = function (router) {
  router.post("/api/create-customer-source", async (ctx) => {
    const { customerSource } = ctx.request.body;
    ctx.body = await require("../db/customerSource").createCustomerSource(
      customerSource
    );
  });
  return router;
};
const getCustomerSource = function (router) {
  router.post("/api/get-customer-source", async (ctx) => {
    ctx.body = await require("../db/customerSource").getCustomerSource();
  });
  return router;
};

const delCustomerSource = function (router) {
  router.post("/api/del-customer-source", async (ctx) => {
    const { id } = ctx.request.body;
    ctx.body = await require("../db/customerSource").delCustomerSource(id);
  });
  return router;
};

const getRepairTypes = function (router) {
  router.post("/api/get-repair-types", async (ctx) => {
    ctx.body = await require("../db/customerSource").getRepairTypes();
  });
  return router;
};

const createRepairTypes = function (router) {
  router.post("/api/create-repair-types", async (ctx) => {
    const { repairTypes } = ctx.request.body;
    ctx.body = await require("../db/customerSource").createRepairTypes(
      repairTypes
    );
  });
  return router;
};

const delRepairType = function (router) {
  router.post("/api/del-repair-type", async (ctx) => {
    const { id } = ctx.request.body;
    ctx.body = await require("../db/customerSource").delRepairType(id);
  });
  return router;
};

const getCars = function (router) {
  router.post("/api/get-cars", async (ctx) => {
    ctx.body = await require("../db/customerSource").getCars();
  });
  return router;
};

const createCars = function (router) {
  router.post("/api/create-cars", async (ctx) => {
    const { repairTypes } = ctx.request.body;
    ctx.body = await require("../db/customerSource").createCars(repairTypes);
  });
  return router;
};

const delCar = function (router) {
  router.post("/api/del-car", async (ctx) => {
    const { id } = ctx.request.body;
    ctx.body = await require("../db/customerSource").delCar(id);
  });
  return router;
};

const saveBill = function (router) {
  router.post("/api/save-bill", async (ctx) => {
    ctx.body = await require("../db/customerSource").saveBill(ctx.request.body);
  });
  return router;
};

exports.mutations = [
  createCustomerSource,
  getCustomerSource,
  delCustomerSource,
  getRepairTypes,
  createRepairTypes,
  delRepairType,
  getCars,
  createCars,
  delCar,
  saveBill,
];
