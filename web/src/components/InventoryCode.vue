<template>
  <el-autocomplete
    :value="code"
    placeholder="请输入配件代码"
    :fetch-suggestions="queryInfo"
    @input="handleInput"
  />
</template>

<script>
import api from "@/api";

export default {
  name: "Unit",
  props: ["code"],
  methods: {
    async queryInfo(q, cb) {
      const res = await api.inventoryManagement.queryInventoryAttrs({
        attributes: "code",
        q: q.trim()
      });
      cb(
        (res?.data ?? []).map(value => ({
          value
        }))
      );
    },
    handleInput(val) {
      this.$emit("update:code", val);
    }
  }
};
</script>

<style scoped></style>
