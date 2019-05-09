<template>
  <div class="userinfo">
    <div class="form">
      <p class="register-title">信息填写</p>
      <div class="imgfile">
        <h3 class="filetitle">请上传头像：</h3>
        <input type="file" @change="previewFile()" ref="file">
      </div>
      <div class="imageurl">
        <img
          v-if="user.itemImg"
          :src="user.itemImg"
          width="200"
          height="200"
          alt="Image preview..."
        >
      </div>
      <span class="title-name">请输入用户昵称</span>
      <el-input v-model="user.userNick" placeholder="请输入用户昵称"/>
      <span class="title-name">请输入手机号</span>

      <el-input v-model="user.userPhone" placeholder="请输入手机号"/>
      <el-button class="btn-register" type="success" @click="sendfood">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "userinfo",
  data() {
    return {
      user: {
        extraInfo: "",
        userIcon: "",
        userId: this.$store.getters.userid,
        userNick: "",
        userPhone: "",
        userScore: 0,
        itemImg: ""
      },
      filelist: {
        file: null,
        userId: 0
      }
    };
  },
  mounted() {
    this.user.userId = this.$store.getters.userid;
  },
  methods: {
    previewFile() {
      this.filelist.file = this.$refs.file.files[0];
      if (this.filelist.file.size > 1024 * 1024 * 2) {
        alert("图片大小不能超过 2MB!");
        return false;
      }
      // 创建url
      this.user.itemImg = window.URL.createObjectURL(this.filelist.file);
    },
    async sendfood() {
      await this.$api.api.goUserInfo(this.user).then(res => {
        if (res.data.state === 0) {
          this.$notify({
            title: "成功",
            showClose: false,
            message: "用户信息填写成功"
          });
          this.$router.push({
            path: "/touser/login"
          });
        }
      });
      const formdata = new FormData();
      formdata.append("file", this.filelist.file);
      await this.$api.api
        .uplodeItemImg(formdata, this.filelist.itemId)
        .then(res => {
          if (res.data.state === 0) {
            alert("上传成功");
          }
        });
      this.$router.push({
        path: "/"
      });
    },
    register() {
      this.$api.api.goUserInfo(this.user).then(res => {
        if (res.data.state === 0) {
          this.$notify({
            title: "成功",
            showClose: false,
            message: "用户信息填写成功"
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
        path: "/login"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.userinfo {
  width: 100%;
  height: 100%;
  background-color: #e6e4e4;
  .form {
    width: 400px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 30%;
    margin-left: -200px;
    margin-top: -100px;
    .title-name {
      display: block;
      margin-left: 10px;
      padding-bottom: 10px;
    }
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
.avatar-uploader .el-upload {
  border: 1px dashed #000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #000;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
  border: 1px dashed #000;
}
.avatar {
  width: 78px;
  height: 78px;
  display: block;
}
</style>


