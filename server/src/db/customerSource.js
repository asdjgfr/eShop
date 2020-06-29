const { sequelize, Sequelize } = require("./main");
const { Op } = Sequelize;
// 客户来源表
const customerSource = sequelize["define"]("customerSource", {
  name: {
    // 客户来源
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const createCustomerSource = async function (names) {
  // 新建客户来源
  await createByName(customerSource, names);
  return { code: 0, msg: "新建客户来源成功！" };
};
exports.createCustomerSource = createCustomerSource;

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

// 维修类型表
const repairType = sequelize["define"]("repairType", {
  name: {
    // 维修类型名称
    type: Sequelize.STRING,
    allowNull: false,
  },
});

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

// 车系表
const cars = sequelize["define"]("cars", {
  name: {
    // 车系名称
    type: Sequelize.STRING,
    allowNull: false,
  },
});

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

// 车辆信息
const carInfo = sequelize["define"]("carInfo", {
  numberPlate: {
    // 车牌号
    type: Sequelize.STRING,
    allowNull: false,
  },
  car: {
    // 车系
    type: Sequelize.STRING,
    allowNull: false,
  },
  ownerName: {
    // 车主姓名
    type: Sequelize.STRING,
    allowNull: false,
  },
  VIN: {
    // VIN
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    // 车主手机
    type: Sequelize.STRING,
    allowNull: false,
  },
  mileage: {
    // 进场里程
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  session: {
    // session
    type: Sequelize.STRING,
    allowNull: false,
    select: false,
  },
  deviceID: {
    // 设备指纹
    type: Sequelize.STRING,
    allowNull: false,
    select: false,
  },
});

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
        [Op.like]: `%${numberPlate.toUpperCase()}%`,
      },
    },
  });
  return { code: 0, data };
};

// 工单
const bills = sequelize["define"]("bills", {
  order: {
    // 工单号
    type: Sequelize.STRING,
    allowNull: false,
  },
  source: {
    // 客户来源
    type: Sequelize.JSON,
    allowNull: false,
  },
  repairTypes: {
    // 维修类型
    type: Sequelize.JSON,
    allowNull: false,
  },
  remarks: {
    // 备注
    type: Sequelize.TEXT,
    allowNull: false,
  },
  numberPlate: {
    // 车牌号
    type: Sequelize.STRING,
    allowNull: false,
  },
  car: {
    // 车系
    type: Sequelize.STRING,
    allowNull: false,
  },
  VIN: {
    // VIN
    type: Sequelize.STRING,
    allowNull: false,
  },
  ownerName: {
    // 车主姓名
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    // 车主手机
    type: Sequelize.STRING,
    allowNull: false,
  },
  mileage: {
    // 进场里程
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  maintenanceItems: {
    // 维修项目
    type: Sequelize.JSON,
    allowNull: false,
  },
  deviceID: {
    // 设备ID
    type: Sequelize.STRING,
    allowNull: false,
    select: false,
  },
  session: {
    // 设备ID
    type: Sequelize.STRING,
    allowNull: false,
    select: false,
  },
  finished: {
    // 是否完成交易
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

exports.saveBill = async function (params) {
  let {
    order,
    source,
    repairTypes,
    remarks,
    numberPlate,
    car,
    VIN,
    ownerName,
    phone,
    mileage,
    maintenanceItems,
    session,
    deviceID,
    id,
    finished,
  } = params;
  order = order || `JY${new Date().getTime()}`;
  source = source || [];
  repairTypes = repairTypes || [];
  numberPlate = numberPlate || "";
  car = car || "";
  VIN = VIN || "";
  remarks = remarks || "";
  ownerName = ownerName || "";
  phone = phone || "";
  mileage = mileage || 0;
  maintenanceItems = maintenanceItems || [];
  await createCustomerSource(source);
  await createRepairTypes(repairTypes);
  await createCars(car);
  await createCarInfo({
    numberPlate,
    car,
    VIN,
    ownerName,
    phone,
    mileage,
    session,
    deviceID,
  });

  const defaults = {
    order,
    source,
    repairTypes,
    remarks,
    numberPlate,
    car,
    VIN,
    ownerName,
    phone,
    mileage,
    maintenanceItems,
    session,
    deviceID,
    finished,
  };
  const [data, created] = await bills.findOrCreate({
    where: { id },
    defaults,
  });
  if (!created) {
    Object.keys(defaults).forEach((key) => {
      data[key] = defaults[key];
    });
    await data.save();
  }
  return {
    code: 0,
    msg: created ? "保存成功！" : "更新成功！",
    data: data.id,
  };
};

exports.queryBill = async function (id) {
  const data = await bills.findOne({ where: { id } });
  if (data === null) {
    return { code: 205, msg: "没有对应工单！" };
  }
  return { code: 0, msg: "查找成功！", data };
};

exports.delBill = async function (id) {
  await bills.destroy({
    where: {
      id,
    },
  });
  return { code: 0, msg: "删除工单成功！" };
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

exports.checkCustomerSource = async function () {
  // 同步数据库
  let res = {};
  try {
    await sequelize.sync({ alter: true });
    res = { code: 0, msg: "客户接待同步成功！" };
    console.log("客户接待所有表同步成功！");
  } catch (e) {
    res = { code: 1, msg: "客户接待表同步失败！" };
    console.log("客户接待表同步失败：", e);
  }
  return res;
};
