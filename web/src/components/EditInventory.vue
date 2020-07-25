<template>
  <el-dialog title="编辑库存信息" :visible="visible">
    <el-form ref="form" :model="form" :label-width="labelWidth" :rules="rules">
      <el-form-item label="配件代码" prop="code">
        <inventory-code :code.sync="form.code" />
      </el-form-item>
      <el-form-item label="供货商" prop="supplier">
        <supplier :supplier.sync="form.supplier" />
      </el-form-item>
      <el-form-item label="配件种类" prop="type">
        <accessories-type :type.sync="form.type" />
      </el-form-item>
      <el-form-item label="配件名称" prop="name">
        <accessories-name :name.sync="form.name" />
      </el-form-item>
      <el-form-item label="库存量" prop="count">
        <el-input-number v-model="form.count" :precision="0" :min="0" />
      </el-form-item>
      <el-form-item label="成本价" prop="costPrice">
        <el-input-number v-model="form.costPrice" :precision="2" :min="0" />
      </el-form-item>
      <el-form-item label="销售价" prop="sellingPrice">
        <el-input-number v-model="form.sellingPrice" :precision="2" :min="0" />
      </el-form-item>
      <el-form-item label="销售指导价" prop="guidePrice">
        <el-input-number
          v-model="form.guidePrice"
          :precision="2"
          :min="0"
          :disabled="action === 'edit'"
        />
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <unit :unit.sync="form.unit" />
      </el-form-item>
      <el-form-item label="最小包装数" prop="minCount">
        <el-input-number v-model="form.minCount" :min="0" />
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
import Supplier from "@/components/Supplier";
import AccessoriesName from "@/components/AccessoriesName";
import AccessoriesType from "@/components/AccessoriesType";
import Unit from "@/components/Unit";
import InventoryCode from "@/components/InventoryCode";
export default {
  name: "EditCustomer",
  inject: ["labelWidth"],
  props: ["visible", "formData", "updateTableData", "action"],
  components: {
    Supplier,
    AccessoriesName,
    AccessoriesType,
    Unit,
    InventoryCode
  },
  data() {
    return {
      form: {
        id: "",
        supplier: "",
        type: "",
        code: "",
        name: "",
        count: "",
        costPrice: "",
        totalCostPrice: "",
        sellingPrice: "",
        guidePrice: "",
        unit: "无单位",
        minCount: 1
      },
      loading: false,
      rules: {
        code: [{ required: true, message: "请输入配件代码", trigger: "blur" }],
        supplier: [
          { required: true, message: "请输入供货商", trigger: "blur" }
        ],
        type: [{ required: true, message: "请输入配件种类", trigger: "blur" }],
        name: [{ required: true, message: "请输入配件名称", trigger: "blur" }],
        count: [{ required: true, message: "请输入库存量", trigger: "blur" }],
        costPrice: [
          { required: true, message: "请输入成本价", trigger: "blur" }
        ],
        sellingPrice: [
          { required: true, message: "请输入销售价", trigger: "blur" }
        ],
        unit: [{ required: true, message: "请输入单位", trigger: "blur" }],
        minCount: [
          { required: true, message: "请输入最小包装数", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    visible(val) {
      if (val && this.action === "edit") {
        const { formData, form } = this;
        Object.keys(form).forEach(key => {
          this.$set(form, key, formData[key]);
        });
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
    },
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;
          const { formData, form } = this;
          const data = this.$_.cloneDeep(form);
          const res = await api.inventoryManagement.saveInventory({
            ...data,
            action: this.action
          });
          if (res.code === 0) {
            this.loading = false;
            if (this.action === "edit") {
              this.updateTableData(formData, data);
            }
            this.$message.success(res.msg);
          }
          this.handleClose();
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped></style>
