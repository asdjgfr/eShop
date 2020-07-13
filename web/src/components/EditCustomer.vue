<template>
  <el-dialog title="编辑客户信息" :visible="visible">
    <el-form ref="form" :model="form" :label-width="labelWidth">
      <el-form-item label="车牌号" prop="numberPlate">
        <el-input v-model="form.numberPlate" />
      </el-form-item>
      <el-form-item label="车主姓名" prop="ownerName">
        <el-input v-model="form.ownerName" />
      </el-form-item>
      <el-form-item label="车主手机" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="VIN" prop="VIN">
        <el-input v-model="form.VIN" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose" :loading="loading">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        保存修改
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import api from "@/api";

export default {
  name: "EditCustomer",
  inject: ["labelWidth"],
  props: ["visible", "formData", "updateTableData"],
  data() {
    return {
      form: {
        numberPlate: "",
        ownerName: "",
        phone: "",
        VIN: "",
        car: "",
        mileage: ""
      },
      loading: false
    };
  },
  watch: {
    visible(val) {
      if (val) {
        const { formData } = this;
        Object.keys(formData).forEach(key => {
          this.$set(this.form, key, formData[key]);
        });
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
    },
    async handleSubmit() {
      this.loading = true;
      const { formData, form } = this;
      const res = await api.customerReception.createCarInfo(form);
      if (res.code === 0) {
        this.loading = false;
        this.updateTableData(formData, form);
        this.$message.success(res.msg);
      }
      this.handleClose();
    }
  }
};
</script>

<style scoped></style>
