<template>
  <div
    class="not-found"
    title="点击返回上一级"
    :style="{ backgroundImage: `url('${bg}')` }"
    @click="handleBack"
  />
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      bg: require("@/assets/404.webp")
    };
  },
  methods: {
    handleBack() {
      this.$router.back();
    }
  }
};
</script>

<style scoped></style>
