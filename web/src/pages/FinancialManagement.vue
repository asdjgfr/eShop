<template>
  <el-card class="box-card">
    <div slot="header">
      <span>财务管理</span>
    </div>
    <div>
      <el-date-picker v-model="form.month" type="month" placeholder="选择月" />
      &emsp;
      <el-button type="primary">查询</el-button>
      <el-divider content-position="left">月度经营数据</el-divider>
      <div></div>
      <el-divider content-position="left">配件订购和库存</el-divider>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "FinancialManagement",
  inject: ["pickerOptions"],
  data() {
    return {
      form: {
        month: ""
      },
      count: 0,
      income: 0,
      materialCost: 0,
      grossProfit: 0,
      remarks: ""
    };
  }
};
</script>

<style scoped></style>
