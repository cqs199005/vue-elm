<template>
    <transition>
        <div class="food" v-show="showFlag" ref="food">
            <div class="food-container">
                <div class="img-header">
                    <img :src="food.image" alt="">
                    <div class="back">
                        <i class="icon-arrow_lift" @click="back"></i>
                    </div>
                </div>
                <div class="content">
                    <h2>{{food.name}}</h2>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartControl-wrapper">
                        <cartControl :food="food"></cartControl>
                    </div>
                    <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst">
                        加入购物车
                    </div>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h2 class="title">商品信息</h2>
                    <p class="text">{{food.info}}
                        <p/>
                </div>
                <split></split>
                <div class="rating">
                    <h2 class="title">商品评价</h2>
                    <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings" @setSelectType="setSelectType" @setOnlyType="setOnlyType"></ratingselect>
                    <!-- 评论内容 -->
                    <div class="ratings-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" class="rating-item" :key="index">
                                <div class="top">
                                    <div class="time">{{rating.rateTime | dateFormate}}</div>
                                    <div class="user">
                                        <span class="name">{{rating.username}}</span>
                                        <img :src="rating.avatar" width="12" height="12" class="avatar" alt="">
                                    </div>    
                                </div>
                                <p class="text">
                                    <i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
                                    {{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    //引入betterScroll 模块
    import betterScroll from 'better-scroll'
    //引入购买组件
    import cartControl from '../shopcart/cartControl'
    //导入Vue组件
    import Vue from 'vue'
    //引入分割组件
    import split from '../split/split.vue'
    //引入ratingselect组件
    import ratingselect from '../ratingselect/ratingselect.vue'
    //引入格式化时间模块
    import { formatDate } from '../../common/js/formatDate.js'
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        data: () => ({
            showFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: { //设置组件详情
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        }),
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            show() {
                this.showFlag = true
                //在每次显示时初始化
                this.selectType = ALL;
                this.onlyContent = true;
                this.$nextTick(() => {
                    if (!this.scroll) { //如果是第一次
                        this.scroll = new betterScroll(this.$refs.food, {
                            click: true
                        })
                    } else {
                        this.scroll.refresh(); // 重新计算
                    }
                })
            },
            //关闭商品信息
            back() {
                this.showFlag = false;
            },
            addFirst() {
                Vue.set(this.food, 'count', 1);
            },
            //子组件调用,改变父组件的值
            setSelectType(type) {
                this.selectType = type;
                this.$nextTick(function(){  
                     this.scroll.refresh(); // 重新计算
                })
            },
            setOnlyType() {
                this.onlyContent = !this.onlyContent;
                this.$nextTick(function(){
                     this.scroll.refresh(); // 重新计算
                })
            },
            //根据选择条件判断是否要让这条数据显示
            needShow(type,text){
                if(this.onlyContent && !text){
                    return false
                }
                if(this.selectType === ALL) {
                    return true
                }else {
                    return type === this.selectType
                }
            }
        },
        filters:{
            dateFormate(time){
                let date = new Date(time);
                //调用格式化时间模块
                return formatDate(date,'yyyy-MM-dd hh:mm:ss')
                // let year = date.getFullYear();
                // let months = date.getMonth() + 1;
                // let day = date.getDay();
                // let hour = date.getHours();
                // let minute = date.getMinutes();
                // return `${year}-${months}-${day} ${hour}:${minute}`
            }
        },
        components: {
            cartControl,
            split,
            ratingselect
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../common/css/mixin.scss';
    .food {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        bottom: 46px;
        z-index: 30;
        background-color: #fff;
        .img-header {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 100%;
            img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
            .back {
                position: absolute;
                left: 0;
                top: 10px;
                .icon-arrow_lift {
                    padding: 10px;
                    font-size: 20px;
                    color: #fff;
                    display: block;
                }
            }
        }
        .content {
            padding: 18px;
            position: relative;
            h2 {
                font-size: 14px;
                font-weight: 700;
                color: rgb(7, 17, 27);
                line-height: 14px;
            }
            .detail {
                margin-top: 8px;
                font-size: 10px;
                color: rgb(147, 153, 159);
                line-height: 10px;
                .sell-count {
                    margin-right: 12px;
                }
            }
            .price {
                margin-top: 18px;
                .now {
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                    line-height: 24px;
                }
                .old {
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                    font-weight: 700;
                    line-height: 24px;
                }
            }
            .cartControl-wrapper {
                position: absolute;
                right: 12px;
                bottom: 12px;
            }
            .buy {
                position: absolute;
                right: 18px;
                bottom: 18px;
                height: 24px;
                line-height: 24px;
                padding: 0 12px;
                color: #fff;
                background-color: rgb(0, 160, 220);
                border-radius: 24px;
                font-size: 10px;
                z-index: 10;
            }
        }
        .info {
            padding: 18px;
            .title {
                font-size: 14px;
                margin-bottom: 6px;
                color: rgb(7, 17, 27);
                line-height: 14px;
            }
            .text {
                line-height: 24px;
                padding: 0 8px;
                font-size: 12px;
                color: rgb(77, 85, 93);
            }
        }
        .rating {
            padding-top: 18px;
            .title {
                line-height: 14px;
                margin-left: 18px;
                font-size: 14px;
                color: rgb(7, 17, 27);
            }
            .ratings-wrapper {
                padding: 0 18px;
                .rating-item {
                    padding: 16px 0;
                    position: relative;
                    @include border-1px(rgba(7, 17, 27, 0.1));
                   .top {
                       display: flex;
                       justify-content: space-between;
                       margin-bottom: 6px;
                       .name {
                           font-size: 10px;
                           color: rgb(147, 153, 159);
                           line-height: 12px;
                           margin-right: 6px;
                       }
                       .avatar {
                           border-radius: 50%;
                       }
                       .time {
                           font-size: 10px;
                           color: rgb(147, 153, 159);
                           line-height: 12px;
                       }
                   }
                }
                .text {
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                    line-height: 16px;
                    i {
                        font-size: 12px;
                        line-height: 16px;
                        &.icon-thumb_up {
                            color: rgb(0, 160, 220);
                        }
                        &.icon-thumb_down {
                             color: rgb(147, 153, 159);
                        }
                    }
                }
                .no-rating {
                    font-size: 12px;
                    padding: 16px 0;
                    color: rgb(147, 153, 159);
                }
            }
        }
    }
    .v-enter,
    .v-leave-to {
        transform: translateX(100%);
    }
    .v-enter-active,
    .v-leave-active {
        transition: all 0.2s linear;
    }
</style>