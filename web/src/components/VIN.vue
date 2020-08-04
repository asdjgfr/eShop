<template>
  <el-form-item label="VIN" prop="VIN">
    <el-input
      :value="VIN"
      placeholder="请输入VIN"
      maxlength="17"
      show-word-limit
      @input="handleChangeVIN"
    />
  </el-form-item>
</template>

<script>
export default {
  name: "VIN",
  props: ["VIN"],
  data() {
    return {
      reg: /[^A-Z0-9]+/g
    };
  },
  methods: {
    handleChangeVIN(val) {
      val = val.toUpperCase().replace(this.reg, "");
      this.$emit("update:VIN", val);
    }
  }
};
</script>

<style scoped></style>
