<template>
  <router-view />
</template>

<script>
import Fingerprint2 from "fingerprintjs2";
import api from "@/api/index";
import { pickerOptions } from "@/lib/element";
import { mapMutations } from "vuex";
export default {
  name: "App",
  provide() {
    return {
      pickerOptions
    };
  },
  data() {
    return {
      currentRouterPath: ""
    };
  },
  computed: {
    userLogin() {
      return this.$store.state.user.login;
    }
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.checkLogin("跳转中，请稍后。。。");
      }
      if (to.path === "/login") {
        localStorage.removeItem("session");
      }
    }
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    ...mapMutations("user", ["changeUsername"]),
    async checkLogin(text = "检查登录状态。。。") {
      if (this.$route.path === "/login") {
        return false;
      }
      window.globalLoading({
        text
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
        session: localStorage.getItem("session"),
        deviceID: localStorage.getItem("deviceID")
      });
      this["changeUsername"](res.username);
      if (res.code !== 0) {
        localStorage.removeItem("session");
      }
      if (res.code !== 0 && this.$route.path !== "/login") {
        await this.$router.push({
          path: "/login",
          query: { from: this.$route.path }
        });
      }
    }
  }
};
</script>
<style lang="scss" src="./css/main.scss"></style>
<style lang="scss" src="./css/form.scss"></style>
