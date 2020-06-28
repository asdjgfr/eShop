<template>
  <div class="footer">版本：{{ version }}</div>
</template>

<script>
const { version } = require("@/conf/config.json");
export default {
  name: "AppFooter",
  data() {
    return { version };
  }
};
</script>
<style lang="scss" src="../css/footer.scss"></style>
