const crypto = require("crypto");
const { secret } = require("../config").config;
exports.cryptoPassword = function (password) {
  return crypto.createHmac("sha256", secret).update(password).digest("hex");
};
