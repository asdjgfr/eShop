<template>
  <div class="h-screen flex justify-center items-center">
    <el-card class="w-6/12 min-w-fit max-w-2xl">
      <template #header>
        <div class="flex gap-5">
          <span>登录{{ appName }}</span>
          <el-link type="primary">没有账号？去注册 →</el-link>
        </div>
      </template>
      <el-form :model="form">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" type="text" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { signInWidthEmail } from "@/services/account";

const appName = import.meta.env.VITE_APP_TITLE;

const form = reactive({
  email: "",
  password: "",
});

async function onSubmit() {
  const res = await signInWidthEmail(form.email, form.password);
  console.log(res);
}
</script>

<style scoped lang="scss"></style>
