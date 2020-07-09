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
    async queryCarInfo(q, cb) {
      const res = await api.inventoryManagement.queryInventoryAttrs({
        attributes: "type",
        q: q.trim()
      });
      cb(
        (res?.data ?? []).map(value => ({
          value
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
