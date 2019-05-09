<template>
  <div class="fe-header-city">
    <i class="el-icon-location"/>
    {{city}}
    <!-- <span
      class="changeCity"
      @click="changecity"
      >切换城市
    </span>-->
    <!-- <div id="location" class="city_location" ref="city_location" v-if="showcity">

    </div>-->
  </div>
</template>

<script>
export default {
  name: "fe-header-city",
  data() {
    return {
      city: "天津市",
      showcity: false,
      address_detail: null, //详细地址
      userlocation: {
        lng: 0,
        lat: 0
      },
      page: {
        nowPage: 1,
        pageSize: 10
      }
    };
  },
  mounted() {
    this.location();
  },
  methods: {
    changecity() {
      // this.showcity = !this.showcity
      // console.log(this.showcity)
      this.$router.push({
        path: "changecity"
      });
    },
    location() {
      let that = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          that.city = r.address.city;
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            localStorage.lng = r.point.lng;
            localStorage.lat = r.point.lat;
            that.userlocation.lng = r.point.lng;
            that.userlocation.lat = r.point.lat;
            that.params = Object.assign({}, that.userlocation, that.page);
          } else {
            alert("failed" + this.getStatus());
          }
        },
        { enableHighAccuracy: true }
      );
    }
  }
};
</script>

<style lang="scss">
.fe-header-city {
  color: rgb(100, 97, 97);
  .changeCity {
    background: #f4f4f4;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    color: #666;
    margin: 0 4px;
    padding: 0 2px;
    &:hover {
      cursor: pointer;
      color: rgb(17, 118, 233);
    }
  }
  .city_location {
    border: 1px solid red;
  }
}
#l-map {
  height: 300px;
  width: 100%;
}
#r-result {
  width: 100%;
}
</style>
