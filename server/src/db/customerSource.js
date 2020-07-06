const { customerSource, repairType, cars, carInfo } = require("./dataBase");
exports.createCustomerSource = async function (names) {
  // 新建客户来源
  await createByName(customerSource, names);
  return { code: 0, msg: "新建客户来源成功！" };
};

exports.getCustomerSource = async function () {
  // 查找所有客户来源
  const data = await customerSource.findAll();
  return { code: 0, data };
};

exports.delCustomerSource = async function (name) {
  // 根据ID删除客户来源
  await customerSource.destroy({
    where: {
      name,
    },
  });
  return { code: 0, msg: "删除客户来源成功！" };
};

const createRepairTypes = async function (names) {
  // 新建客户来源
  await createByName(repairType, names);
  return { code: 0, msg: "新建维修类型成功！" };
};
exports.createRepairTypes = createRepairTypes;

exports.getRepairTypes = async function () {
  // 查找所有维修类型
  const data = await repairType.findAll();
  return { code: 0, data };
};

exports.delRepairType = async function (name) {
  // 根据ID删除维修类型
  await repairType.destroy({
    where: {
      name,
    },
  });
  return { code: 0, msg: "删除维修类型成功！" };
};

const createCars = async function (names) {
  // 新建车系
  await createByName(cars, names);
  return { code: 0, msg: "新建车系成功！" };
};
exports.createCars = createCars;

exports.getCars = async function () {
  // 查找所有车系
  const data = await cars.findAll();
  return { code: 0, data };
};

exports.delCar = async function (name) {
  // 根据ID删除车系
  await cars.destroy({
    where: {
      name,
    },
  });
  return { code: 0, msg: "删除车系成功！" };
};

const createCarInfo = async function (defaults) {
  // 新建车辆信息
  const { numberPlate, id } = defaults;
  let [data, created] = [null, false];
  if (id !== undefined) {
    data = await carInfo.findByPk(id);
    created = false;
  } else {
    [data, created] = await carInfo.findOrCreate({
      where: { numberPlate: numberPlate.toString().toUpperCase() },
      defaults,
    });
  }
  if (data === null) {
    return { code: 205, msg: "未找到车辆信息！" };
  }
  if (!created) {
    Object.keys(defaults).forEach((key) => {
      const tmp = defaults[key];
      if (![undefined, null, ""].some((t) => t === tmp)) {
        data[key] = tmp;
      }
    });
    await data.save();
  }
  return { code: 0, msg: `${created ? "新建" : "更新"}车辆信息成功！` };
};
exports.createCarInfo = createCarInfo;

exports.queryCarInfoLike = async function (params) {
  const options = { where: {} };
  const keys = Object.keys(params);
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
    if (
      key === "limit" ||
      key === "offset" ||
      params[key] === undefined ||
      params[key] === null
    ) {
      continue;
    }
    if (key === "id") {
      options.where[key] = params[key];
    } else {
      options.where[key] = {
        $like: `%${
          key === "numberPlate"
            ? params[key].toString().toUpperCase()
            : params[key]
        }%`,
      };
    }
  }
  if (!isNaN(Number(params.limit))) {
    options.limit = Number(params.limit);
  }
  if (!isNaN(Number(params.offset))) {
    options.offset = Number(params.offset);
  }
  // 模糊查询车辆信息
  const data = await carInfo.findAndCountAll(options);
  return { code: 0, data: data.rows, length: data.count || 0 };
};

exports.delCarInfo = async function (id) {
  // 删除车辆信息
  await carInfo.destroy({
    where: {
      id,
    },
  });
  return { code: 0, msg: "删除客户信息成功！" };
};

function createByName(model, names) {
  if (!Array.isArray(names)) {
    names = [names];
  }
  return Promise.all(
    names.map((name) =>
      model.findOrCreate({
        where: { name: name.trim() },
      })
    )
  );
}
