<template>
    <transition name='fade'>
        <div class="newDetail">
            <div class="header">
                <div class="icon fl" @click="()=> this.$router.go(-1)"></div>
                <div class="tcount fr">{{data.tcount}}跟帖</div>
            </div>
            <div class="content" ref="scrool" @click="comment">
                <div>
                    <div class="contentView">
                        <div class="title">{{data.title}}</div>
                        <div class="author">{{data.source}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="tiem">{{data.ptiem}}</span>
                        </div>
                        <div class="text">{{data.digest}}</div>
                        <div class="img" v-for="(item,index) in data.picInfo" :key="index">
                            <img :src="item.url" width="100%" class="auto-img">
                        </div>
                    </div>
                </div>
            </div>
            <div class="sendMessage">
                <div class="inp" @click="commentFuc">
                    <div class="comment">写跟帖</div>
                </div>
                <div class="inp-input" v-show="isComment">
                    <input type="text">
                    <button>发送</button>
                </div>
                <div class="iconList">
                    <span class="icon"><i class="count">{{data.tcount}}</i></span>
                    <span class="icon"></span>
                    <span class="icon" @click="showShare"></span>
                    <span class="icon" @click="showShare"></span>
                </div>
            </div>
            <transition name='show'>
                <div class="share" v-show="isShare">
                    <div class="bg">
                        <div class="shareContent">
                            <div class="list">
                                <div class="item">
                                    <img src="../../public/img/bfh.png" width="60">
                                    <span>微信</span>
                                </div>
                                <div class="item">
                                    <img src="../../public/img/bfi.png" width="60">
                                    <span>微信朋友圈</span>
                                </div>
                                <div class="item">
                                    <img src="../../public/img/bfa.png" width="60">
                                    <span>QQ好友</span>
                                </div>
                                <div class="item">
                                    <img src="../../public/img/bfb.png" width="60">
                                    <span>QQ空间</span>
                                </div>
                            </div>
                            <div class="list">
                                <div class="item">
                                    <img src="../../public/img/bfg.png" width="60">
                                    <span>新浪微博</span>
                                </div>
                                <div class="item">
                                    <img src="../../public/img/bf7.png" width="60">
                                    <span>钉钉</span>
                                </div>
                                <div class="item">
                                    <img src="../../public/img/bfj.png" width="60">
                                    <span>有道云笔记</span>
                                </div>
                                <div class="item">
                                    <img src="../../public/img/bfk.png" width="60">
                                    <span>博客</span>
                                </div>
                            </div>
                            <div class="cancel" @click="showShare">取消</div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>
<script>
    // import BScroll from 'better-scroll'
    export default {
        data() {
            return {
                // data: this.$route.params,
                isShare: false,
                isComment: false
            }
        },

        methods: {
            showShare() {
                this.isShare = !this.isShare
            },
            commentFuc() {
                this.isComment = true
            },
            comment() {
                this.isComment = false
            }
        },
        computed: {
            data: function () {
                return this.$route.params
            },
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .newDetail {
        position: absolute;
        top: 80px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        background: #fff;
        transition: all .3s linear;

        &.fade-enter,
        &.fade-leave-to {
            transform: translateX(100%);
        }

        .header {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 47px;

            .icon {
                margin: 15px 0 0 15px;
                width: 10px;
                height: 18px;
                background: url(../../public/img/a8k.png) no-repeat;
                background-size: auto 18px;
            }

            .tcount {
                margin: 11px 18px 0 0;
                padding: 0 8px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                font-size: 12px;
                font-weight: 400;
                color: #f35858;
                border: 1px #f35858 solid;
                border-radius: 18px;
            }
        }

        .content {
            position: absolute;
            top: 47px;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;

            .title {
                padding: 0 11px;
                line-height: 34px;
                font-size: 24px;
                font-weight: 700;
            }

            .author {
                margin: 10px 11px 0;
                font-size: 12px;
                color: #ccc;
            }

            .text {
                margin: 24px 11px 0;
                line-height: 26px;
                font-size: 18px;
                font-weight: normal;
                color: #333;
                text-align: justify;
            }

            .img {
                margin: 30px 0;
                text-align: center
            }
        }

        .sendMessage {
            box-sizing: border-box;
            display: flex;
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 44px;
            line-height: 44px;
            padding: 0 11px;
            z-index: 5;
            background-color: #fff;

            .inp {
                position: relative;
                width: 60%;
                display: inline-block;

                .comment,
                input {
                    box-sizing: border-box;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    margin-top: 8px;
                    padding-left: 10px;
                    height: 26px;
                    line-height: 26px;
                    font-size: 14px;
                    color: #b2b2b2;
                    border: 1px #eee solid;
                    border-radius: 24px;
                }

                input {
                    background-color: transparent;
                    border: 0;
                    outline: none;
                }
            }

            .iconList {
                display: inline-block;
                margin-top: 2px;
                width: 40%;
                text-align: right;

                .icon {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    padding-left: 9%;

                    &:nth-of-type(1) {
                        position: relative;
                        background: url(../../public/img/b0n.png) no-repeat;
                        background-size: 18px auto;

                        i.count {
                            position: absolute;
                            left: 8px;
                            top: -4px;
                            height: 14px;
                            line-height: 16px;
                            font-size: 10px;
                            color: #777;
                            background: #fff;
                        }
                    }

                    &:nth-of-type(2) {
                        background: url(../../public/img/night_ak2.png) no-repeat;
                        background-size: 18px auto;
                    }

                    &:nth-of-type(3) {
                        background: url(../../public/img/akn.png) no-repeat;
                        background-size: 18px auto;
                    }

                    &:nth-of-type(4) {
                        background: url(../../public/img/ai2.png) no-repeat;
                        background-size: 18px auto;
                    }
                }
            }
        }

        .share {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
            z-index: 700;
            transform: all 0.2s linear;

            &.show-enter,
            &show-leave-to {
                transform: translateY(100%)
            }

            &.show-enter-to,
            &show-leave-to {
                opacity: 0;
            }

            .bg {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 710;
            }

            .shareContent {
                position: absolute;
                left: 0;
                bottom: 0;
                padding-top: 10px;
                width: 100%;
                background: #f8f8f8;
                z-index: 720;

                .list {
                    display: flex;
                    width: 100%;
                    text-align: center;

                    .item {
                        flex: 1;
                        padding: 10px;
                        font-size: 10px;

                        span {
                            display: block;
                            margin-top: 10px;
                        }
                    }
                }

                .cancel {
                    margin-top: 10px;
                    width: 100%;
                    height: 46px;
                    line-height: 46px;
                    text-align: center;
                    font-size: 18px;
                    font-weight: bold;
                    background: #fff;
                }
            }
        }

        .inp-input {
            // width: 100%;
            height: 30px;
            display: flex;
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            z-index: 690;
            padding: 10px 0 21px 12px;
            background: #fff;

            input {
                flex: 1;
                padding-left: 10px;
                font-size: 18px;
                border: 1px #e8e8e8 solid;
                resize: none;
                outline: none;
                border-radius: 24px;
            }

            button {
                flex: 0 0 72px;
                margin: 0;
                padding: 0;
                width: 72px;
                height: 34px;
                line-height: 34px;
                font-size: 16px;
                font-weight: 700;
                text-align: center;
                border: 0;
                background-color: transparent;
                outline: none;
                color: #ccc;
            }
        }
    }
</style>