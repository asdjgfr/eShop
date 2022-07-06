<script setup lang="ts">
import { RouterView } from "vue-router";
import { useTitle } from "@vueuse/core";

useTitle(import.meta.env.VITE_APP_TITLE);
</script>

<template>
  <RouterView />
</template>
