<template>
  <v-app>
    <v-system-bar app>
      <system-bar />
    </v-system-bar>
    <app-bar :drawer.sync="drawer" />
    <navigation :drawer.sync="drawer" />
    <v-content>
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        mode="out-in"
      >
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import SystemBar from "../components/SystemBar";
import AppBar from "../components/AppBar";
import Navigation from "../components/Navigation";
export default {
  name: "Dashboard",
  components: { SystemBar, AppBar, Navigation },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style scoped></style>
