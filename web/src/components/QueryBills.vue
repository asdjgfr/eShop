<template>
  <el-card class="box-card">
    <div slot="header">
      <span>维修管理</span>
    </div>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="工单状态">
        <el-select v-model="form.finished" placeholder="选择工单状态">
          <el-option
            v-for="item in billTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="起止日期">
        <el-date-picker
          v-model="form.createdAtInterval"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="车牌号">
        <el-input
          v-model="form.numberPlate"
          placeholder="请输入车牌号"
        ></el-input>
      </el-form-item>
      <el-form-item label="VIN">
        <el-input v-model="form.VIN" placeholder="请输入VIN"></el-input>
      </el-form-item>
      <el-form-item label="工单号">
        <el-input v-model="form.order" placeholder="请输入工单号"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data="tableData">
      <el-table-column
        v-for="(item, i) in headers"
        :key="i"
        :prop="item.value"
        :label="item.text"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text">
            编辑
          </el-button>
          <el-button type="text" @click="handleRemove(scope)">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="1000" :page-size="20" />
  </el-card>
</template>

<script>
export default {
  name: "QueryBills",
  data() {
    return {
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
        order: ""
      }
    };
  },
  methods: {
    handleRemove() {}
  }
};
</script>

<style scoped></style>
