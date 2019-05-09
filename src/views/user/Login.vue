<template>
  <div class="login">
    <div class="form">
      <p class="login-title">账号登录</p>
      <el-input v-model="user.userEmail" placeholder="请输入邮箱"/>
      <el-input v-model="user.passWord" type="password" placeholder="请输入密码"/>
      <!-- <div class="login-foot" @click="forgetpass">忘记密码？</div> -->
      <el-button class="btn-login" type="success" @click="login">登录</el-button>
      <div>
        还没有账号?
        <span class="goregister" @click="goRegister">去注册</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        userEmail: "",
        passWord: ""
      }
    };
  },
  mounted() {},
  methods: {
    login() {
      this.$store.dispatch("GoLogin", this.user).then(res => {
        if (res.data.state === -307) {
          this.$notify({
            title: "失败",
            showClose: false,
            message: res.data.msg
          });
        } else if (res.data.state === -308) {
          this.$notify({
            title: "失败",
            showClose: false,
            message: res.data.msg
          });
          this.$router.push({
            path: "/touser/info"
          });
        } else {
          this.$router.push({
            path: "/home/main"
          });
        }
      });
    },
    goRegister() {
      this.$router.push({
        path: "/touser/register"
      });
    },
    forgetpass() {
      this.$router.push({
        path: "/touser/forgetpass"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #e6e4e4;
  .title {
    font-size: 34px;
    color: rgb(6, 240, 18);
    padding-top: 50px;
    padding-left: 150px;
    cursor: pointer;
  }
  .form {
    width: 400px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -100px;
    .login-title {
      margin-bottom: 20px;
      text-align: center;
      font-size: 25px;
      color: rgb(58, 57, 57);
    }
    .el-input {
      margin-bottom: 15px;
    }
    .btn-login {
      margin: 10px 0;
      width: 400px;
    }
    .login-foot {
      cursor: pointer;
      color: rgb(17, 118, 233);
      float: right;
    }
    .goregister {
      cursor: pointer;
      color: rgb(17, 118, 233);
    }
  }
}
</style>


