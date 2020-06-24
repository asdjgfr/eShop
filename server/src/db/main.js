const Sequelize = require("sequelize");
const { db } = require("../config").config;
//初始化数据库连接
const sequelize = new Sequelize(
  db.dbName,
  db.username,
  db.password,
  db.dbConfig
);
exports.sequelize = sequelize;
exports.Sequelize = Sequelize;

exports.main = async function () {
  // 定义user表的model
  // 检查数据库连接
  try {
    await sequelize.authenticate();
    console.log("数据库连接成功！");
    await initSystem();
    console.log("数据库初始化成功！");
  } catch (e) {
    console.error("数据库连接失败：", e);
  }
  // 检查是否有管理员账户,没有则创建
};
async function initSystem() {
  const checkAdminAndCreate = await require("./user").checkAdminAndCreate();
  const checkCustomerSource = await require("./customerSource").checkCustomerSource();
  return {
    checkAdminAndCreate,
    checkCustomerSource,
  };
}
