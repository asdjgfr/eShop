<template>
  <el-dialog title="维修项目" :visible="addRepairVisible" @close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" :label-width="labelWidth">
      <el-form-item label="配件代码" prop="id">
        <el-autocomplete
          v-model="form.code"
          :fetch-suggestions="getCode"
          placeholder="搜索配件代码"
          :loading="codeLoading"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="配件名称" prop="id">
        <el-autocomplete
          v-model="form.name"
          :fetch-suggestions="getName"
          placeholder="搜索配件名称"
          :loading="nameLoading"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="单价">
        <span v-text="form.sellingPrice" /> 元
      </el-form-item>
      <el-form-item label="数量" prop="count">
        <el-input-number
          v-model="form.count"
          :precision="0"
          :step="1"
          :min="1"
          :max="form.maxCount"
          @change="handleChangeNumber('count')"
        />
        &emsp; 剩余个数：{{ form.maxCount }}
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
          :max="form.sellingPrice * form.count"
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
import api from "@/api";
export default {
  name: "createRepairDialog",
  props: [
    "addRepairVisible",
    "labelWidth",
    "desserts",
    "notIn",
    "handleSaveBill"
  ],
  data() {
    return {
      canSubmit: false,
      options: [],
      nameLoading: false,
      codeLoading: false,
      form: {
        id: "",
        name: "",
        code: "",
        sellingPrice: 0,
        count: 1,
        discount: 100,
        maxCount: 0,
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
    },
    "form.id"() {
      this.handleChangeNumber("count");
    }
  },
  methods: {
    handleSelect(item) {
      this.handleChangeRes(item.id);
    },
    handleChangeRes(id) {
      const { form, options } = this;
      const op = options.find(op => op.id === id);
      this.$set(form, "sellingPrice", op.sellingPrice);
      this.$set(form, "maxCount", op.count);
      this.$set(form, "name", op.name);
      this.$set(form, "code", op.code);
    },
    async queryData(query, type) {
      let result = [];
      if (query !== "") {
        this[`${type}Loading`] = true;
        const res = await api.inventoryManagement.queryInventoryAttrs({
          attributes: type,
          query,
          notIn: this.notIn
        });
        if (res.code === 0) {
          this.options = res.data;
          result = res.data.map(data => ({ ...data, value: data[type] }));
        }
        this[`${type}Loading`] = false;
      } else {
        this.options = [];
      }
      return result;
    },
    async getCode(query, cb) {
      const res = await this.queryData(query, "code");
      cb(res);
    },
    async getName(query, cb) {
      const res = await this.queryData(query, "name");
      cb(res);
    },
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
      this.handleSaveBill();
    },
    handleChangeNumber(type) {
      const { form } = this;
      const { count, sellingPrice, discount, price } = form;
      switch (type) {
        case "count":
        case "discount":
          // 修改数量和修改折扣是一样的
          this.$set(
            form,
            "price",
            this.$_math.format(count * sellingPrice * (discount / 100), {
              notation: "fixed",
              precision: 2
            })
          );
          break;
        case "price":
          this.$set(
            form,
            "discount",
            this.$_math.format((price / (count * sellingPrice)) * 100, {
              notation: "fixed",
              precision: 2
            })
          );
          break;
      }
    },
    reset() {
      let obj = {
        id: "",
        sellingPrice: 0,
        count: 1,
        discount: 100,
        price: 0
      };
      for (let key in obj) {
        this.$set(this.form, key, obj[key]);
      }
      this.options.splice(0, this.options.length);
    }
  }
};
</script>

<style scoped></style>
