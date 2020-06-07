<template>
  <v-app-bar app color="#1867c0" elevate-on-scroll dense dark>
    <v-app-bar-nav-icon @click="handleShowDrawer" />
    <v-toolbar-title>{{ title }}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { routes } from "@/router/routes";
export default {
  name: "AppBar",
  props: ["drawer"],
  data() {
    return {
      items: [
        {
          text: "Dashboard",
          disabled: false,
          href: "breadcrumbs_dashboard"
        },
        {
          text: "Link 1",
          disabled: false,
          href: "breadcrumbs_link_1"
        },
        {
          text: "Link 2",
          disabled: true,
          href: "breadcrumbs_link_2"
        }
      ]
    };
  },
  methods: {
    handleShowDrawer() {
      this.$emit("update:drawer", true);
    }
  },
  computed: {
    title() {
      const { path } = this.$route;
      const currentPath = path.replace(/\/dashboard\//, "");

      return (
        routes
          .find(r => r.path === "/dashboard")
          ?.children?.find(r => r.path === currentPath).title ??
        "4s店智能管理系统"
      );
    }
  }
};
</script>

<style scoped></style>
