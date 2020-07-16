<template>
  <el-dialog title="洗澡能库存" :visible.sync="visible">
    <el-form :model="form" :label-width="labelWidth">
      <el-form-item label="活动名称">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="success" @click="handleAdd">
        保存并添加下一个
      </el-button>
      <el-button type="primary" @click="handleAdd">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "AddInventoryDialog",
  inject: ["labelWidth"],
  props: ["visible"],
  data() {
    return {
      form: {}
    };
  },
  methods: {
    handleCancel() {
      this.$emit("update:visible", false);
    },
    handleAdd() {}
  }
};
</script>

<style scoped></style>
