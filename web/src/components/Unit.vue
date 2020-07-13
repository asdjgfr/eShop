<template>
  <el-autocomplete
    :value="unit"
    placeholder="请输入单位"
    :fetch-suggestions="queryInfo"
    @input="handleInput"
  />
</template>

<script>
import api from "@/api";

export default {
  name: "Unit",
  props: ["unit"],
  methods: {
    async queryInfo(q, cb) {
      const res = await api.inventoryManagement.queryInventoryAttrs({
        attributes: "unit",
        q: q.trim()
      });
      cb(
        (res?.data ?? []).map(value => ({
          value
        }))
      );
    },
    handleInput(val) {
      this.$emit("update:unit", val);
    }
  }
};
</script>

<style scoped></style>
