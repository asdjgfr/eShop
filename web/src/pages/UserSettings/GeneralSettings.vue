<template>
  <el-form
    :rules="rules"
    ref="form"
    :model="form"
    :label-width="labelWidth"
    :style="{ maxWidth }"
    autocomplete="off"
  >
    <el-form-item label="用户名">
      {{ username }}
    </el-form-item>
    <el-form-item label="旧密码" prop="password">
      <el-input
        v-model="form.password"
        placeholder="请输入旧密码"
        autocomplete="off"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input
        v-model="form.newPassword"
        placeholder="请输入新密码"
        show-password
        maxlength="18"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input
        v-model="form.confirmPassword"
        placeholder="请再次输入新密码"
        show-password
        maxlength="18"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleChangeUserInfo"
        >保存修改</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import api from "@/api";
import { mapState } from "vuex";
export default {
  name: "GeneralSettings",
  inject: ["labelWidth"],
  props: ["maxWidth"],
  data() {
    return {
      form: {
        password: "",
        newPassword: "",
        confirmPassword: ""
      },
      rules: {
        password: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        confirmPassword: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码长度在 6 到 18 个字符",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.newPassword) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState("user", {
      username: state => state.username
    })
  },
  methods: {
    handleChangeUserInfo() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await api.user.changePassword({
            username: this.username,
            password: this.form.password,
            newPassword: this.form.newPassword
          });
          if (res.code === 0) {
            sessionStorage.removeItem("session");
            alert("密码修改成功，请重新登录！");
            await this.$router.push("/login");
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped></style>
