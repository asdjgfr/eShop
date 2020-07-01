const { bills } = require("./dataBase");
const {
  createCustomerSource,
  createRepairTypes,
  createCars,
  createCarInfo,
} = require("./customerSource");

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
  let receivable = 0;
  let receipts = 0;
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
    receivable,
    receipts,
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
  const { company } = require("../config").config;
  if (data === null) {
    return { code: 205, msg: "没有对应工单！" };
  }
  return {
    code: 0,
    msg: "查找成功！",
    data: {
      ...JSON.parse(JSON.stringify(data)),
      company,
    },
  };
};

exports.delBill = async function (id) {
  await bills.destroy({
    where: {
      id,
    },
  });
  return { code: 0, msg: "删除工单成功！" };
};
