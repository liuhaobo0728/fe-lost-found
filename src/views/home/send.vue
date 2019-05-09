<template>
  <div class="content">
    <div class="imgfile">
      <h3 class="filetitle">请上传物品图片：</h3>
      <input type="file" @change="previewFile()" ref="file">
    </div>
    <div class="imageurl">
      <img
        v-if="params.itemImg"
        :src="params.itemImg"
        width="200"
        height="200"
        alt="Image preview..."
      >
    </div>
    <el-input type="textarea" :rows="4" placeholder="请输入描述" v-model="params.itemInfo"></el-input>
    <el-input v-model="params.phone" placeholder="请输入联系电话"></el-input>
    <br>
    <el-input v-model="params.wchat" placeholder="请输入微信"></el-input>
    <br>
    <el-button type="primary" @click="sendfood">发布</el-button>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      fileList: [],
      params: {
        itemImg: "",
        itemInfo: "",
        phone: "",
        wchat: "",
        lat: localStorage.getItem("lat"),
        lon: localStorage.getItem("lng"),
        lostTime: Date.now(),
        userId: this.$store.getters.userid,
        offBase: 0
      },
      filelist: {
        file: null,
        itemId: 0
      }
    };
  },
  mounted() {},
  methods: {
    previewFile() {
      this.filelist.file = this.$refs.file.files[0];
      if (this.filelist.file.size > 1024 * 1024 * 2) {
        alert("图片大小不能超过 2MB!");
        return false;
      }
      // 创建url
      this.params.itemImg = window.URL.createObjectURL(this.filelist.file);
    },
    async sendfood() {
      if (this.file === null) {
        this.$notify({
          title: "警告",
          showClose: false,
          message: "请上传图片"
        });
        return;
      } else if (this.params.itemInfo === "") {
        this.$notify({
          title: "警告",
          showClose: false,
          message: "描述不能为空"
        });
        return;
      } else if (this.params.phone === "" || this.params.phone.length !== 11) {
        this.$notify({
          title: "警告",
          showClose: false,
          message: "手机号格式不正确"
        });
        return;
      } else if (this.params.wchat === "") {
        this.$notify({
          title: "警告",
          showClose: false,
          message: "微信不能为空"
        });
        return;
      }
      await this.$api.api.createItem(this.params).then(res => {
        if (res.data.state === 0) {
          this.filelist.itemId = res.data.info.itemId;
        }
      });
      const formdata = new FormData();
      formdata.append("file", this.filelist.file);
      await this.$api.api
        .createItemImg(formdata, this.filelist.itemId)
        .then(res => {
          if (res.data.state === 0) {
            alert("上传成功");
          }
        });
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.imgfile {
  margin: 20px 0;
  .filetitle {
    margin: 10px 0;
  }
}
.content {
  width: 1200px;
  margin: 0 auto;
  .content-li {
    margin: 30px 0;
    font-size: 20px;
  }
  .upload-demo {
    margin: 30px 0;
  }
  .el-textarea__inner {
    width: 200px !important;
  }
  .el-input {
    margin: 20px 0;
    width: 400px;
  }
}
</style>
