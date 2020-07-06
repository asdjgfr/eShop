<template>
  <el-card class="box-card">
    <div slot="header">
      <span>维修管理</span>
    </div>
    <el-form :inline="true" :rules="rules" :model="form" ref="form">
      <el-form-item label="工单状态" prop="finished">
        <el-select v-model="form.finished" placeholder="选择工单状态">
          <el-option
            v-for="item in billTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="起止日期" prop="createdAtInterval">
        <el-date-picker
          v-model="form.createdAtInterval"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item label="车牌号" prop="numberPlate">
        <number-plate :numberPlate.sync="form.numberPlate" />
      </el-form-item>
      <el-form-item label="VIN" prop="VIN">
        <el-input v-model="form.VIN" placeholder="请输入VIN" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="form.phone"
          placeholder="请输入车主手机"
          maxlength="11"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="工单号" prop="order">
        <el-input v-model="form.order" placeholder="请输入工单号" />
      </el-form-item>
      <div class="form-inline-100 align-center">
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button type="danger" @click="resetForm">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-table :data="tableData" v-loading="tableLoading">
      <el-table-column
        v-for="(item, i) in headers"
        :key="i"
        :prop="item.value"
        :label="item.text"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row.id)">
            编辑
          </el-button>
          <el-button
            type="danger"
            @click="handleRemove(scope.row.id, scope.$index)"
          >
            删除工单
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next,total"
      :total="total"
      :page-size="limit"
      @current-change="handleChangeOffset"
    />
    <el-divider content-position="left">合计</el-divider>
    <el-row :gutter="20">
      <el-col :span="23" :offset="1">
        筛选结果总金额：<span v-text="filterTotalPrice" />&nbsp;元
        <br />
        大写：<span v-text="filterTotalPriceCN" />
      </el-col>
      <el-col :span="23" :offset="1">
        全部订单总金额：<span v-text="totalPrice" />&nbsp;元 <br />大写：<span
          v-text="totalPriceCN"
        />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import api from "@/api";
import NumberPlate from "@/components/NumberPlate";

export default {
  name: "QueryBills",
  inject: ["reload", "limit"],
  components: { NumberPlate },
  props: ["numberPlate", "VIN", "phone", "autoQuery"],
  data() {
    return {
      id: "",
      offset: 0,
      total: 0,
      totalPrice: "0",
      totalPriceCN: "",
      filterTotalPrice: "0",
      filterTotalPriceCN: "",
      tableLoading: true,
      headers: [
        {
          text: "序号",
          value: "index"
        },
        { text: "工单状态", value: "finished" },
        { text: "创建日期", value: "createdAt" },
        { text: "工单号", value: "order" },
        { text: "车牌号", value: "numberPlate" },
        { text: "VIN", value: "VIN" },
        { text: "车系", value: "car" },
        { text: "应收金额", value: "receivable" },
        { text: "实收金额", value: "receipts" }
      ],
      tableData: [],
      billTypes: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "已完成",
          value: true
        },
        {
          label: "未完成",
          value: false
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      form: {
        finished: "",
        createdAtInterval: [],
        numberPlate: "",
        VIN: "",
        phone: "",
        order: ""
      },
      rules: {}
    };
  },
  created() {
    const { form } = this;
    const VIN = this.VIN ?? "";
    const numberPlate = this.numberPlate ?? "";
    const phone = this.phone ?? "";
    this.$set(form, "numberPlate", numberPlate);
    this.$set(form, "VIN", VIN);
    this.$set(form, "phone", phone);
    this.id = this.$route.query.id ?? "";
  },
  mounted() {
    this.$nextTick(() => {
      this.handleQuery();
    });
  },
  methods: {
    resetForm() {
      this.$refs.form.resetFields();
    },
    handleChangeOffset(offset) {
      this.offset = this.limit * (offset - 1);
      this.handleQuery();
    },
    async handleQuery() {
      const { form, offset } = this;
      this.tableLoading = true;
      const params = { limit: this.limit, offset: offset };
      Object.keys(this.form).forEach(key => {
        params[key] = form[key];
      });
      const res = await api.customerReception.queryBill(params);
      if (res.code === 0) {
        this.total = res.length;
        this.filterTotalPrice = res.filterTotalPrice.toLocaleString("en-US");
        this.filterTotalPriceCN = res.filterTotalPriceCN;
        this.totalPrice = res.totalPrice.toLocaleString("en-US");
        this.totalPriceCN = res.totalPriceCN;
        this.tableData.splice(
          0,
          this.tableData.length,
          ...res.data.map((item, i) => ({
            ...item,
            index: offset + i + 1,
            createdAt: this.$_localTime(item.createdAt),
            finished: item.finished ? "已完成" : "未完成"
          }))
        );
      }
      this.tableLoading = false;
    },
    async handleRemove(id, index) {
      const res = await api.customerReception.delBill({
        id
      });
      if (res.code === 0) {
        this.tableData.splice(index, 1);
        this.$message.success(res.msg);
      }
    },
    async handleEdit(ID) {
      const { id } = this;
      if (id === ID) {
        this.reload();
      } else {
        await this.$router.push({
          path: "/dashboard/customerreception",
          query: { id: ID }
        });
        this.$emit("update:drawerVisible", false);
      }
    }
  }
};
</script>

<style scoped></style>
