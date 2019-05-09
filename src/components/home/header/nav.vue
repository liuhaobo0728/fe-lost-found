<template>
  <div class="fe-header-nav">
    <ul class="nav-list">
      <li @click="gouser">个人中心</li>
      <li @click="gosend">发布物品</li>
      <li @click="goabout">关于我们</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "fe-header-nav",
  methods: {
    gouser() {
      if (this.$store.getters.token) {
        this.$router.push({ path: "/home/center" });
      } else {
        this.$notify({
          title: "失败",
          showClose: false,
          message: "请先登录"
        });
      }
    },
    gosend() {
      if (this.$store.getters.token) {
        this.$router.push({ path: "/home/send" });
      } else {
        this.$notify({
          title: "失败",
          showClose: false,
          message: "请先登录"
        });
      }
    },
    goabout() {
      this.$router.push({ path: "/about" });
    }
  }
};
</script>

<style lang="scss">
.fe-header-nav {
  .nav-list {
    li {
      margin-right: 30px;
      float: left;
      cursor: pointer;
      &:hover {
        color: rgb(17, 118, 233);
      }
    }
  }
}
</style>
