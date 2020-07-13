<template>
  <el-autocomplete
    :value="name"
    placeholder="请输入配件名称"
    :fetch-suggestions="queryInfo"
    @input="handleInput"
  />
</template>

<script>
import api from "@/api";

export default {
  name: "AccessoriesName",
  props: ["name"],
  methods: {
    async queryInfo(q, cb) {
      const res = await api.inventoryManagement.queryInventoryAttrs({
        attributes: "name",
        q: q.trim()
      });
      cb(
        (res?.data ?? []).map(value => ({
          value
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
