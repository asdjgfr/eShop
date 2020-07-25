exports.checkLogin = function (session, deviceID) {
  const { sessionPool } = require("./sessionPool");
  return sessionPool.find(
    (s) => s.session === session && s.deviceID === deviceID
  );
};
