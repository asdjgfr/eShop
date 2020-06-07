<template>
  <div>
    <v-tabs>
      <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`">{{ i }}</v-tab>
      <v-tab-item v-for="i in tabs" :key="i" :value="'tab-' + i">
        <repair-work-order v-if="i === '维修单'" />
      </v-tab-item>
    </v-tabs>
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
