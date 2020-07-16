<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item
      v-for="item in collapseItems"
      :key="item"
      :title="item"
      :name="item"
    >
      <general-settings v-if="item === '常规设置'" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import GeneralSettings from "./UserSettings/GeneralSettings";
export default {
  name: "UserSettings",
  components: { GeneralSettings },
  data() {
    return {
      collapseItems: ["常规设置"]
    };
  },
  computed: {
    activeNames: {
      get() {
        return [...this.collapseItems];
      },
      set() {}
    }
  }
};
</script>

<style scoped></style>
