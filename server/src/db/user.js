const uuidV1 = require("uuid").v1;
const { tableFilter } = require("../pubFn/db");
const { cryptoPassword } = require("../crypto/main");
const { User, UserLog } = require("./dataBase");

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
