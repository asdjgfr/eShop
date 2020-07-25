<template>
  <el-row class="app-bar">
    <el-col :span="12">
      <span v-text="title ? title : mainTitle" />
    </el-col>
    <el-col :span="12" style="text-align: right">
      <el-dropdown @command="handleClickList">
        <div>
          <el-avatar icon="el-icon-user-solid" />
          <span
            v-text="username"
            style="padding-left: 10px;margin-right: 10px"
          />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="user-settings">用户设置</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import api from "@/api";
const { title } = require("@/conf/config.json");
export default {
  name: "AppBar",
  props: ["title"],
  data() {
    return {
      username: localStorage.getItem("username"),
      mainTitle: title
    };
  },
  methods: {
    handleClickList(command) {
      switch (command) {
        case "logout":
          this.handleLogout();
          break;
        case "user-settings":
          this.$router.push("/user/settings");
          break;
      }
    },
    async handleLogout() {
      const session = localStorage.getItem("session");
      window.globalLoading({
        text: "注销中。。。"
      });
      const res = await api.user.logout({
        session
      });
      if (res.code === 0) {
        this.$message({
          type: "success",
          message: "注销成功！"
        });
        localStorage.removeItem("session");
        localStorage.setItem("autoLogin", "false");
        await this.$router.push({
          path: "/login",
          query: { from: this.$route.path }
        });
      }
    }
  },
  computed: {}
};
</script>

<style lang="scss" src="../css/app-bar.scss"></style>
