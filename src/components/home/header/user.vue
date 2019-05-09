<template>
  <div class="fe-header-user">
    <template v-if="this.$store.getters.nick">
      欢迎您，
      <span class="username">{{ this.$store.getters.nick }}</span>
      [
      <span class="goout" @click="goOut">退出</span>]
    </template>
    <template v-else>
      <span class="login" @click="toLogin">立即登录</span>
      <span class="register" @click="goRegister">注册</span>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ""
    };
  },
  mounted() {
    // if(this.$store.getters.token){
    //   this.$api.api.getUserName()
    //     .then(res => {
    //     this.user = res.data.info.userName
    //   })
    // }
  },
  methods: {
    toLogin() {
      this.$router.push({
        path: "/touser/login"
      });
    },
    goRegister() {
      this.$router.push({
        path: "/touser/register"
      });
    },
    goOut() {
      this.$store.dispatch("GoOut");
      this.$router.push({
        path: "/"
      });
      window.location.reload();
    }
  }
  //   async mounted(){
  //     const {status,data:{user}} = await this.$axios.get('/users/getUser')
  //     if(status===200){
  //       this.user=user
  //     }
  //   }
};
</script>

<style lang="scss">
.fe-header-user {
  .login {
    cursor: pointer;
    color: rgb(17, 118, 233);
    padding-right: 4px;
  }
  .goout {
    cursor: pointer;
  }
  .register {
    &:hover {
      cursor: pointer;
      color: rgb(17, 118, 233);
    }
  }
}
</style>
