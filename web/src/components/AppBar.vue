<template>
  <v-app-bar app color="#1867c0" elevate-on-scroll dense dark>
    <v-app-bar-nav-icon @click="handleShowDrawer" />
    <v-toolbar-title>标题</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  props: ["drawer"],
  data() {
    return {
      items: [
        {
          text: "Dashboard",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },
        {
          text: "Link 1",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
        {
          text: "Link 2",
          disabled: true,
          href: "breadcrumbs_link_2",
        },
      ],
    };
  },
  methods: {
    handleShowDrawer() {
      this.$emit("update:drawer", true);
    },
  },
};
</script>

<style scoped></style>
