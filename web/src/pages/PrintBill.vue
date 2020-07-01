<template>
  <div>打印工单{{ id }}</div>
</template>

<script>
import api from "@/api";

export default {
  name: "PrintBill",
  data() {
    return {
      id: "",
      printData: {}
    };
  },
  created() {
    this.initData(this.$route.query.id);
  },
  methods: {
    async initData(id) {
      window.globalLoading({
        text: "生成工单中，请稍后。。。",
        spinner: "el-icon-loading"
      });
      const res = await api.customerReception.queryBill({ id });
      if (res.code === 0) {
        this.printData = res.data;
      }
    }
  }
};
</script>

<style scoped></style>
