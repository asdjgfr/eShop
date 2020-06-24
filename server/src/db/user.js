const uuidV1 = require("uuid").v1;
const { sequelize, Sequelize } = require("./main");
const { tableFilter } = require("../pubFn/db");
const { cryptoPassword } = require("../crypto/main");

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
  },
  // 是否是管理员
  isAdmin: {
    // 是否拥有管理员权限，默认否
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
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

async function createUser(username, password, isAdmin = false) {
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

exports.checkAdminAndCreate = async function () {
  // 同步数据库
  try {
    await sequelize.sync();
    console.log("user表同步成功！");
  } catch (e) {
    console.log("user表同步失败：", e);
  }
  // 查看是否有admin用户，没有则新建
  const filterUsers = await tableFilter(User, ["isAdmin", true]);
  if (!filterUsers.length) {
    await createUser("admin", "123456", true);
    return { code: 0, msg: "管理员新建成功！" };
  }
  return { code: 1, msg: "管理员已存在！" };
};

exports.userLogin = async function (
  username,
  password,
  device,
  deviceID,
  session,
  ip,
  realIP
) {
  const filterUsers = await tableFilter(User, ["username", username]);
  if (filterUsers.length === 0) {
    return { code: 1, msg: "用户名不存在！" };
  } else if (
    cryptoPassword(password) === filterUsers[0]["dataValues"].password
  ) {
    session = session || uuidV1();
    const { sessionPool } = require("../session/sessionPool");
    const index = sessionPool.findIndex(
      (s) => s.session === session && s.deviceID === deviceID
    );
    index > -1 && sessionPool.splice(index, 1);
    sessionPool.push({
      session,
      username,
      device,
      deviceID,
      ip,
      realIP,
    });
    await userLog(username, device, deviceID, ip, realIP, "登录系统");
    return {
      code: 0,
      userInfo: { username, isAdmin: filterUsers[0].isAdmin },
      msg: "登录成功！",
      session,
    };
  } else {
    return { code: 2, msg: "密码错误！" };
  }
};

async function userLog(username, device, deviceID, ip, realIP, action) {
  return await UserLog.create({
    username,
    device,
    deviceID,
    action,
    ip,
    realIP,
    loginTime: new Date().getTime().toString(),
  });
}

exports.userLogout = async function (session) {
  const { sessionPool } = require("../session/sessionPool");
  const index = sessionPool.findIndex((s) => s.session === session);
  if (index > -1) {
    const { username, device, deviceID, ip, realIP } = sessionPool[index];
    sessionPool.slice(index, 1);
    await userLog(username, device, deviceID, ip, realIP, "注销系统");
  }
  return {
    code: 0,
    msg: "注销成功！",
  };
};
