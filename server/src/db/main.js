const { initDB } = require("./dataBase");

exports.main = async function () {
  await initDB();
  // 检查是否有管理员账户,没有则创建
  await initSystem();
};
async function initSystem() {
  const checkAdminAndCreate = await require("./user").checkAdminAndCreate();
  return {
    checkAdminAndCreate,
  };
}
