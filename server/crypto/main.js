const crypto = require("crypto");

const secret = "e3991f4f-b275-47a2-8b06-4a8e32f75901";
exports.cryptoPassword = function () {
  return crypto
    .createHmac("sha256", secret)
    .update("8643b931-d18a-4149-a520-368fcf20d6b9")
    .digest("hex");
};
