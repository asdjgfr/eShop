const { bills, finance, inventory } = require("./dataBase");
const { add, multiply, divide, subtract } = require("../plugins/math");
const findOrCreateFinance = async function (
  month,
  newRemarks = "",
  session,
  deviceID
) {
  let count = 0,
    income = 0,
    materialCost = 0,
    grossProfit = 0,
    monthlyOrderAmount = 0,
    inventoryAmount = 0,
    remarks = newRemarks;
  const queryMonth = new Date(...month.split("-"));
  const filterBills = await bills.findAll({
    where: {
      finished: true,
      updatedAt: {
        $gte: new Date(queryMonth.getFullYear(), queryMonth.getMonth(), 1),
        $lt: new Date(queryMonth.getFullYear(), queryMonth.getMonth() + 1, 1),
      },
    },
  });
  for (const item of filterBills) {
    for (const inv of item.maintenanceItems) {
      const findInv = await inventory.findByPk(inv.id);
      income = add(
        income,
        multiply(
          multiply(findInv.sellingPrice, inv["count"]),
          divide(inv["discount"], 100)
        )
      );
      materialCost = add(
        materialCost,
        multiply(findInv.costPrice, inv["count"])
      );
    }
  }
  const allInventory = await inventory.findAll();
  for (const inv of allInventory) {
    inventoryAmount = add(inventoryAmount, multiply(inv.costPrice, inv.count));
  }
  count = filterBills.length;
  grossProfit = subtract(income, materialCost);
  const [data, created] = await finance.findOrCreate({
    where: {
      month: queryMonth,
    },
    defaults: { month: queryMonth, session, deviceID },
  });
  if (!created && newRemarks) {
    data.remarks = newRemarks;
  }
  monthlyOrderAmount = data.monthlyOrderAmount;
  return {
    code: 0,
    data: {
      count,
      income,
      materialCost,
      grossProfit,
      inventoryAmount,
      monthlyOrderAmount,
      remarks,
    },
    msg: "查找成功",
  };
};
exports.findOrCreateFinance = findOrCreateFinance;

exports.annualStatisticsFinance = async function (year, session, deviceID) {
  const data = Array.from({ length: 12 }, () => ({}));
  const monthIncome = Array.from({ length: 12 }, () => 0);
  const monthProfit = Array.from({ length: 12 }, () => 0);
  for (let i = 0; i < 12; i++) {
    data[i] = await findOrCreateFinance(
      `${year}-${i}-1`,
      "",
      session,
      deviceID
    );
  }
  for (let i = 0, len = data.length; i < len; i++) {
    monthIncome[i] = data[i].data.income;
    monthProfit[i] = data[i].data.grossProfit;
  }
  return {
    code: 0,
    data: {
      monthIncome,
      monthProfit,
    },
  };
};
