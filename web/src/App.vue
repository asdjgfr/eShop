<template>
  <div>
    <router-view></router-view>
    <v-snackbar v-model="toast" :timeout="3000" :top="true">
      {{ toastText }}
    </v-snackbar>
    <v-overlay :value="overlay" class="global-loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      <br />
      <div class="align-center" v-text="overlayText" />
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    overlay() {
      return this.$store.state.globalLoading;
    },
    overlayText() {
      return this.$store.state.globalLoadingText;
    },
    toast: {
      get() {
        return this.$store.state.globalToast;
      },
      set(show) {
        this.$store.commit("toggleGlobalToast", { show });
      }
    },
    toastText() {
      return this.$store.state.globalToastText;
    }
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      setTimeout(() => {
        this.$store.commit("toggleGlobalLoading", { show: false });
      }, 2000);
    }
  }
};
</script>
<style lang="scss" src="./css/main.scss"></style>
