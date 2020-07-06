/**
 * session池
 * username 用户名
 * device 设备信息
 * ip 登陆ip
 * */
const sessionPool = [];
if (process.env.NODE_ENV === "development") {
  sessionPool.push({
    session: "test",
    deviceID: "test",
  });
}
exports.sessionPool = sessionPool;
