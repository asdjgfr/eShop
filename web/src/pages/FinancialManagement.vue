<template>
  <el-card class="box-card">
    <div slot="header">
      <span>财务管理</span>
    </div>
    <div>
      <el-date-picker
        v-model="form.dateInterval"
        type="datetimerange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      />
      &emsp;
      <el-button type="primary">查询</el-button>
      <el-divider content-position="left">月度经营数据</el-divider>
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
        dateInterval: [
          new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          new Date()
        ]
      }
    };
  }
};
</script>

<style scoped></style>
