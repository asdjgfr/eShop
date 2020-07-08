<template>
  <el-autocomplete
    :value="type"
    placeholder="请输入配件种类"
    :fetch-suggestions="queryCarInfo"
    @input="handleInput"
  ></el-autocomplete>
</template>

<script>
import api from "@/api";

export default {
  name: "AccessoriesType",
  props: ["type"],
  methods: {
    async queryCarInfo(type, cb) {
      const res = await api.customerReception.queryCarInfo({ type });
      cb(
        (res?.data ?? []).map(item => ({
          value: item.numberPlate,
          item
        }))
      );
    },
    handleInput(val) {
      this.$emit("update:type", val);
    }
  }
};
</script>

<style scoped></style>
