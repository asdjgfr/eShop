const remove = require("lodash/remove");

exports.checkLogin = function (session, deviceID) {
  const { sessionPool } = require("./sessionPool");
  remove(sessionPool, (s) => s.session !== session && s.deviceID === deviceID);
  return !!sessionPool.find(
    (s) => s.session === session && s.deviceID === deviceID
  );
};
