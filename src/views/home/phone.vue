<template>
  <div class="content">
    <img :src="content.itemImg" alt class="img">
    <div class="content-one">
      <h3 class="h3">物品描述</h3>
      <p class="text">{{content.itemInfo}}</p>
      <div class="phonewx">
        <br>电话:
        <span class="phone">138********</span>
        <br>
        <br>微信:
        <span class="wx">********</span>
        <br>
        <br>地址:
        <span class="address">{{address}}</span>
        <br>
      </div>
      <!-- <el-button type="primary" @click="fen">分享</el-button>
      <div class="erwei" v-if="shower">
        <i class="el-icon-close" @click="handleclose"></i>
        <img class="wximg" src="@/assets/WechatIMG1.jpeg" alt>
      </div>-->
      <!-- <el-button
        class="btndel"
        type="danger"
        @click="del"
        v-if="this.$store.getters.userid === content.userId"
      >删除</el-button>-->
      <div id="allmap" class="allmap"></div>
    </div>

    <!-- <p class="icon">
                <i class="el-icon-location"></i> 
    sasasas</p>-->
  </div>
</template>

<script>
import jsonp from "jsonp";
export default {
  data() {
    return {
      params: {
        itemId: this.$route.query.id
      },
      content: {},
      address: "",
      shower: false
    };
  },
  created() {
    this.$api.api.getItemInfo(this.params).then(res => {
      if (res.data.state === 0) {
        this.content = res.data.info;
      }
    });
  },
  mounted() {
    const params = {
      lat: localStorage.getItem("lat"),
      lng: localStorage.getItem("lng")
    };
    jsonp(
      `http://api.map.baidu.com/geocoder/v2/?location=${localStorage.getItem(
        "lat"
      )},${localStorage.getItem(
        "lng"
      )}&output=json&pois=1&latest_admin=1&ak=MbOyzDI3gvBwdrpU0ioK5f4Tpz9MgKqy&callback=renderReverse`,
      null,
      (err, data) => {
        if (err) {
          console.error(err.message);
        } else {
          this.address = data.result.formatted_address;
        }
      }
    );
    var map = new BMap.Map("allmap");
    map.centerAndZoom(
      new BMap.Point(localStorage.getItem("lng"), localStorage.getItem("lat")),
      11
    );
    map.enableScrollWheelZoom(true);
    map.clearOverlays();
    var new_point = new BMap.Point(
      localStorage.getItem("lng"),
      localStorage.getItem("lat")
    );
    var marker = new BMap.Marker(new_point); // 创建标注
    var geoc = new BMap.Geocoder();
    map.addOverlay(marker); // 将标注添加到地图中
    map.panTo(new_point);
  },
  methods: {
    del() {
      this.$api.api.getdel(this.params).then(res => {
        if (res.data.state === 0) {
          alert("删除成功");
          this.$router.push({
            path: "/"
          });
        }
      });
    },
    fen() {
      this.shower = !this.shower;
      if (this.shower === true) {
        this.$api.api.getlocaltion().then(res => {
          console.log(res);
        });
      }
    },
    handleclose() {
      this.shower = !this.shower;
    }
  }
};
</script>


<style lang="scss" scoped>
.content {
  width: 100%;
  margin: 0 auto;
  text-indent: 25px;
  .img {
    position: absolute;
    left: 50%;
    margin-left: -100px;
    width: 200px;
    height: 200px;
  }
  .h3 {
    text-align: center;
    font-size: 34px;
    font-weight: 600;
    margin-bottom: 50px;
  }
  .el-button {
    margin-top: 20px;
  }
  .content-one {
    width: 100%;
    padding: 30px 0;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    position: absolute;
    top: 200px;
    font-size: 20px;
  }
  .icon {
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .allmap {
    height: 500px;
    width: 100%;
    margin-top: 20px;
  }
  .phonewx {
    // text-align: right;
    margin-top: 20px;
    font-weight: 500;
    // color: rgb(238, 11, 11);
  }
  .text {
    font-size: 16px;
  }
  .erwei {
    position: absolute;
    top: 200px;
    left: 180px;
    width: 150px;
    height: 170px;
    // border: 1px solid red;
    z-index: 999;
    .el-icon-close {
      position: absolute;
      right: 0;
      cursor: pointer;
    }
    .wximg {
      width: 150px;
      height: 150px;
      margin-top: 20px;
      margin-left: -25px;
    }
  }
  .btndel {
    margin-left: 20px;
  }
}
</style>
