<template>
  <el-form
    :rules="rules"
    ref="form"
    :model="form"
    :label-width="labelWidth"
    :inline="true"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="form.password"
        placeholder="请输入密码"
        show-password
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "GeneralSettings",
  inject: ["labelWidth"],
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {}
    };
  }
};
</script>

<style scoped></style>
