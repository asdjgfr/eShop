const { bills, finance, inventory } = require("./dataBase");
const { add, multiply, divide, subtract } = require("../plugins/math");
const findOrCreateFinance = async function (month, session, deviceID) {
  let count = 0,
    income = 0,
    materialCost = 0,
    grossProfit = 0,
    monthlyOrderAmount = 0,
    inventoryAmount = 0;
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
      if (findInv !== null) {
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
      remarks: data.remarks,
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

exports.saveFinanceRemarks = async function (params) {
  const { month, remarks } = params;
  const f = await finance.findOne({
    where: {
      month: new Date(...month.split("-")),
    },
  });
  if (f === null) {
    return {
      code: 1,
      msg: "未找到对应月份，保存备注失败！",
    };
  }
  f.remarks = remarks;
  await f.save();
  return {
    code: 0,
    msg: `${month}备注保存成功！`,
  };
};
