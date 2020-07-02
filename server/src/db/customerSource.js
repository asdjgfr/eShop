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
  const { numberPlate } = defaults;
  const [data, created] = await carInfo.findOrCreate({
    where: { numberPlate: numberPlate.toString().toUpperCase() },
    defaults,
  });
  if (!created) {
    Object.keys(defaults).forEach((key) => {
      data[key] = defaults[key];
    });
    await data.save();
  }
  return { code: 0, msg: `${created ? "新建" : "更新"}车辆信息成功！"` };
};
exports.createCarInfo = createCarInfo;

exports.queryCarInfoLike = async function (numberPlate) {
  // 模糊查询车辆信息
  const data = await carInfo.findAll({
    where: {
      numberPlate: {
        $like: `%${numberPlate.toUpperCase()}%`,
      },
    },
  });
  return { code: 0, data };
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
