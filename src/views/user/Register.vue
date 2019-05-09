<template>
  <div class="register">
    <div class="form">
      <form action>
        <p class="register-title">账号注册</p>
        <el-input v-model="user.userEmail" placeholder="请输入用户邮箱"/>
        <el-input v-model="user.passWord" type="password" placeholder="请输入密码"/>
        <el-button class="btn-register" type="success" @click="register">注册</el-button>
        <div>
          已有账号?
          <span class="gologin" @click="goLogin">去登陆</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
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
    register() {
      this.$store.dispatch("GoRegister", this.user).then(res => {
        if (res.data.state === 0) {
          this.$notify({
            title: "成功",
            showClose: false,
            message: "请去邮箱激活"
          });
          this.$router.push({
            path: "/touser/login"
          });
        } else {
          this.$notify({
            title: "失败",
            showClose: false,
            message: res.data.msg
          });
        }
      });
    },
    goLogin() {
      this.$router.push({
        path: "/touser/login"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  background-color: #e6e4e4;
  .form {
    width: 400px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -100px;
    .register-title {
      margin-bottom: 20px;
      text-align: center;
      font-size: 25px;
      color: rgb(58, 57, 57);
    }
    .el-input {
      margin-bottom: 15px;
    }
    .btn-register {
      margin: 10px 0;
      width: 400px;
    }
    .gologin {
      cursor: pointer;
      color: rgb(17, 118, 233);
    }
  }
}
</style>


