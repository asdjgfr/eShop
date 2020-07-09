<template>
  <el-autocomplete
    :value="supplier"
    placeholder="请输入供货商"
    :fetch-suggestions="querySupplierInfo"
    @input="handleInput"
  ></el-autocomplete>
</template>

<script>
import api from "@/api";

export default {
  name: "Supplier",
  props: ["supplier"],
  methods: {
    async querySupplierInfo(q, cb) {
      const res = await api.inventoryManagement.queryInventoryAttrs({
        attributes: "supplier",
        q: q.trim()
      });
      cb(
        (res?.data ?? []).map(value => ({
          value
        }))
      );
    },
    handleInput(val) {
      this.$emit("update:supplier", val);
    }
  }
};
</script>

<style scoped></style>
