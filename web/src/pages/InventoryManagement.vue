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
          <el-button type="primary" @click="queryInventory">查询</el-button>
          <el-button type="danger" @click="resetForm">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-divider></el-divider>
    <el-button-group>
      <el-button type="primary">导出</el-button>
      <el-popover placement="top" v-model="importVisible">
        <div>
          <el-button type="primary" @click="importVisible = false"
            >下载模板</el-button
          >
          <el-button type="success" @click="importVisible = false"
            >批量导入</el-button
          >
        </div>
        <el-button type="primary" slot="reference">批量导入</el-button>
      </el-popover>
    </el-button-group>
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
import { pickerOptions } from "@/lib/element";
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
        { text: "供货商", value: "supplier" },
        { text: "配件种类", value: "type" },
        { text: "配件代码", value: "code" },
        { text: "配件名称", value: "name" },
        { text: "库存量", value: "count" },
        { text: "成本价", value: "costPrice" },
        { text: "成本金额", value: "totalCostPrice" },
        { text: "销售价", value: "sellingPrice" },
        { text: "最新进价", value: "lastPurchasePrice" },
        { text: "销售指导价", value: "guidePrice" },
        { text: "单位", value: "unit" },
        { text: "最小包装数", value: "minCount" },
        { text: "最新入库时间", value: "storageTime" },
        { text: "最新出库时间", value: "deliveryTime" }
      ],
      tableData: [],
      offset: 0,
      total: 0,
      importVisible: false,
      editVisible: false,
      editIndex: 0,
      pickerOptions
    };
  },
  mounted() {
    this.queryInventory();
  },
  methods: {
    async handleRemoveItem(id, $index) {
      const res = await api.inventoryManagement.delInventory({ id });
      if (res.code === 0) {
        this.tableData.splice($index, 1);
        this.$message.success(res.msg);
      }
    },
    handleEditItem(index) {
      this.editIndex = index;
      this.editVisible = true;
    },
    async queryInventory() {
      const res = await api.inventoryManagement.queryInventory({
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
            storageTime: this.$_localTime(item.storageTime),
            deliveryTime:
              item.deliveryTime === null
                ? "暂无"
                : this.$_localTime(item.deliveryTime),
            $index: i
          }))
        );
      }
    },
    handleChangeOffset(offset) {
      this.offset = this.limit * (offset - 1);
      this.queryInventory();
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style scoped></style>
