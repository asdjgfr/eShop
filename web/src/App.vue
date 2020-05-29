<template>
  <div>
    <router-view></router-view>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      overlay: true,
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      setTimeout(() => {
        this.overlay = false;
      }, 200);
    },
  },
};
</script>
<style lang="scss" src="./css/main.scss"></style>
