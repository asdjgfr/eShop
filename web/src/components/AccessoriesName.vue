<template>
  <el-autocomplete
    :value="name"
    placeholder="请输入配件名称"
    :fetch-suggestions="queryInfo"
    @input="handleInput"
  ></el-autocomplete>
</template>

<script>
import api from "@/api";

export default {
  name: "AccessoriesName",
  props: ["name"],
  methods: {
    async queryInfo(numberPlate, cb) {
      const res = await api.customerReception.queryCarInfo({ numberPlate });
      cb(
        (res?.data ?? []).map(item => ({
          value: item.numberPlate,
          item
        }))
      );
    },
    handleInput(val) {
      this.$emit("update:name", val);
    }
  }
};
</script>

<style scoped></style>
