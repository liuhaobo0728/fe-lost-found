<template>
  <div class="header">
    <div class="fe-header">
      <el-row :gutter="0">
        <el-col :span="5">
          <city/>
        </el-col>
        <el-col :span="13">
          <user/>
        </el-col>
        <el-col :span="6">
          <header-nav/>
        </el-col>
      </el-row>
      <div class="title">
        <span class="title-name" @click="gohome">失物招领</span>
      </div>
    </div>
  </div>
</template>

<script>
import city from "./city.vue";
import user from "./user.vue";
import HeaderNav from "./nav.vue";
export default {
  name: "Header",
  components: {
    city,
    user,
    HeaderNav
  },
  props: {
    msg: String
  },
  methods: {
    gohome() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 150px;
}
.title {
  padding-top: 40px;
  width: 1190px;
  margin: 0 auto;
  height: 60px;
  border-bottom: 1px solid #ccc;
  .title-name {
    cursor: pointer;
    font-size: 36px;
  }
}
.fe-header {
  height: 40px;
  width: 100%;
  background-color: #f8f8f8;
  .el-row {
    width: 1190px;
    margin: 0 auto;
    z-index: 999;
    height: 40px;
    line-height: 40px;
  }
}
</style>
