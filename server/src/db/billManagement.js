const { bills } = require("./dataBase");
const {
  createCustomerSource,
  createRepairTypes,
  createCars,
  createCarInfo,
} = require("./customerSource");
const { arraySum, numToChinese } = require("../pubFn/libs");

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
  // 全部订单金额
  let totalPrice = 0;
  // 大写
  let totalPriceCN = "";
  // 查找结果订单金额
  let filterTotalPrice = 0;
  let filterTotalPriceCN = "";
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
          $gte: new Date(params[key][0]),
          $lte: new Date(params[key][1]),
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
  yellowLog(query);
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
  if (onlyID) {
    data = await bills.findOne(options);
    if (data !== null) {
      filterTotalPrice = data.receipts;
      totalPrice = data.receipts;
    }
  } else {
    data = await bills.findAndCountAll(options);
    const allBills = await bills.findAll({
      where: { deleted: false },
    });
    filterTotalPrice = arraySum(data.rows, "receipts");
    totalPrice = arraySum(allBills, "receipts");
  }
  filterTotalPriceCN = numToChinese(filterTotalPrice);
  totalPriceCN = numToChinese(totalPrice);
  const { company } = require("../config").config;
  if (data === null || (data.rows !== undefined && data.rows.length === 0)) {
    return { code: 205, msg: "没有对应工单！" };
  }
  return {
    code: 0,
    msg: "查找成功！",
    data: Array.isArray(data.rows)
      ? data.rows.map((d) => ({
          ...JSON.parse(JSON.stringify(d)),
          company,
        }))
      : {
          ...JSON.parse(JSON.stringify(data)),
          company,
        },
    length: data.count || 0,
    filterTotalPrice,
    filterTotalPriceCN,
    totalPrice,
    totalPriceCN,
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
