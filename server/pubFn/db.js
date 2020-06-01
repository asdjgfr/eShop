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
