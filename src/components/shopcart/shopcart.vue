<template>
<div >
    <div class="shopcart">
        <div class="content" @click="toogleShow">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'heightlight':totalCount>0}">
                        <span class="icon-shopping_cart"></span>
                    </div>
                    <div class="num" v-show="totalCount>0">
                        {{totalCount}}
                    </div>
                </div>
                <div class="price" :class="{'heightlight':totalPrice>0}">
                    ￥{{totalPrice}}
                </div>
                <div class="desc">
                    另需配送费￥{{deliveryPrice}}元
                </div>
            </div>
            <div class="content-right">
                <div class="pay" :class="{'heightlight':totalPrice>=minPrice}" @click.stop.prevent="pay">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <transition name="list">
            <div class="shopcart-list" v-show="listshow">
                <div class="list-header">
                    <h2 class="title">购物车</h2>
                    <span class="empty" @click="empty">清空</span>
                </div>
                <div class="list-content" ref="listCon">
                    <ul>
                        <li v-for="(food,index) in selectfood" :key="index" class="food">
                            <span class="name">{{food.name}}</span>
                            <span class="price">￥{{food.price*food.count}}</span>
                            <div class="cart-control">
                                <cartControl :food="food"></cartControl>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
    <transition name="fade">
        <div class="list-mask" v-show="listshow"></div>
    </transition>
</div>   
</template>
<script>
    //引入better-scroll 滚动插件
    import betterScroll from 'better-scroll'
    import cartControl from '../shopcart/cartControl'
    export default {
        data: () => ({
            fold: true //购物车列表是否折叠,
        }),
        components: {
            cartControl
        },
        props: {
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            },
            selectfood: {
                type: Array,
                default () { //数组默认值要这么写
                    return [{
                        price: 10,
                        count: 1
                    }]
                }
            }
        },
        methods: {
            toogleShow() {
                if (!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            //清空
            empty(){
                this.selectfood.forEach((food)=>{
                    food.count=0
                })
            },
            //支付
            pay(){
                window.alert(`请支付${this.totalPrice}元`)
            }
        },
        computed: {
            //计算总价
            totalPrice() {
                let total = 0;
                this.selectfood.forEach(food => {
                    total += food.price * food.count
                })
                return total;
            },
            //计算总数量
            totalCount() {
                let count = 0;
                this.selectfood.forEach(food => {
                    count += food.count
                })
                return count;
            },
            payDesc() {
                if (this.totalPrice === 0) {
                    return `￥${this.minPrice}元起送`
                } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
                    return `还差￥${this.minPrice-this.totalPrice}元起送`
                } else if (this.totalPrice >= this.minPrice) {
                    return `去结算`
                }
            },
            listshow() { //是否显示列表
                if (!this.totalCount) { //如果总数为0
                    return false;
                }
                let show = !this.fold
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            console.log(11);
                            this.scroll = new betterScroll(this.$refs.listCon, {
                                click: true
                            })
                        } else {
                            this.scroll.refresh()
                        }
                    })
                }
                return show;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../common/css/mixin.scss';
    .wrapper {
        width: 100%;
        height: 100%;
    }
    .shopcart {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 46px;
        z-index: 50;
        background-color: #141d27;
        .content {
            display: flex;
            font-size: 0;
            color: rgba(255, 255, 255, 0.4);
            .content-left {
                flex: 1;
                .logo-wrapper {
                    display: inline-block;
                    width: 56px;
                    height: 56px;
                    position: relative;
                    top: -10px;
                    border-radius: 50%;
                    margin: 0 12px;
                    padding: 6px;
                    box-sizing: border-box;
                    background-color: #141d27;
                    position: relative;
                    z-index: -1;
                    .logo {
                        width: 44px;
                        height: 44px;
                        border-radius: 50%;
                        background-color: #2b343c;
                        font-size: 24px;
                        line-height: 44px;
                        color: #80858a;
                        text-align: center;
                        &.heightlight {
                            background-color: rgb(0, 120, 220);
                            .icon-shopping_cart {
                                color: #fff;
                            }
                        }
                    }
                    .num {
                        position: absolute;
                        top: 0;
                        right: 0;
                        background-color: rgb(240, 20, 20);
                        color: #fff;
                        line-height: 16px;
                        font-size: 9px;
                        font-weight: 700;
                        width: 24px;
                        text-align: center;
                        border-radius: 16px;
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
                    }
                }
                .price {
                    display: inline-block;
                    font-size: 16px;
                    font-weight: 700;
                    padding-right: 12px;
                    border-right: 1px solid rgba(255, 255, 255, 0.1);
                    vertical-align: top;
                    margin-top: 12px;
                    line-height: 24px;
                    &.heightlight {
                        color: #fff;
                    }
                }
                .desc {
                    display: inline-block;
                    font-size: 10px;
                    padding-left: 12px;
                    vertical-align: top;
                    margin-top: 12px;
                    line-height: 24px;
                }
            }
            .content-right {
                flex: 0 0 105px;
                width: 105px;
                .pay {
                    font-size: 12px;
                    line-height: 48px;
                    background-color: #2b333b;
                    text-align: center;
                    font-weight: 700;
                    &.heightlight {
                        background-color: #00b43c;
                        color: #fff;
                    }
                }
            }
        }
        .list-enter {
            opacity: 0;
            transform: translateY(0);
        }
        .list-enter-to {
            transform: translateY(-100%);
        }
        .list-leave {
            transform: translateY(-100%);
        }
        .list-leave-to {
            opacity: 0;
            transform: translateY(0);
        }
        .list-enter-active {
            transition: all 2s;
        }
        .list-leave-active {
            transition: all 2s;
            transform: translateY(-100%);
        }
        .shopcart-list {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: -1;
            background-color: #fff;
            .list-header {
                line-height: 40px;
                height: 40px;
                padding: 0 18px;
                background-color: #f3f5f7;
                @include border-1px(rgba(7, 17, 27, 0.1));
                .title {
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                    float: left;
                }
                .empty {
                    font-size: 12px;
                    color: rgb(0, 160, 220);
                    float: right;
                }
            }
            .list-content {
                padding: 0 18px;
                max-height: 217px;
                overflow: hidden;
                .food {
                    padding: 12px 0;
                    box-sizing: border-box;
                    position: relative;
                    @include border-1px(rgba(7, 17, 27, 0.1));
                    .name {
                        font-size: 14px;
                        line-height: 24px;
                        color: rgb(7, 17, 27)
                    }
                    .price {
                        position: absolute;
                        right: 90px;
                        bottom: 12px;
                        font-size: 14px;
                        line-height: 24px;
                        color: rgb(240, 20, 20);
                        font-weight: 700;
                    }
                    .cart-control {
                        position: absolute;
                        right: 0;
                        bottom: 6px;
                    }
                }
            }
        }
        .list-mask {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 40;
            -webkit-backdrop-filter: blur(10px);
        }
        .fade-enter,.fade-leave {
            opacity: 0;
            background-color: rgba(7, 17, 27, 0);
        }
        .fade-enter-active,.fade-leave-active {
            transition: all 0.5s;
            opacity: 1;
        }
    }
</style>