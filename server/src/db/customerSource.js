const { sequelize, Sequelize } = require("./main");
const { tableFilter } = require("../pubFn/db");
// 客户来源表
const customerSource = sequelize["define"]("customerSource", {
  name: {
    // 客户来源
    type: Sequelize.STRING,
    allowNull: false,
  },
});

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

exports.delCustomerSource = async function (id) {
  // 根据ID删除客户来源
  await customerSource.destroy({
    where: {
      id,
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

exports.createRepairTypes = async function (names) {
  // 新建客户来源
  await createByName(repairType, names);
  return { code: 0, msg: "新建维修类型成功！" };
};

exports.getRepairTypes = async function () {
  // 查找所有维修类型
  const data = await repairType.findAll();
  console.log("---------------------", data);
  return { code: 0, data };
};

exports.delRepairType = async function (id) {
  // 根据ID删除维修类型
  await repairType.destroy({
    where: {
      id,
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

exports.createCars = async function (names) {
  // 新建车系
  await createByName(cars, names);
  return { code: 0, msg: "新建车系成功！" };
};

exports.getCars = async function () {
  // 查找所有车系
  const data = await cars.findAll();
  return { code: 0, data };
};

exports.delCar = async function (id) {
  // 根据ID删除车系
  await cars.destroy({
    where: {
      id,
    },
  });
  return { code: 0, msg: "删除车系成功！" };
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
    defaultValue: [],
  },
  repairTypes: {
    // 维修类型
    type: Sequelize.JSON,
    allowNull: false,
    defaultValue: [],
  },
  remarks: {
    // 备注
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "",
  },
  numberPlate: {
    // 车牌号
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  car: {
    // 车系
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  VIN: {
    // VIN
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  ownerName: {
    // 车主姓名
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  phone: {
    // 车主手机
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
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
    defaultValue: [],
  },
  deviceID: {
    // 设备ID
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  session: {
    // 设备ID
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
});
exports.saveBill = async function (params) {
  const {
    order = `JY${new Date().getTime()}`,
    source = [],
    repairTypes = [],
    remarks = "",
    numberPlate = "",
    car = "",
    VIN = "",
    ownerName = "",
    phone = "",
    mileage = 0,
    maintenanceItems = [],
    session = "",
    deviceID = "",
  } = params;
  if (session === "" || deviceID === "") {
    return { code: 403, msg: "保存失败，请重新登录！" };
  } else {
    console.log(
      "----------------------------",
      mileage === "",
      "----------------"
    );
    await bills.create({
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
    });
    return { code: 0, msg: "保存成功！" };
  }
};

function createByName(model, names) {
  if (!Array.isArray(names)) {
    names = [names];
  }
  return Promise.all(
    names.map((name) =>
      model.findOrCreate({
        where: { name },
      })
    )
  );
}

exports.checkCustomerSource = async function () {
  // 同步数据库
  let res = {};
  try {
    await sequelize.sync();
    res = { code: 0, msg: "客户接待同步成功！" };
    console.log("客户接待所有表同步成功！");
  } catch (e) {
    res = { code: 1, msg: "客户接待表同步失败！" };
    console.log("客户接待表同步失败：", e);
  }
  return res;
};
