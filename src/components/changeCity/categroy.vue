<template>
  <div class="">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd
        v-for="item in list"
        :key="item">
        <a :href="'#city-'+item">{{ item }}</a>
      </dd>
    </dl>
    <dl
      v-for="item in block"
      :key="item.title"
      class="m-categroy-section">
      <dt :id="'city-'+item.title">{{ item.title }}</dt>
      <dd>
        <span
          v-for="c in item.city"
          :key="c">{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
// import pyjs from 'js-pinyin'
export default {
  data(){
    return {
      list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block:[]
    }
  },
  async mounted(){
    let self=this;
    let blocks=[]
    let {status,data:{city}}=await self.$axios.get('/geo/city');
    if(status===200){
      let p
      let c
      let d={}
      city.forEach(item=>{
        p=pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1)
        c=p.charCodeAt(0)
        if(c>96&&c<123){
          if(!d[p]){
            d[p]=[]
          }
          d[p].push(item.name)
        }
      })
      for(let [k,v] of Object.entries(d)){
        blocks.push({
          title:k.toUpperCase(),
          city:v
        })
      }
      blocks.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0))
      self.block=blocks
    }
  }
}
</script>

<style lang="scss">
  .m-categroy {
  display: flex;
  margin-bottom: 30px;

  dt {
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }

  dd {
    font-size: 15px;
    color: #666;
    margin: 0 6px;
    width: 24px;
    height: 24px;
    padding: 4px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border-radius: 50%;

    &:hover {
      background: #F8F8F8;
    }
  }
}

.m-categroy-section {
  display: flex;
  padding: 13px 30px 13px 10px;
  border-radius: 10px;

  &:hover {
    background: #F8F8F8;
  }

  dt {
    box-sizing: border-box;
    vertical-align: top;
    padding-top: 10px;
    display: inline-block;
    text-align: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    background: #13D1BE;
    box-shadow: 0 4px 5px 0 rgba(39, 178, 164, .22);
  }

  dd {
    flex: 1;

    span {
      margin: 10px 20px;
      color: #666;
      display: inline-block;
      font-size: 14px;
    }
  }
}
</style>
