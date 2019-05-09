<template>
  <div></div>
</template>

<script>
export default {
  name: "activate",
  data() {
    return {
      userid: this.$store.getters.userid
    };
  },
  mounted() {
    this.$api.api.getcheckEmail(this.userid).then(res => {
      if (res.data.state === 0) {
        this.$notify({
          title: "激活成功",
          showClose: false,
          message: res.data.msg
        });
        this.$router.push({
          path: "/touser/info"
        });
      } else {
        this.$notify({
          title: "激活失败",
          showClose: false,
          message: res.data.msg
        });
      }
    });
  }
};
</script>

<style>
</style>
