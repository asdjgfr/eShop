<template>
  <div class="main-page"></div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      overlay: false,
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      this.$router.push("404");
    },
  },
};
</script>

<style scoped>
div {
  height: calc(100vh - 72px);
}
</style>
