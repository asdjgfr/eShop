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
  id = id || "";
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

exports.queryBill = async function (params) {
  if (
    Array.isArray(params.createdAtInterval) &&
    params.createdAtInterval.length === 2
  ) {
  }
  const query = {};
  const keys = Object.keys(params);
  const onlyID = keys.length === 1 && keys[0] === "id";
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
    if (key === "limit" || key === "offset") {
      continue;
    }
    if (key === "createdAtInterval") {
      if (Array.isArray(params[key]) && params[key].length === 2) {
        query["createdAt"] = {
          $gte: `%${params[key][0]}%`,
          $lte: `%${params[key][1]}%`,
        };
      }
    } else if (key === "id") {
      query[key] = params[key];
    } else {
      query[key] = {
        $like: `%${params[key]}%`,
      };
    }
  }
  let data = null;
  const options = {
    where: { ...query, deleted: false },
  };
  if (params.limit !== undefined) {
    options.limit = Number(params.limit);
  }
  if (params.offset !== undefined) {
    options.offset = Number(params.offset);
  }
  yellowLog(options, params.limit, params.offset);
  if (onlyID) {
    data = await bills.findOne(options);
  } else {
    data = await bills.findAll(options);
  }
  const { company } = require("../config").config;
  if (data === null || data.length === 0) {
    return { code: 205, msg: "没有对应工单！" };
  }
  return {
    code: 0,
    msg: "查找成功！",
    data: Array.isArray(data)
      ? data.map((d) => ({
          ...JSON.parse(JSON.stringify(d)),
          company,
        }))
      : {
          ...JSON.parse(JSON.stringify(data)),
          company,
        },
  };
};

exports.delBill = async function (id) {
  let data = {};
  try {
    data = await bills.findOne({ where: { id } });
  } catch (e) {
    return { code: 1, msg: `删除工单失败！${JSON.stringify(e)}` };
  }
  data.deleted = true;
  try {
    await data.save();
  } catch (e) {
    return { code: 1, msg: `删除工单失败！${JSON.stringify(e)}` };
  }
  return { code: 0, msg: "删除工单成功！" };
};
