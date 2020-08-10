const Sequelize = require("sequelize");
const { Op } = Sequelize;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

const { db } = __config.config;
//初始化数据库连接
const sequelize = new Sequelize(db.dbName, db.username, db.password, {
  ...db.dbConfig,
  operatorsAliases,
});
exports.Sequelize = Sequelize;
exports.sequelize = sequelize;
// 用户表
const User = sequelize["define"]("user", {
  username: {
    // 用户名
    type: Sequelize.STRING,
    allowNull: false,
  },
  // 密码
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    select: false,
  },
  // 是否是管理员
  isAdmin: {
    // 是否拥有管理员权限，默认否
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
exports.User = User;
// 用户操作表
const UserLog = sequelize["define"]("userLog", {
  username: {
    // 用户名
    type: Sequelize.STRING,
    allowNull: false,
  },
  // 登陆时间
  loginTime: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // 登出时间
  logoutTime: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  // 设备信息
  device: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // 设备ID
  deviceID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // 动作
  action: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  // X-Forwarded-For获取的ip
  ip: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  // nginx获取的ip
  realIP: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
});
exports.UserLog = UserLog;

// 客户来源表
const customerSource = sequelize["define"]("customerSource", {
  name: {
    // 客户来源
    type: Sequelize.STRING,
    allowNull: false,
  },
});
exports.customerSource = customerSource;
// 维修类型表
const repairType = sequelize["define"]("repairType", {
  name: {
    // 维修类型名称
    type: Sequelize.STRING,
    allowNull: false,
  },
});
exports.repairType = repairType;
// 车系表
const cars = sequelize["define"]("cars", {
  name: {
    // 车系名称
    type: Sequelize.STRING,
    allowNull: false,
  },
});
exports.cars = cars;

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
exports.carInfo = carInfo;

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
  maintenanceItemIDs: {
    // 维修项目的ID
    type: Sequelize.JSON,
    allowNull: false,
  },
  receivable: {
    // 应收金额
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  receipts: {
    // 实收金额
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  deviceID: {
    // 设备ID
    type: Sequelize.STRING,
    allowNull: false,
    select: false,
  },
  session: {
    // session
    type: Sequelize.STRING,
    allowNull: false,
    select: false,
  },
  finished: {
    // 是否完成交易
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  deleted: {
    // 是否删除
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});
exports.bills = bills;

// 库存
const inventory = sequelize["define"]("inventory", {
  name: {
    // 名称
    type: Sequelize.STRING,
    allowNull: false,
  },
  supplier: {
    // 供货商
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    // 配件种类
    type: Sequelize.STRING,
    allowNull: false,
  },
  code: {
    // 配件代码
    type: Sequelize.STRING,
    allowNull: false,
  },
  count: {
    // 库存量
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  purchaseCount: {
    // 采购量
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  costPrice: {
    // 成本价
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  totalCostPrice: {
    // 成本金额
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  sellingPrice: {
    // 销售价
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  lastPurchasePrice: {
    // 最新进价
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  guidePrice: {
    // 销售指导价
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  unit: {
    // 单位
    type: Sequelize.STRING,
    allowNull: false,
  },
  minCount: {
    // 最小包装数
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  storageTime: {
    // 最新入库时间
    type: Sequelize.DATE,
    allowNull: false,
  },
  deliveryTime: {
    // 最新出库时间
    type: Sequelize.DATE,
    defaultValue: null,
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
exports.inventory = inventory;

// 财务信息
const finance = sequelize["define"]("finance", {
  month: {
    // 月份
    type: Sequelize.DATE,
    allowNull: false,
  },
  remarks: {
    // 备注
    type: Sequelize.TEXT,
    defaultValue: "",
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

exports.finance = finance;

exports.initDB = async function () {
  let res = {};
  try {
    // 检查数据库连接
    await sequelize.authenticate();
    console.log("数据库连接成功！");
    await sequelize.sync({ alter: true });
    res = { code: 0, msg: "数据库同步成功" };
    console.log("数据库同步成功！");
  } catch (e) {
    console.log("数据库同步失败：", chalk.red(JSON.stringify(e)));
    res = { code: 1, msg: `数据库同步失败：${JSON.stringify(e)}` };
  }
  return res;
};
