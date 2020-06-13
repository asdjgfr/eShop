<template>
  <el-row class="app-bar">
    <el-col :span="12">
      <el-button
        type="default"
        icon="el-icon-menu"
        @click="handleChangeDrawer"
        style="margin-right: 10px"
      />
      <span v-text="title ? title : '4s店智能管理系统'" />
    </el-col>
    <el-col :span="12" style="text-align: right">
      <el-dropdown>
        <div>
          <el-avatar icon="el-icon-user-solid" />
          <span
            v-text="username"
            style="padding-left: 10px;margin-right: 10px"
          />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "AppBar",
  props: ["drawer", "title"],
  data() {
    return {
      username: localStorage.getItem("username")
    };
  },
  methods: {
    handleChangeDrawer() {
      this.$emit("update:drawer", !this.drawer);
    }
  },
  computed: {}
};
</script>

<style lang="scss" src="../css/app-bar.scss"></style>
