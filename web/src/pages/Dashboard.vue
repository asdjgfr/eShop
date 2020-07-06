<template>
  <el-container>
    <el-header>
      <app-bar :title="activeRoute.title" />
    </el-header>
    <el-container class="dashboard-container">
      <el-aside class="dashboard-aside" :width="`${drawer ? 65 : 240}px`">
        <el-button
          class="dashboard-aside-button"
          @click="handleToggleDrawer"
          :title="drawer ? '展开菜单' : '收起菜单'"
          :icon="drawer ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"
        />
        <navigation :dashboardRoutes="dashboardRoutes" :drawer="drawer" />
      </el-aside>
      <el-main>
        <transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
          mode="out-in"
        >
          <router-view v-if="routerAlive"></router-view>
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
const { labelWidth, limit } = require("@/conf/config.json");
export default {
  name: "Dashboard",
  components: { Navigation, AppBar, AppFooter },
  provide() {
    return {
      reload: this.reload,
      labelWidth,
      limit
    };
  },
  data() {
    return {
      routerAlive: true,
      drawer: true,
      dashboardRoutes: routes
        .find(pRoute => pRoute.path === "/dashboard")
        .children.map(cRoute => ({
          title: cRoute.meta.title,
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
  },
  methods: {
    reload() {
      this.routerAlive = false;
      this.$nextTick(() => {
        this.routerAlive = true;
      });
    },
    handleToggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>

<style lang="scss" src="../css/dashboard.scss"></style>
