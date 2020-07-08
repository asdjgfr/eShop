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
    async querySupplierInfo(supplier, cb) {
      const res = await api.customerReception.queryCarInfo({ supplier });
      cb(
        (res?.data ?? []).map(item => ({
          value: item.supplier,
          item
        }))
      );
    },
    handleInput(val) {
      this.$emit("update:numberPlate", val);
    }
  }
};
</script>

<style scoped></style>
