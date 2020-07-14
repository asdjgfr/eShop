const { bills, finance, inventory } = require("./dataBase");

exports.findOrCreateFinance = async function (month, newRemarks = "") {
  let count = 0,
    income = 0,
    materialCost = 0,
    grossProfit = 0,
    remarks = newRemarks;
  const queryMonth = new Date(month);
  const filterBills = await bills.findAll({
    where: {
      finished: true,
      updatedAt: {
        $gte: new Date(queryMonth.getFullYear(), queryMonth.getMonth(), 1),
        $lt: new Date(queryMonth.getFullYear(), queryMonth.getMonth() + 1, 1),
      },
    },
  });
  yellowLog(filterBills);
  for (const item of filterBills) {
    for (const inv of item.maintenanceItems) {
      const findInv = await inventory.findByPk(inv.id);
      console.log(findInv);
    }
  }
  filterBills.forEach((item) => {});
  // const [data, created] = await finance.findOrCreate({
  //   where: {
  //     month,
  //   },
  // });
  // if (!created && newRemarks) {
  //   data.remarks = newRemarks;
  // }
  return {
    code: 0,
    data: {
      count,
      income,
      materialCost,
      grossProfit,
      remarks,
    },
    // msg: created ? "未找到数据" : "查找成功",
  };
};
