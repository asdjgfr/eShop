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
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import AppBar from "@/components/AppBar";
import Navigation from "@/components/Navigation";
import { routes } from "@/router/routes";
export default {
  name: "Dashboard",
  components: { Navigation, AppBar },
  data() {
    return {
      drawer: false,
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
  }
};
</script>

<style lang="scss" src="../css/dashboard.scss"></style>
