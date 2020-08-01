const {
  add,
  bignumber,
  multiply,
  divide,
  format,
  subtract,
} = require("mathjs");
// 加
exports.add = function (...numbers) {
  return Number(format(add(...numbers.map((num) => bignumber(num)))));
};
// 减
exports.subtract = function (x, y) {
  return Number(format(subtract(bignumber(x), bignumber(y))));
};
// 乘
exports.multiply = function (...numbers) {
  return Number(format(multiply(...numbers.map((num) => bignumber(num)))));
};
// 除
exports.divide = function (x, y) {
  return Number(format(divide(bignumber(x), bignumber(y))));
};
