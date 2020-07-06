<script>
export default {
  name: "Navigation",
  props: ["drawer", "dashboardRoutes"],
  computed: {
    routePath() {
      return this.$route.path;
    }
  },
  render() {
    return (
      <el-menu
        default-active={this.routePath}
        onSelect={this.handleSelect}
        collapse={this.drawer}
      >
        {this.dashboardRoutes.map(item => {
          if (item.children && item.children.length) {
            return (
              <el-submenu index={item.path}>
                <template slot="title">
                  <i class={item.icon} />
                  <span>{item.title}</span>
                </template>
                {item.children.map(sub => (
                  <el-menu-item index={sub.path} title={sub.title}>
                    {sub.title}
                  </el-menu-item>
                ))}
              </el-submenu>
            );
          } else {
            return (
              <el-menu-item
                index={item.path}
                title={item.title}
                class="text-overflow"
              >
                <i class={item.icon} />
                <span slot="title">{item.title}</span>
              </el-menu-item>
            );
          }
        })}
      </el-menu>
    );
  },
  methods: {
    handleSelect(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    }
  }
};
</script>

<style scoped></style>
