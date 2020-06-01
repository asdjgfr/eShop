const { sequelize, Sequelize } = require("./main");
const { tableFilter } = require("../pubFn/db");
const User = sequelize["define"]("user", {
  // 属性
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAdmin: {
    // 是否拥有管理员权限，默认否
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
exports.User = User;

(async function () {
  // 同步数据库
  try {
    await sequelize.sync();
    console.log("user表同步成功！");
  } catch (e) {
    console.log("user表同步失败：", e);
  }
  const checkAdminRes = await checkAdminAndCreate();
  console.log(checkAdminRes);
})();

async function createUser(username, password, isAdmin = false) {
  const { cryptoPassword } = require("../crypto/main");
  const filterUsers = await tableFilter(User, ["username", username]);
  if (filterUsers.length) {
    return { code: 1, msg: "用户名已存在！" };
  } else {
    await User.create({
      username,
      password: cryptoPassword(password),
      isAdmin,
    });
    return { code: 0, msg: "新建成功！" };
  }
}

async function checkAdminAndCreate() {
  // 查看是否有admin用户，没有则新建
  const filterUsers = await tableFilter(User, ["isAdmin", true]);
  console.log(filterUsers);
  if (!filterUsers.length) {
    return createUser("admin", "123456", true);
  }
  return { code: 1, msg: "管理员已存在！" };
}

exports.userLogin = async function (username, password) {
  const filterUsers = await tableFilter(User, ["username", username]);
  if (password === filterUsers[0]?.["dataValues"]?.password ?? "") {
    return {
      code: 0,
      userInfo: { username, isAdmin: filterUsers[0].isAdmin },
      msg: "登录成功！",
    };
  } else if (filterUsers.length === 0) {
    return { code: 1, msg: "用户名不存在！" };
  } else {
    return { code: 2, msg: "密码错误！" };
  }
};
