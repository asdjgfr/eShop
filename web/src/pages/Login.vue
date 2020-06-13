<template>
  <div class="login">
    <video :src="videoSrc" autoplay muted loop></video>
    <el-card shadow="always" width="370">
      <div slot="header">
        <span>4S店管理系统</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin('ruleForm')">
            登陆
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名！", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码！", trigger: "blur" }]
      },
      videoSrc: require("@/assets/video_bg.mp4"),
      showPassword: false
    };
  },
  computed: {},
  mounted() {
    sessionStorage.removeItem("session");
    const username = localStorage.getItem("username") ?? "";
    const password = localStorage.getItem("password") ?? "";
    this.ruleForm.username = username;
    this.ruleForm.password = password;
  },
  methods: {
    handleLogin() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const { username, password } = this.ruleForm;
          this.$loading({
            fullscreen: true,
            text: "登陆中。。。"
          });
          const res = await api.user.login({
            username,
            password,
            // eslint-disable-next-line no-undef
            device: new Browser(),
            deviceID: localStorage.getItem("deviceID")
          });
          if (res.code === 0) {
            this.$message({
              type: "success",
              message: "登录成功！"
            });
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            sessionStorage.setItem("session", res.session);
            sessionStorage.setItem("isAdmin", res.isAdmin);
            await this.$router.push("/dashboard/customerreception");
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" src="../css/login.scss"></style>
