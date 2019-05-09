<template>
  <div class="content">
    <ul v-if="show">
      <li
        class="content-li"
        v-for="(item,index) in activitys"
        :key="index"
        @click="gocontent(activitys[index])"
        :itemid="item"
      >
        <img :src="item.imgPath" class="imgcon">
        <p class="content-one">{{item.itemInfo}}</p>
        <div class="text">
          <span class="icon">
            <i class="el-icon-location"></i>
            {{item.distance.toFixed(2)}}米
          </span>
          <span class="people">
            发布人：
            <img class="peopleimg" :src="item.userIcon" alt>
            {{item.userNick}}
          </span>
          <span class="time">发布时间：{{item.lostTime.split('.')[0].replace("T"," ")}}</span>
        </div>
      </li>
    </ul>
    <ul v-if="!show">
      <li
        class="content-li"
        v-for="(item,index) in activitys"
        :key="index"
        @click="gocontent(activitys[index])"
        :itemid="item"
      >
        <img :src="item.imgPath" alt>
        <p class="content-one">{{item.itemInfo}}</p>
        <p class="icon">
          <i class="el-icon-location"></i>
          {{item.distance}}米
        </p>
      </li>
    </ul>
    <div class="pagin">
      <el-pagination
        layout="prev, pager, next"
        :page-count="total"
        :current-page="params.nowPage"
        @prev-click="handldclick"
        @next-click="handldclick"
        @current-change="handldclick"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {
        longitude: localStorage.getItem("lng"),
        latitude: localStorage.getItem("lat"),
        nowPage: 1,
        pageSize: 10
      },
      content: {
        itemInfo: ""
      },
      activitys: [],
      total: 1,
      itemid: 0,
      show: true
    };
  },
  mounted() {
    if (this.$store.getters.token) {
      this.$api.api.getfindcore(this.params).then(res => {
        if (res.data.info.activitys) {
          this.activitys = res.data.info.activitys || {};
          this.total = res.data.info.tatalPage;
        }
      });
    } else {
      this.show = false;
      this.$api.api.getfindcore(this.params).then(res => {
        if (res.data.state === 0) {
          if (res.data.info.activitys) {
            this.activitys = res.data.info.activitys || {};
            this.total = res.data.info.tatalPage;
          }
        }
      });
    }
  },
  methods: {
    gocontent(val) {
      console.log(val);
      this.$router.push({
        path: "/home/contain",
        query: {
          id: val.itemId
        }
      });
    },
    handldclick(page) {
      this.params.nowPage = page;
      this.$api.api.getfindcore(this.params).then(res => {
        if (res) {
          this.activitys = res.data.info.activitys || {};
          this.total = res.data.info.tatalPage;
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.content {
  width: 1200px;
  margin: 0 auto;
  font-size: 14px;
  .content-li {
    border: 1px solid #ccc;
    margin: 30px 0;
    // font-size: 20px;
    cursor: pointer;
  }
  .content-one {
    display: inline-block;
    padding-left: 50px;
    padding-top: 30px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    position: absolute;
    text-indent: 25px;
    width: 900px;
    font-size: 16px;
  }
  .icon {
    margin-left: 50px;
    // margin-top: 10px;
    // margin-bottom: 10px;
    // text-align: center;
    // vertical-align: middle;
    font-size: 16px;
    // color: rgb(216, 171, 25);
  }
  .pagin {
    text-align: center;
  }
  .time {
    display: inline-block;
    padding-bottom: 20px;
    float: right;
    color: rgb(16, 125, 145);
  }
  .imgcon {
    width: 200px;
    height: 200px;
  }
  .text {
    // margin-bottom: 5px;
    margin: 5px 5px;
  }
  .people {
    display: inline-block;
    margin-left: 20px;
    float: right;
    padding-bottom: 10px;
    color: rgb(16, 125, 145);
  }
  .peopleimg {
    width: 12px;
    height: 12px;
  }
}
</style>
