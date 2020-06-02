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
import Fingerprint2 from "fingerprintjs2";
import api from "@/api/index";
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
    },
    userLogin() {
      return this.$store.state.user.login;
    }
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      this.$store.commit("toggleGlobalLoading", {
        show: true,
        text: "检查登录状态。。。"
      });
      if (localStorage.getItem("deviceID") == null) {
        const components = await Fingerprint2.getPromise();
        const deviceID = await Fingerprint2.x64hash128(
          components
            .map(function(component) {
              return component.value;
            })
            .join(""),
          31
        );
        localStorage.setItem("deviceID", deviceID);
      }
      const res = await api.user.checkLogin({
        session: sessionStorage.getItem("session"),
        deviceID: localStorage.getItem("deviceID")
      });

      if (res.code !== 0 && this.$route.path !== "/login") {
        await this.$router.push("/login");
      }
      this.$store.commit("toggleGlobalLoading", { show: false });
    }
  }
};
</script>
<style lang="scss" src="./css/main.scss"></style>
