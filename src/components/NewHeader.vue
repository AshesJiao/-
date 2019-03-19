<template>
    <div class="header">
        <div class="header-title">
            <div class="header-logo">
                <span><img src="../../public/img/az3.9.png" class="auto-img"></span>
            </div>
            <div class="header-seek">
                <transition-group name="seek">
                    <div v-for="(h,index) in hot" :key="h.ptime" class="seek" v-show="index === seekIndex && h.title"
                        @click="seeks">
                        <span><img src="../../public/img/az4.png" class="auto-img seek-img"></span>
                        <span class="seek-text">{{h.title}}</span>
                    </div>
                </transition-group>
                <transition name="fade">
                    <div class="search" v-show="seek" :class="seek == true? 'searchshows' : 'seaechshow' ">
                        <div class="searchHeader">
                            <div class="back" @click="seeks"></div>
                            <div class="inp">
                                <span class="icon"></span>
                                <input type="text" placeholder="请输入新闻标题..." @input="changeVal" v-model="searchVal"
                                    @keyup.enter="sendMsg">
                            </div>
                            <div class="txt" @click="sendMsg">搜索</div>
                        </div>
                        <div class="searchContent" ref="scroll">
                            <ul>
                                <div class="hotSearch" v-show="showHot">
                                    <div class="title border-1px">热门搜索</div>
                                    <div class="hotList border-1px" v-for="(item,index) in list.toutiao" :key="index"
                                        @click="toNewsDetail(item)" v-if="index<10">
                                        <span class="tit"><i :class="'num'+index">{{index+1}}.&nbsp;&nbsp;</i>{{item.title}}</span>
                                    </div>
                                </div>
                                <li class="listItem border-1px" v-for="(item,index) in arrList" :key="index" @click="toNewsDetail(item)">
                                    <span class="tit">{{item.title}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="header-logon">
                <span><img src="../../public/img/logon.png" class="auto-img" @click="logon"></span>
                <transition name="dra">
                    <div class="logon-dra" v-show="show">
                        <div class="logon-bg">
                            <div class="logon">
                                <span class="logon-logo"></span>
                                <input type="text" class="logon-text">
                            </div>
                            <div class="pass">
                                <span class="pass-logo"></span>
                                <input type="password" class="pass-text">
                            </div>
                            <button class="but">登录</button>
                            <div class="operation">
                                <span class="operation-pass">忘记密码?</span>
                                <span class="operation-text">去注册</span>
                            </div>
                            <div class="third-login">
                                <p class="title">社交账号登录</p>
                                <div class="select-section">
                                    <div class="section-wrap">
                                        <img src="../../public/img/night_azd.png" class="auto-img">
                                    </div>
                                    <div class="section-wrap">
                                        <img src="../../public/img/night_azg.png" class="auto-img">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                <transition name="fade">
                    <div class="bg" v-show="show" @click="logon"></div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    // import BScroll from 'better-scroll'
    export default {
        name: 'NewHeader',
        created() {
            this.axios.get('https://www.apiopen.top/journalismApi')
                .then(res => {
                    // console.log(res.data)
                    res = res.data
                    if (res.code === 200) {
                        this.list = res.data
                        // console.log(this.list.auto[0].title)
                        // console.log(this.list)
                    }
                })
        },
        props: {
            sift: Array,
            hot: Array
        },
        data() {
            return {
                seekIndex: 0,
                timer: null,
                show: false,
                seek: false,
                list: {},
                searchVal: '',
                showHot: true
            }
        },
        watch: {
            hot(newValue) {
                if (this.timer) {
                    clearInterval(this.timer)
                } else {
                    this.timer = setInterval(() => {
                        this.seekIndex++
                        if (this.seekIndex >= newValue.length) {
                            this.seekIndex = 0
                        }
                    }, 2000)
                }

            }
        },
        methods: {
            logon() {
                this.show = !this.show
            },
            seeks() {
                this.seek = !this.seek
            },
            changeVal(e) {
                if (e.target.value.length !== 0) {
                    this.searchVal = e.target.value
                    this.showHot = false
                } else {
                    this.showHot = true
                }
            },
            toNewsDetail(params) {
                this.searchVal = ''
                this.showHot = true
                this.$router.push({
                    name: 'NewsDetail',
                    params
                })
            },
            sendMsg() {
                // this.searchVal = ''
            }
        },
        computed: {
            arrList() {
                let searchVal = this.searchVal
                // 逻辑-->根据input的value值筛选goodsList中的数据
                let arr = [] // 声明一个空数组来存放数据
                if (searchVal) {
                    for (let key in this.list) {
                        // console.log(this.list)
                        // console.log(key)
                        // console.log(this.list[key])
                        for (let i = 0; i < this.list[key].length; i++) {
                            // console.log(this.list[key][i].title)
                            // console.log(this.list[key][i])
                            // "TypeError: Cannot read property 'search' of null" 没有加下面这条会报错“Type Error：无法读取NULL属性”搜索“
                            let str = String(this.list[key][i].title)
                            if (str.search(searchVal) > -1) {
                                arr.push(this.list[key][i])
                            }
                            // console.log(str.indexOf(searchVal))
                            // console.log(str)
                        }
                    }
                }
                return arr
            }
        },
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import'../../public/sass/mixin';

    .header {
        width: 100%;
        height: 40px;
        display: flex;
        padding: 0 10px;
        box-sizing: border-box;
        background-color: red;
        position: relative;

        .header-logon {
            position: absolute;
            right: 0;
            top: 0;
            flex: 0 0 40px;
            height: 40px;
            width: 40px;
            display: inline-block;

            .logon-dra {
                position: fixed;
                top: 0;
                left: 0;
                width: 245px;
                padding: 0 15px;
                height: 100%;
                z-index: 6;
                background-color: #fff;
            }

            .dra-enter-active,
            .dra-leave-active {
                transition: all 0.5s linear;
            }

            .dra-enter,
            .dra-leave-to {
                transform: translateX(-100%);
            }

            .dra-enter-to,
            .dra-leave {
                transform: translateX(0);
            }


            .bg {
                position: fixed;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                z-index: 5;
                background: rgba(7, 17, 27, 0.5);
            }

            .fade-enter,
            .fade-leave-to {
                opacity: 0;
            }

            .fade-entert-to,
            .fade-leave {
                opacity: 0.5;
            }

            .fade-enter-active,
            .fade-leave-active {
                transition: all 0.6s linear;
            }

        }

        .logon-bg {
            width: 100%;
            height: 240px;
            margin-top: 40px;

            .logon {
                width: 100%;
                height: 47px;
                border: 1px solid #c5cddb;
            }

            .logon-logo {
                display: inline-block;
                width: 45px;
                height: 45px;
                background: url(../../public/img/login_bg.png) 0 0 no-repeat;
                margin-left: 10px;
            }

            .logon-text {
                width: 190px;
                height: 40px;
                vertical-align: top;
                font-size: 18px;
                font-weight: 400;
            }

            .pass {
                width: 100%;
                height: 47px;
                border: 1px solid #c5cddb;
                margin-top: 16px
            }

            .pass-logo {
                display: inline-block;
                width: 45px;
                height: 45px;
                background: url(../../public/img/login_bg.png) 0 bottom no-repeat;
                margin-left: 10px;
            }

            .pass-text {
                width: 190px;
                height: 40px;
                vertical-align: top;
                font-size: 18px;
                font-weight: 400;
            }

            .but {
                display: inline-block;
                width: 220px;
                height: 38px;
                font-size: 13px;
                font-weight: 400;
                line-height: 38px;
                margin: 15px 10px;
                color: #fff;
                background: red;
                border-radius: 5px;
            }

            .operation {
                height: 16px;
                padding: 2px 0 9px 0;
                color: #999;
                font-size: 0;

                .operation-pass {
                    line-height: 16px;
                    float: left;
                    font-size: 12px;
                }

                .operation-text {
                    line-height: 16px;
                    float: right;
                    font-size: 12px;
                }
            }

            .third-login {
                @include border-bottom(#e2e2e2);
                @include border-top(#e2e2e2);
                margin-top: 20px;
                position: relative;

                .title {
                    font-size: 12px;
                    width: 50%;
                    position: absolute;
                    top: -6px;
                    left: 60px;
                    text-align: center;
                    background: #fff;
                    color: #6f6f6f;
                    line-height: 12px;
                }

                .select-section {
                    width: 230px;
                    height: 100px;
                    margin: 15px 0;
                }

                .section-wrap {
                    width: 57px;
                    height: 57px;
                    margin: 22px 29px;
                    display: inline-block;
                }
            }

        }

        .header-title {
            width: 395px;
            height: 100%;

            // margin: 0 auto;

            .header-logo {
                flex: 0 0 61px;
                height: 30px;
                width: 61px;
                margin-top: 6px;
                display: inline-block;
            }
        }


        .header-seek {
            position: relative;
            display: inline-block;
            flex: 1;
            height: 30px;
            width: 250px;
            background: rgba(255, 255, 255, .5);
            border: 1px rgba(255, 255, 255, .5) solid;
            border-radius: 20px;
            margin-left: 5px;
            overflow: hidden;

            .seek {
                position: absolute;
                left: 0;
                top: 0;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .seek-img {
                width: 20px;
                height: 20px;
                vertical-align: super;
                margin-left: 5px;
            }

            .seek-text {
                display: inline-block;
                width: 200px;
                height: 100%;
                font-size: 12px;
                line-height: 30px;
                margin-left: 5px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .seek-enter {
                transform: translateY(100%);
            }

            .seek-enter-active,
            .seek-leave-active {
                transition: all, 0.5s linear;
            }

            .seek-enter-to,
            .seek-leave {
                transform: translateY(0);
            }

            .seek-leave-to {
                transform: translateY(-100%)
            }
        }

        .searchshow {
            display: none;
        }

        .searchshows {
            display: inline-block;
        }

        .search {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #fff;
            color: #333;
            z-index: 800;
            transition: all 0.5s linear;
            }

            .searchHeader {
                box-sizing: border-box;
                display: flex;
                position: absolute;
                top: 0;
                left: 0;
                padding: 8px 16px 8px 10px;
                width: 100%;
                height: 46px;

                .txt {
                    flex: 0 0 46px;
                    width: 46px;
                    height: 32px;
                    line-height: 32px;
                    font-size: 14px;
                    font-weight: 600;
                    text-align: right;
                }

                .back {
                    flex: 0 0 24px;
                    margin-top: 4px;
                    width: 16px;
                    height: 24px;
                    background: url(../../public/img/ajq.png) no-repeat 0px 3px;
                    background-size: 18px auto;
                }

                .inp {
                    flex: 1;
                    padding: 0 0px 0 14px;
                    width: 100%;
                    height: 32px;
                    line-height: 32px;
                    border: 1px solid #efefef;
                    border-radius: 28px;

                    .icon {
                        float: left;
                        display: inline-block;
                        margin: 8px 5px 8px 0;
                        width: 14px;
                        height: 14px;
                        background: url(../../public/img/news_main_search_bar_icon.png) no-repeat;
                        background-size: 13px auto;
                    }

                    input {
                        float: left;
                        padding: 9px 0;
                        margin: 0;
                        height: 15px;
                        line-height: 15px;
                        font-size: 14px;
                        border: 0;
                        outline: none;
                        background-color: transparent;
                    }
                }

                .listItem {
                    width: 100%;
                    @include border-top(#ebebeb);
                }

                .tit {
                    background: url(../../public/img/axn.png) no-repeat 12px 12px;
                    background-size: 14px auto;
                }
            }
        }

        .searchContent {
            box-sizing: border-box;
            position: absolute;
            top: 46px;
            left: 0;
            bottom: 0;
            right: 0;
            margin: 0 12px 0 12px;
            overflow: hidden;

            .tit {
                display: block;
                padding: 12px 0 12px 34px;
                max-width: 250px;
                height: 14px;
                font-size: 14px;
                font-weight: 500;
                white-space: nowrap;
                /*一行展示*/
                text-overflow: ellipsis;
                /*...显示*/
                overflow: hidden;
                /*超出隐藏*/
            }

            .hotSearch {
                .title {
                    padding: 14px 0 10px;
                    font-size: 14px;
                    color: #a0a0a0;
                    @include border-top(#e4e4e4);

                    .hotList {
                        @include border-top(#ebebeb);

                        // padding: 12px 0 12px 10px
                        .tit {
                            padding-left: 12px;
                        }

                        i {
                            font-size: 14px;
                            background: none;
                            color: #bcbcbc;
                        }

                        .num0 {
                            color: #ff443f;
                        }

                        .num1 {
                            color: #ff903b;
                        }

                        .num2 {
                            color: #ffc535;
                        }
                    }
                }
            }

        }
</style>