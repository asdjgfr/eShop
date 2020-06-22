<template>
  <el-row class="app-bar">
    <el-col :span="12">
      <el-button
        type="default"
        icon="el-icon-menu"
        @click="handleChangeDrawer"
        style="margin-right: 10px"
      />
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
  props: ["drawer", "title"],
  data() {
    return {
      username: localStorage.getItem("username"),
      mainTitle: title
    };
  },
  methods: {
    handleChangeDrawer() {
      this.$emit("update:drawer", !this.drawer);
    },
    handleClickList(command) {
      switch (command) {
        case "logout":
          this.handleLogout();
          break;
      }
    },
    async handleLogout() {
      const session = sessionStorage.getItem("session");
      this.$loading({
        fullscreen: true,
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
        sessionStorage.removeItem("session");
        await this.$router.push("/login");
      }
      console.log(res);
    }
  },
  computed: {}
};
</script>

<style lang="scss" src="../css/app-bar.scss"></style>
