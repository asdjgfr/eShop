<template>
  <v-navigation-drawer :value="drawer" absolute temporary @input="handleChange">
    <v-list shaped dense>
      <v-subheader>用户名</v-subheader>
      <v-divider />
      <v-list-item-group :value="activeIndex" color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="item.path"
          @click="handleJump(item.path)"
          :disabled="i === activeIndex"
        >
          <v-list-item-icon>
            <v-icon dense v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { routes } from "../router/routes";
export default {
  name: "Navigation",
  props: ["drawer"],
  data() {
    return {
      items: routes
        .find((pRoute) => pRoute.path === "/dashboard")
        .children.map((cRoute) => ({
          title: cRoute.title,
          icon: cRoute.icon,
          path: `/dashboard/${cRoute.path}`,
        })),
    };
  },
  computed: {
    activeIndex() {
      const { path } = this.$route;
      return this.items.findIndex((r) => r.path === path);
    },
  },
  methods: {
    handleChange(bool) {
      this.$emit("update:drawer", bool);
    },
    handleJump(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped></style>
