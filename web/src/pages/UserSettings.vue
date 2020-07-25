<template>
  <el-tabs tab-position="left" v-model="activeName">
    <el-tab-pane
      v-for="item in collapseItems"
      :key="item"
      :label="item"
      :name="item"
    >
      <general-settings v-if="item === '常规设置'" :maxWidth="maxWidth" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import GeneralSettings from "./UserSettings/GeneralSettings";
export default {
  name: "UserSettings",
  components: { GeneralSettings },
  data() {
    const collapseItems = ["常规设置"];
    return {
      collapseItems,
      activeName: collapseItems[0],
      maxWidth: "350px"
    };
  },
  computed: {}
};
</script>

<style scoped></style>
