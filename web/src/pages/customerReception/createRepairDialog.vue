<template>
  <el-dialog title="收货地址" :visible="addRepairVisible">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-width="labelWidth"
      size="small"
    >
      <el-form-item label="配件代码" prop="code">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item label="配件名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="单价">
        <span v-text="form.unitPrice" /> 元
      </el-form-item>
      <el-form-item label="数量" prop="count">
        <el-input-number
          v-model="form.count"
          :precision="0"
          :step="1"
          :min="1"
          @change="handleChangeNumber('count')"
        />
      </el-form-item>
      <el-form-item label="折扣（%）" prop="discount">
        <el-input-number
          v-model="form.discount"
          :precision="2"
          :step="1"
          :min="0"
          :max="100"
          @change="handleChangeNumber('discount')"
        />
      </el-form-item>
      <el-form-item label="金额">
        <el-input-number
          v-model="form.price"
          :step="1"
          :min="0"
          :max="form.unitPrice * form.count"
          @change="handleChangeNumber('price')"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="success" @click="handleAddNew" :disabled="!canSubmit">
        保存并添加下一个
      </el-button>
      <el-button type="primary" @click="handleSubmit" :disabled="!canSubmit">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "createRepairDialog",
  props: ["addRepairVisible", "labelWidth", "desserts"],
  data() {
    return {
      canSubmit: false,
      form: {
        code: "",
        name: "",
        unitPrice: 0,
        count: 1,
        discount: 100,
        price: 0
      },
      rules: {
        name: [{ required: true, message: "请输入配件名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入配件代码", trigger: "blur" }],
        count: [{ required: true, message: "请输入数量", trigger: "blur" }],
        discount: [{ required: true, message: "请输入折扣", trigger: "blur" }]
      }
    };
  },
  watch: {
    form: {
      handler() {
        if (this.$refs.form !== undefined) {
          this.$refs.form.validate(valid => {
            this.canSubmit = !!valid;
          });
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleClose() {
      this.$emit("update:addRepairVisible", false);
      this.reset();
    },
    handleSubmit() {
      this.handleAddNew();
      this.handleClose();
    },
    handleAddNew() {
      this.desserts.push({
        ...this.form,
        name: this.form.name.trim(),
        code: this.form.code.trim()
      });
      this.reset();
    },
    handleChangeNumber(type) {
      const { form } = this;
      const { count, unitPrice, discount, price } = form;
      switch (type) {
        case "count":
        case "discount":
          // 修改数量和修改折扣是一样的
          this.$set(
            form,
            "price",
            this.$_math.format(count * unitPrice * (discount / 100), {
              notation: "fixed",
              precision: 2
            })
          );
          break;
        case "price":
          this.$set(
            form,
            "discount",
            this.$_math.format((price / (count * unitPrice)) * 100, {
              notation: "fixed",
              precision: 2
            })
          );
          break;
      }
    },
    reset() {
      let obj = {
        code: "",
        name: "",
        unitPrice: 0,
        count: 1,
        discount: 100,
        price: 0
      };
      for (let key in obj) {
        this.$set(this.form, key, obj[key]);
      }
    }
  }
};
</script>

<style scoped></style>
