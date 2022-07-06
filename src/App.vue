<script setup lang="ts">
import { RouterView } from "vue-router";
import { useTitle } from "@vueuse/core";

useTitle(import.meta.env.VITE_APP_TITLE);
</script>

<template>
  <header>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <el-button>I am ElButton</el-button>
    <button class="btn">Button</button>
  </header>

  <RouterView />
</template>
