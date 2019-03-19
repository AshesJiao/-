<template>
  <div class="headline">
    <div :class=" itme == true ? 'title': 'titles' ">
      <ul class="titel-for">
        <li v-for="(t,key,index) in datas" :key="key" class="link-item" @click="sendNews(key, index)" :class="{active: index == currentIndex}">{{t}}</li>
      </ul>
      <span :class="itme == true ? 'toggle-btn': 'toggle-btns'" @click="itmes"></span>
    </div>
    <section class="wap-section">
      <div class="sec-top">
        <h2>今日头条</h2>
      </div>
        <div class="newsView">
          <news-list :category='category'></news-list>
        </div>
    </section>
  </div>
</template>

<script>
  import NewsList from '../components/NewsList'
  export default {
    data() {
      return {
        itme: false,
        datas: {
          'toutiao': "新闻",
          'ent': "娱乐",
          'sports': "体育",
          'money': "财经",
          'tech': "科技",
          'auto': "汽车",
          'war': "军事",
          'dy': "健康",
          'picture': "图片",
          'Star': "星闻",          
          'live': "直播",
          'video ': "视频",
          'phone': "手机",
          'code': "数码",
          'locality': "本地",
          'Netease': "网易号",
          'talk': "段子",
          'fashion': "时尚",
          'follow': "跟帖",
          'game': "游戏",
          'education': "教育",
          'Public': "公开课",          
          'tourism': "旅游",
          'parent': "亲子",
          'art': "艺术",
          'tdct': "双创",
          ' house': "房产",
          'home': "家居",
          'era': "新时代"
        },
        currentIndex: 0,
        category: 'toutiao'
      }
    },
    props: {
      sift: Array,
    },
    methods: {
      itmes() {
        this.itme = !this.itme
      },
      sendNews(params, index) {
        // 类别
        this.category = params
        this.currentIndex = index
      }
    },
    components: {
      NewsList
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import'../../public/sass/mixin';

  .headline {
    width: 100%;
    height: 100%;

    .title {
      max-width: 100%;
      min-width: 353px;
      height: 172px;
      padding: 11px;
      position: relative;
      overflow: hidden;
      transition: all, 0.3s linear;
      background: #f8f8f8;
    }

    .titles {
      max-width: 100%;
      min-width: 353px;
      height: 65px;
      padding: 11px;
      position: relative;
      overflow: hidden;
      transition: all, 0.3s linear;
      background: #f8f8f8;
    }

    .toggle-btn {
      width: 70px;
      height: 34px;
      position: absolute;
      right: 0px;
      bottom: 10px;
      background: url(../../public/img/pack-up.png)50% 50% no-repeat #f8f8f8;
      transform: rotate(180deg);
      z-index: 2;
    }

    .toggle-btns {
      width: 100px;
      height: 34px;
      position: absolute;
      right: 0px;
      bottom: 0;
      background: url(../../public/img/pack-up.png)50% 50% no-repeat #f8f8f8;
      transform: rotate(0deg);
      z-index: 2;
    }

    .titel-for {
      height: 172px;
      color: #333;
      &.active{
        font-weight: bold;
            color: #333;
      }
      .link-item {
        width: 51px;
        height: 34px;
        line-height: 45px;
        display: inline-block;
        text-align: center;
        margin-left: 4px;
      }
    }

    .wap-section {
      width: 100%;

      .sec-top {
        height: 24px;
        padding: 9px 11px;
        line-height: 24px;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
</style>