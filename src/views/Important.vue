<template>
  <div class="about">
    <div class="sec-top">
      <h3>今日视频</h3>
    </div>

    <div class="new-video" v-for="(v,index) in video" :key='v.vid'>
      <div class="video-img">
        <img :src="v.cover" class=" auto-img" @click="videos(index,v.vid)">
      </div>
      <span class="video-text">{{v.title}}</span>
      <div class="ion" :class="isindex === index ? 'noshow':'show'">
        <span @click="videos(v.vid)">X</span>
        <video  class="video"  :src="v.mp4_url" controls :id="v.vid"></video>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        video: [],
        // shows: false,
        isindex: -1
      }
    },
    created() {
      this.axios.get('/myapi/vidoe')
        .then(response => {
          let res = response.data
          // console.log(response.data)
          if (res && res.errno === 0) {
            this.video = res.data
          }
          // console.log(this.video)
        })
    },
    methods: {
      videos(i ,id) {
        this.isindex = i   
        // console.log(id)
        // var ids =  id + ' ';
        // console.log(ids);
        var vdo = document.getElementsByClassName('video');
        vdo[i].pause();
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .sec-top {
    height: 24px;
    padding: 9px 11px;
    line-height: 24px;
    font-size: 18px;
    font-weight: bold;
  }

  .new-video {
    width: 100%;
    height: 200px;
    position: relative;
    top: 0;
    left: 0;
    padding: 11px;
    box-sizing: border-box;

    .video-img {
      width: 100%;
      height: 200px;
      position: absolute;
      top: 0;
      left: 0;
      padding: 11px;
      box-sizing: border-box;
    }

    .video-text {
      width: 94%;
      height: 24px;
      line-height: 24px;
      position: absolute;
      bottom: 11px;
      left: 11px;
      z-index: 2;
      background: rgba(7, 17, 27, .3);
      // padding-right: 11px;
      // padding: 11px 0 11px 0;
      box-sizing: border-box;
      font-size: 14px;
      text-align: center;
      color: #fff;
    }

    .ion {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 11px;
      box-sizing: border-box;
      z-index: 3;

      .video {
        width: 100%
      }

      span {
        position: absolute;
        top: 18px;
        right: 15px;
        width: 20px;
        height: 20px;
        color: red;
        font-size: 18px;
        line-height: 20px;
        z-index: 100000;
      }
    }

    .show {
      display: none;
    }

    .onwhow {
      display: inline-block;
    }

  }
</style>