<template>
  <el-card class="box-card">
    <div slot="header">
      <span>库存管理</span>
    </div>
    <el-form ref="form" :model="form" :label-width="labelWidth" :inline="true">
      <el-form-item label="供货商" prop="supplier">
        <supplier :supplier.sync="form.supplier" />
      </el-form-item>
      <el-form-item label="配件代码" prop="code">
        <el-input v-model="form.code" placeholder="请输配件代码" />
      </el-form-item>
      <el-form-item label="配件名称" prop="name">
        <accessories-name :name.sync="form.name" />
      </el-form-item>
      <el-form-item label="入库时间" prop="createdAtInterval">
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
      <el-form-item label="出库时间" prop="updatedAtInterval">
        <el-date-picker
          v-model="form.updatedAtInterval"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item label="配件种类" prop="type">
        <accessories-type :type.sync="form.type" />
      </el-form-item>
      <el-form-item label="配件数量" prop="counts">
        <el-input-number
          v-model="form.counts[0]"
          controls-position="right"
          :min="0"
        ></el-input-number>
        -
        <el-input-number
          v-model="form.counts[1]"
          controls-position="right"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <div class="form-inline-100 align-center">
        <el-form-item>
          <el-button type="primary" @click="queryCarInfo">查询</el-button>
          <el-button type="danger" @click="resetForm">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-table :data="tableData">
      <el-table-column
        v-for="(item, i) in headers"
        :key="i"
        :prop="item.value"
        :label="item.text"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEditItem(scope.row.$index)">
            编辑
          </el-button>
          <el-button
            type="danger"
            @click="handleRemoveItem(scope.row.id, scope.row.$index)"
          >
            移除
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
  </el-card>
</template>

<script>
import api from "@/api";

import Supplier from "@/components/Supplier";
import AccessoriesName from "@/components/AccessoriesName";
import AccessoriesType from "@/components/AccessoriesType";
export default {
  name: "InventoryManagement",
  inject: ["labelWidth", "limit"],
  components: { Supplier, AccessoriesName, AccessoriesType },
  data() {
    return {
      form: {
        supplier: "",
        name: "",
        type: "",
        code: "",
        createdAtInterval: [],
        updatedAtInterval: [],
        counts: [0, 0]
      },
      headers: [
        {
          text: "序号",
          value: "index"
        },
        { text: "车牌号", value: "numberPlate" },
        { text: "车主姓名", value: "ownerName" },
        { text: "车主手机", value: "phone" },
        { text: "VIN", value: "VIN" },
        { text: "行驶里程", value: "mileage" },
        { text: "车系", value: "car" }
      ],
      tableData: [],
      offset: 0,
      total: 0,
      editVisible: false,
      editIndex: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            start: new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)
          },
          {
            text: "最近一个月",
            start: new Date(new Date().getTime() - 3600 * 1000 * 24 * 30)
          },
          {
            text: "最近三个月",
            start: new Date(new Date().getTime() - 3600 * 1000 * 24 * 90)
          },
          {
            text: "最近六个月",
            start: new Date(new Date().getTime() - 3600 * 1000 * 24 * 180)
          },
          {
            text: "最近一年",
            start: new Date(new Date().getTime() - 3600 * 1000 * 24 * 365)
          },
          {
            text: "一年以上",
            start: new Date(1970, 1, 1),
            end: new Date(new Date().getTime() - 3600 * 1000 * 24 * 365)
          }
        ].map(item => ({
          text: item.text,
          onClick(picker) {
            picker.$emit("pick", [
              item.start,
              item["end"] ? item["end"] : new Date()
            ]);
          }
        }))
      }
    };
  },
  methods: {
    async handleRemoveItem(id, $index) {
      const res = await api.customerReception.delCarInfo({ id });
      if (res.code === 0) {
        this.tableData.splice($index, 1);
        this.$message.success(res.msg);
      }
    },
    handleEditItem(index) {
      this.editIndex = index;
      this.editVisible = true;
    },
    async queryCarInfo() {
      const res = await api.customerReception.queryCarInfo({
        limit: this.limit,
        offset: this.offset,
        ...this.form
      });
      if (res.code === 0) {
        const { offset } = this;
        this.total = res.length;
        this.tableData.splice(
          0,
          this.tableData.length,
          ...res.data.map((item, i) => ({
            ...item,
            index: offset + i + 1,
            $index: i
          }))
        );
      }
    },
    handleChangeOffset(offset) {
      this.offset = this.limit * (offset - 1);
      this.queryCarInfo();
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style scoped></style>
