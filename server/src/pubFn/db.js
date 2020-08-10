const { finance } = require("../db/dataBase");
exports.tableFilter = function (model, params = []) {
  // 根据条件检测内容是否存在，默认为用户名
  const opt = {};
  let preKey = "";
  for (let i = 0, len = params.length; i < len; i++) {
    if (i % 2) {
      opt[preKey] = params[i];
    } else {
      preKey = params[i];
    }
  }
  return model.findAll({
    where: opt,
  });
};

exports.getNowFinance = async function (session, deviceID, m) {
  let queryMonth = null;
  if (m !== undefined) {
    queryMonth = new Date(...m.split("-"));
  } else {
    const d = new Date();
    queryMonth = new Date(d.getFullYear(), d.getMonth());
  }
  const [financeData, financeCreated] = await finance.findOrCreate({
    where: {
      month: queryMonth,
    },
    defaults: { month: queryMonth, session, deviceID },
  });
  return financeData;
};
