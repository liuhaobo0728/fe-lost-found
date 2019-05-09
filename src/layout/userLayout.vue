<template>
  <div class="userlayout">
    <div class="user-header" @click="gohome">失物招领平台</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    gohome() {
      this.$router.push({
        path: "/home/mian"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.userlayout {
  background-color: #e6e4e4;
  width: 100%;
  height: 100%;
  .user-header {
    font-size: 26px;
    position: absolute;
    top: 20px;
    left: 100px;
  }
}
</style>
