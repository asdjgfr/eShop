<template>
  <router-view />
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
    userLogin() {
      return this.$store.state.user.login;
    }
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      const loading = this.$loading({
        fullscreen: true,
        lock: true,
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
      loading.close();
    }
  }
};
</script>
<style lang="scss" src="./css/main.scss"></style>
