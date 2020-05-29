<template>
  <div><span v-text="time"></span></div>
</template>

<script>
export default {
  name: "SystemBar",
  data() {
    return {
      time: "",
    };
  },
  mounted() {
    setInterval(() => {
      this.time = this.$_moment().format("YYYY MM DD, hh:mm:ss a");
    }, 1000);
  },
};
</script>

<style scoped>
div {
  width: 100%;
  text-align: center;
  user-select: none;
}
</style>
