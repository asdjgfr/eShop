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
    ctx.body = await require("../db/customerSource").delCustomerSource(
      ctx.request.body.name
    );
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
    ctx.body = await require("../db/customerSource").delRepairType(
      ctx.request.body.name
    );
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
    ctx.body = await require("../db/customerSource").delCar(
      ctx.request.body.name
    );
  });
  return router;
};

const createCarInfo = function (router) {
  router.post("/api/create-car-info", async (ctx) => {
    const {
      numberPlate,
      car,
      VIN,
      ownerName,
      phone,
      mileage,
      session,
      deviceID,
      id,
    } = ctx.request.body;
    ctx.body = await require("../db/customerSource").createCarInfo({
      numberPlate,
      car,
      VIN,
      ownerName,
      phone,
      mileage,
      session,
      deviceID,
      id,
    });
  });
  return router;
};
const queryCarInfoLike = function (router) {
  router.post("/api/query-car-info", async (ctx) => {
    const {
      numberPlate,
      car,
      ownerName,
      VIN,
      phone,
      mileage,
      limit,
      offset,
    } = ctx.request.body;
    ctx.body = await require("../db/customerSource").queryCarInfoLike({
      numberPlate,
      car,
      ownerName,
      VIN,
      phone,
      mileage,
      limit,
      offset,
    });
  });
  return router;
};
const delCarInfo = function (router) {
  router.post("/api/del-car-info", async (ctx) => {
    ctx.body = await require("../db/customerSource").delCarInfo(
      ctx.request.body.id
    );
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
  queryCarInfoLike,
  createCarInfo,
  delCarInfo,
];
