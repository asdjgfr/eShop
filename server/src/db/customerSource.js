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
// 维修类型表
const repairType = sequelize["define"]("repairType", {
  repairType: {
    // 维修类型名称
    type: Sequelize.STRING,
    allowNull: false,
  },
});

exports.checkCustomerSource = async function () {
  // 同步数据库
  let res = {};
  try {
    await sequelize.sync();
    res = { code: 0, msg: "客户来源同步成功！" };
    console.log("客户来源表同步成功！");
  } catch (e) {
    res = { code: 1, msg: "客户来源同步失败！" };
    console.log("客户来源表同步失败：", e);
  }
  return res;
};

exports.createCustomerSource = async function (name) {
  // 新建客户来源
  const filterUsers = await tableFilter(customerSource, [
    "customerSource",
    name,
  ]);
  if (filterUsers.length) {
    return { code: 1, msg: "客户来源已存在！" };
  } else {
    await customerSource.create({
      name,
    });
    return { code: 0, msg: "新建客户来源成功！" };
  }
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
