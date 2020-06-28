<template>
  <el-container>
    <el-header>
      <app-bar :drawer.sync="drawer" :title="activeRoute.title" />
    </el-header>
    <el-container class="dashboard-container">
      <el-aside class="dashboard-aside" :width="`${drawer ? 65 : 240}px`">
        <navigation :dashboardRoutes="dashboardRoutes" :drawer="drawer" />
      </el-aside>
      <el-main>
        <transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
          mode="out-in"
        >
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
    <el-footer>
      <app-footer />
    </el-footer>
  </el-container>
</template>

<script>
import AppBar from "@/components/AppBar";
import Navigation from "@/components/Navigation";
import AppFooter from "@/components/AppFooter";
import { routes } from "@/router/routes";
export default {
  name: "Dashboard",
  components: { Navigation, AppBar, AppFooter },
  data() {
    return {
      drawer: true,
      dashboardRoutes: routes
        .find(pRoute => pRoute.path === "/dashboard")
        .children.map(cRoute => ({
          title: cRoute.title,
          icon: cRoute.icon,
          path: `/dashboard/${cRoute.path}`
        }))
    };
  },
  computed: {
    activeRoute() {
      const { path } = this.$route;
      return this.dashboardRoutes.find(r => r.path === path) ?? {};
    }
  },
  watch: {
    drawer(val) {
      localStorage.setItem("drawer", val);
    }
  },
  mounted() {
    this.$nextTick(() => {
      const drawer = localStorage.getItem("drawer") ?? true;
      this.drawer = drawer === "true";
    });
  }
};
</script>

<style lang="scss" src="../css/dashboard.scss"></style>
