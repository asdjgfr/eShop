<template>
  <el-card class="box-card">
    <div slot="header">
      <span>客户管理</span>
    </div>
    <el-form
      ref="form"
      :model="form"
      :label-width="labelWidth"
      :inline="true"
      :rules="rules"
    >
      <el-form-item label="车牌号" prop="numberPlate">
        <number-plate :numberPlate.sync="form.numberPlate" />
      </el-form-item>
      <el-form-item label="车主姓名" prop="ownerName">
        <el-input v-model="form.ownerName" placeholder="请输入车主姓名" />
      </el-form-item>
      <el-form-item label="车主手机" prop="phone">
        <el-input
          v-model="form.phone"
          placeholder="请输入车主手机"
          maxlength="11"
          show-word-limit
        />
      </el-form-item>
      <vin :VIN.sync="form.VIN" />
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
    <edit-customer
      :visible.sync="editVisible"
      :formData="tableData[editIndex]"
      :updateTableData="updateTableData"
    />
  </el-card>
</template>

<script>
import NumberPlate from "@/components/NumberPlate";
import EditCustomer from "@/components/EditCustomer";
import Vin from "@/components/VIN";
import api from "@/api";
export default {
  name: "cCustomerManagement",
  inject: ["labelWidth", "limit"],
  components: { NumberPlate, EditCustomer, Vin },
  data() {
    return {
      form: {
        numberPlate: "",
        ownerName: "",
        phone: "",
        VIN: ""
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
      rules: {
        numberPlate: [
          { required: true, message: "请输入车牌号", trigger: "blur" }
        ],

        ownerName: [{ required: true, message: "车主姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入车主手机", trigger: "blur" }],
        VIN: [{ required: true, message: "请输入VIN", trigger: "blur" }]
      }
    };
  },
  created() {
    this.queryCarInfo();
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
    },
    updateTableData(oldForm, newForm) {
      Object.keys(newForm).forEach(key => {
        this.$set(oldForm, key, newForm[key]);
      });
    }
  }
};
</script>

<style scoped></style>
