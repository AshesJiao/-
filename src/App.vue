<template>
  <div id="app">
    <new-header :hot="hot"></new-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/" exact >头条</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/important" >视频</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/talkView" >推荐</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :sift='sift'></router-view>
    </keep-alive>
  </div>
</template>
<script>
const url="/api"
const head="/head/article/list/T1348647853363/0-20.html"
import NewHeader from './components/NewHeader'
export default {
  name:'App',
  data() {
    return {
      sift:[],
      hot:[],
    }
  },
  created(){
    this.axios(url).then(response=>{
      // console.log(response.data)
          let hot = response.data
          this.hot = hot.data.dy
          // console.log(this.hot)
    },err =>{
      alert(err)
    }),
    this.axios(head).then(response=>{
      // console.log(response.data)
      let sift = response.data.T1348647853363
      this.sift = sift
       // eslint-disable-next-line 
      // console.log(this.sift)
    },err =>{
      alert(err)
    })
  },
  components: {
   NewHeader
  }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .tab{
    display:flex;
    width: 100%;
    height: 40px;
    .tab-item{
      flex: 1;
      height: 100%;
      text-align: center;
      & > a{
        display: block;
        font-size: 14px;
        font-weight: bold;
        line-height: 40px;
        text-decoration: none;
        color: rgb(77, 85, 93);
      }
       & > .active{
        color: rgb(240, 20, 20);
      }
    }
  }

</style>
