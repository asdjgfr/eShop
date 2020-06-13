<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane v-for="i in tabs" :key="i" :label="i">
        <repair-work-order v-if="i === '维修单'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RepairWorkOrder from "./customerReception/RepairWorkOrder";
export default {
  name: "CustomerReception",
  components: { RepairWorkOrder },
  data() {
    return {
      tabs: ["维修单"]
    };
  }
};
</script>

<style scoped></style>
