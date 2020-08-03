<template>
  <el-card class="box-card">
    <div slot="header">
      <span>财务管理</span>
    </div>
    <div>
      <el-date-picker
        :clearable="false"
        v-model="form.month"
        type="month"
        placeholder="选择月"
        @change="handleQuery"
      />
      <el-divider>月度经营数据</el-divider>
      <br />
      <ul class="financial-items">
        <li>
          <h2 v-text="count" />
          进场台次
        </li>
        <li>
          <h2 v-text="income.toLocaleString('en-US')" />
          收入
        </li>
        <li>
          <h2 v-text="materialCost.toLocaleString('en-US')" />
          维修材料成本
        </li>
        <li>
          <h2 v-text="grossProfit.toLocaleString('en-US')" />
          毛利
        </li>
        <li>
          <h2
            v-text="
              (
                (isNaN(grossProfit / income) ? 0 : grossProfit / income) * 100
              ).toFixed(2) + ' %'
            "
          />
          毛利率
        </li>
      </ul>
      <br />
      <br />
      <el-divider>配件订购和库存</el-divider>
      <br />
      <ul class="financial-items">
        <li>
          <h2 v-text="monthlyOrderAmount.toLocaleString('en-US')" />
          月订购金额
        </li>
        <li>
          <h2 v-text="inventoryAmount.toLocaleString('en-US')" />
          库存金额
        </li>
      </ul>
      <br />
      <br />
      <el-divider>备注</el-divider>
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="form.remarks"
      >
      </el-input>
      <div class="align-center">
        <el-button-group>
          <el-button
            type="primary"
            icon="el-icon-upload"
            @click="handleSaveRemarks"
            >保存</el-button
          >
          <el-button
            type="danger"
            @click="form.remarks = ''"
            icon="el-icon-delete"
            >清空</el-button
          >
        </el-button-group>
      </div>
      <div class="financial-charts">
        <div ref="yearChart" class="financial-month-chart"></div>
      </div>
    </div>
  </el-card>
</template>

<script>
import api from "@/api";
export default {
  name: "FinancialManagement",
  inject: ["months"],
  data() {
    return {
      form: {
        month: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        remarks: ""
      },
      count: 0,
      income: 0,
      materialCost: 0,
      grossProfit: 0,
      monthlyOrderAmount: 0,
      inventoryAmount: 0,
      yearChart: null,
      yearChartOption: {
        title: {
          text: "年度统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["月产值", "月利润"]
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.months
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "月产值",
            type: "line",
            data: []
          },
          {
            name: "月利润",
            type: "line",
            data: []
          }
        ]
      }
    };
  },
  created() {
    this.handleQuery();
  },
  mounted() {
    this.$nextTick(() => {
      this.yearChart = this.$_echarts.init(this.$refs.yearChart);
      this.loadCharts();
    });
    window.addEventListener("resize", this.resizeCharts);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeCharts);
  },
  methods: {
    async handleSaveRemarks() {
      const date = this.$_moment(this.form.month)
        .format("YYYY-MM-DD")
        .split("-");
      const res = await api.finance.saveFinanceRemarks({
        month: `${date[0]}-${date[1] - 1}-1`,
        remarks: this.form.remarks
      });
      if (res.code === 0) {
        this.$message({
          type: "success",
          message: res.msg
        });
      }
    },
    async handleQuery() {
      const date = this.$_moment(this.form.month)
        .format("YYYY-MM-DD")
        .split("-");
      const res = await api.finance.findOrCreateFinance({
        month: `${date[0]}-${date[1] - 1}-1`
      });
      if (res.code === 0) {
        const { data } = res;
        this.count = data.count;
        this.income = data.income;
        this.materialCost = data.materialCost;
        this.grossProfit = data.grossProfit;
        this.monthlyOrderAmount = data.monthlyOrderAmount;
        this.inventoryAmount = data.inventoryAmount;
        this.$set(this.form, "remarks", data.remarks);
      }
    },
    async loadCharts() {
      const res = await api.finance.annualStatisticsFinance({
        year: new Date(this.form.month).getFullYear()
      });
      if (res.code === 0) {
        this.$set(
          this.yearChartOption.series[0],
          "data",
          res.data["monthIncome"]
        );
        this.$set(
          this.yearChartOption.series[1],
          "data",
          res.data["monthProfit"]
        );
      }
      this.yearChart.setOption(this.yearChartOption);
      this.resizeCharts();
    },
    resizeCharts() {
      this.yearChart.resize();
    }
  }
};
</script>

<style scoped></style>
