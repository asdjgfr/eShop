const crypto = require("crypto");
const { secret } = __config.config;
exports.cryptoPassword = function (password) {
  return crypto.createHmac("sha256", secret).update(password).digest("hex");
};
