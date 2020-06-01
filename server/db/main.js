const Sequelize = require("sequelize");
//初始化数据库连接
const sequelize = new Sequelize("carManagementSystem", "root", "Ln123456", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
exports.sequelize = sequelize;
exports.Sequelize = Sequelize;

async function main() {
  // 定义user表的model
  const User = require("./user").User;
  // 检查数据库连接
  try {
    await sequelize.authenticate();
    console.log("数据库连接成功！");
  } catch (e) {
    console.error("数据库连接失败：", e);
  }
  // 检查是否有管理员账户,没有则创建
}
main();
