<template>
  <div class="newsList" rsf="newsList">
    <div>
      <div class="news" v-for="(item,index) in news[category]" :key="index" v-show="item.title" @click="toNewsDetail(item)" >
        <div class="content">
          <div class="title">{{item.title}}</div>
          <div class="source">
            <span v-show="index === 0 && category === 'toutiao' " style="color:red">置顶&nbsp;&nbsp;</span>
            {{item.source}}&nbsp;&nbsp;
            <span class="ent" v-show="item.tcount">{{item.tcount}}跟帖</span>
          </div>
        </div>
        <div :class="item.picInfo.length === 0 ? '':'showImg'" >
          <div class="picInfo" v-for="(minItem,minIdex) in item.picInfo" :key="minIdex">
            <div class="hasImg0" v-if="item.picInfo.length === 0">
              <img :src="minItem.url" width="109" class="auto-img">
            </div>
            <div class="hasImg1" v-else-if="item.picInfo.length === 1">
              <img :src="minItem.url" width="109" class="auto-img">
            </div>
            <div class="hasImg3" v-else>
              <img :src="minItem.url" width="109" height="55" class="auto-img">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      this.axios.get('https://www.apiopen.top/journalismApi')
        .then(res => {
          res = res.data
          if (res.code === 200) {
            this.news = res.data
            console.log(this.news)
          }
        })
    },
    props: {
      category: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        news: {}
      }
    },
    methods: {
      toNewsDetail(params) {
        this.$router.push({name: 'NewsDetail', params})
      }
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import'../../public/sass/mixin';

  .newsList {
    overflow: hidden;
    // .nesfl{
    //   display: flex;
    //   padding: 12px;
    //   color: #333;
    //   @include border-top(#edeff3);
    //   // flex-direction: column;
    // }
    .news {
      display: flex;
      padding: 12px;
      color: #333;
      @include border-top(#edeff3);
      // flex-direction: column;
      .content {
        flex: 1;
        font-size: 0;

        .title {
          line-height: 25px;
          font-size: 18px;
        }

        .source {
          position: relative;
          margin-top: 12px;
          font-size: 12px;
          color: #b4b4b4;

          &:after {
            content: '';
            position: absolute;
            right: 5px;
            width: 8px;
            height: 8px;
            background: url(../../public/img/axt.png)no-repeat;
            background-size: auto 8px;
          }
        }
      }
      .showImg{
         width: 98px;
        //  min-height: 55px;
          max-height: 55px;
          overflow: hidden;
      }
      .picInfo {
        overflow: hidden;
        .hasImg0,
        .hasImg1, 
        {
          width: 98px;
          height: 55px;
        }

        .hasImg1 {
          flex: 1;
          margin-left: 12px;
        }

        .hasImg3 {
          display: inline-block;
          width: 110px;
          height: 55px;
          overflow: hidden;

          &:nth-child(3) {
            margin-right: 0;
            transform: translateY(100px);
          }
        }
      }
    }
  }
</style>