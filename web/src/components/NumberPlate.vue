<template>
  <el-autocomplete
    :value="numberPlate"
    placeholder="请输入车牌号"
    :fetch-suggestions="queryCarInfo"
    @select="handleSelectNumberPlate ? handleSelectNumberPlate($event) : void 0"
    @input="handleInput"
  ></el-autocomplete>
</template>

<script>
import api from "@/api";

export default {
  name: "NumberPlate",
  props: ["numberPlate", "handleSelectNumberPlate"],
  methods: {
    async queryCarInfo(numberPlate, cb) {
      const res = await api.customerReception.queryCarInfo({ numberPlate });
      cb(
        (res?.data ?? []).map(item => ({
          value: item.numberPlate,
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
