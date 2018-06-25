<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menu">
            <ul>
                <li class="menu-item" v-for="(item,index) in goods" :key="index" :class="{'current':currentIndex===index}" @click="current(index)">
                    <span class="text">
                        <span v-if="item.type>= 0" class="ico" :class="desClass[item.type]"></span> {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foods">
            <ul>
               <li v-for="item in goods" :key="item.name" class="itemList foodlist">
                   <h2 class="title">{{item.name}}</h2>
                   <ul>
                       <li v-for="(food, index) in item.foods" :key="index" class="foodList" @click="selectfood(food)">
                           <div class="pic">
                               <img :src="food.icon" alt="">
                           </div>
                           <div class="content">
                               <h3 class="name">{{food.name}}</h3>
                               <p v-show="food.description" class="desc">{{food.description}}</p>
                               <div class="count">
                                   <span>月售{{food.sellCount}}份</span>
                                   <span>好评率{{food.rating}}%</span>
                               </div>
                               <div class="price">
                                   <span class="now">￥{{food.price}}</span>
                                   <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                               </div>
                               <div class="cartControl-wrapper">
                                   <cartControl :food="food"></cartControl>
                               </div>
                           </div>
                       </li>
                   </ul>
               </li>
            </ul>
        </div>
        <food :food="selFood" ref="food"></food>
        <shopCart :selectfood="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopCart>
    </div>
</template>
<script>
//引入better-scroll 滚动插件
import betterScroll from 'better-scroll'
//导入购物车组件
import shopCart from '../shopcart/shopcart'
//导入购买数量组件
import cartControl from '../shopcart/cartControl'
//导入商品详情组件
import food from '../foods/food'
    export default {
        data: () => ({
            desClass: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
            goods: [],
            foodsHeights:[],
            scrollY:0,
            selFood:{}
        }),
        props:['seller'],
        created() {
            //请求商品数据
            this.$http.get('api/goods').then(res => res.body).then(res => {
                if (res.errno === 0) {
                    this.goods = res.data;
                    console.log(res);
                    //DOM渲染完后才执行
                    this.$nextTick(function(){
                        //调用初始化滚动
                        this.initScroll();
                        //调用计算高度方法
                         this.getHeight();
                    })
                }
            })
        },
        mounted(){
        },
        components: {
            shopCart,
            cartControl,
            food
        },
        methods:{
            current(index){
                const foodsList = this.$refs.foods.getElementsByClassName('foodlist')
                //获取点击菜单所对应的foods的Li
                const el = foodsList[index];
                //使用better-scroll的方法进行滚到到指定元素位置
                this.foodsScroll.scrollToElement(el,300);
            },
            //初始化滚动
            initScroll() {
                this.menuScroll = new betterScroll(this.$refs.menu,{
                    click:true
                })
                this.foodsScroll = new betterScroll(this.$refs.foods,{
                    probeType:3,
                     click:true
                })
                //当foods滚动时,触发事件
                this.foodsScroll.on('scroll',(pos)=>{
                    //获取Y方向滚动出去的距离
                    this.scrollY = Math.abs(Math.round(pos.y)); 
                })
            },
            //获取每个food的高度,并且存入数组里
            getHeight() {
                //获取foods的每个Li 
                const foodsList = this.$refs.foods.getElementsByClassName('foodlist')
                let height = 0;  //第一个高度是0
                this.foodsHeights.push(height);
                //循环出每一个height
                for(var i = 0; i < foodsList.length; i++) {
                    height += foodsList[i].clientHeight
                    this.foodsHeights.push(height);                   
                }
            },
            selectfood(food) {
                console.log(123);
                this.selFood = food;
                //调用组件的方法
                this.$refs.food.show();
            }
        },
        computed:{
            currentIndex(){
                for(let i =0;i<this.foodsHeights.length;i++){
                    let h1 = this.foodsHeights[i];
                    let h2 = this.foodsHeights[i+1];
                    if(!h2 || (this.scrollY>=h1&&this.scrollY<h2)) {
                        return i
                    }
                }
                return 0
            },
            //计算选择的food
            selectFoods(){
                let foods = [];
                this.goods.forEach(good=>{
                    good.foods.forEach(food=>{
                        if(food.count) {
                            foods.push(food)
                        }
                    })
                })
                return foods;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../common/css/mixin.scss';
    .goods {
        display: flex;
        position: absolute;
        top: 177px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;
        .menu-wrapper {
            flex: 0 0 80px;
            width: 80px;
            background-color: #f3f5f7;
            .current {
                background-color: #fff;
                position: relative;
                margin-top: -1px;
                z-index: 10;
                font-weight: 700;
                .text {
                    @include border-none();
                }
            }
            .menu-item {
                width: 56px;
                height: 54px;
                display: table;
                line-height: 14px;
                padding: 0 12px;
                .ico {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    background-size: cover;
                    background-repeat: no-repeat;
                    vertical-align: top;
                    &.decrease {
                        @include bg-img('decrease_3')
                    }
                    &.discount {
                        @include bg-img('discount_3')
                    }
                    &.guarantee {
                        @include bg-img('guarantee_3')
                    }
                    &.invoice {
                        @include bg-img('invoice_3')
                    }
                    &.special {
                        @include bg-img('special_3')
                    }
                }
                .text {
                    width: 56px;
                    display: table-cell;
                    vertical-align: middle;
                    font-size: 12px;
                    line-height: 14px;
                    @include border-1px(rgba(7, 17, 27, 0.1));
                }
            }
        }
        .foods-wrapper {
            flex: 1;
            .itemList {
                .title {
                    font-size: 12px;
                    color: rgb(147, 153, 159);
                    height: 26px;
                    line-height: 26px;
                    padding-left: 14px;
                    background-color: #f3f5f7;
                    border-left: 1px solid #d9dde1;
                }
                .foodList {
                    margin: 0 18px;
                    padding: 18px 0;
                    display: flex;
                    @include border-1px(rgba(7, 17, 27, 0.1));
                    &:last-child {
                        @include border-none;
                    }
                    .pic {
                        flex: 0 0 57px;
                        img {
                            width: 57px;
                            height: 57px;
                            margin-right: 10px;
                        }
                    }
                    .content {
                        flex: 1;
                        .name {
                            font-size: 14px;
                            color: rgb(7, 17, 27);
                            margin-top: 2px;
                            margin-bottom: 8px;
                        }
                        .desc {
                            margin-bottom: 8px;
                            font-size: 10px;
                            line-height: 12px;
                            color: rgb(147, 153, 159);
                        }
                        .count {
                            font-size: 10px;
                            line-height: 10px;
                            color: rgb(147, 153, 159);
                            span {
                            margin-right: 12px;
                            }
                        }
                        .price {
                            line-height: 24px;
                            font-weight: 700;
                            .now {
                                font-size: 14px;
                                color: rgb(240,20,20);
                            }
                            .old {
                                font-size: 10px;
                                color: rgb(147, 153, 159);
                                text-decoration: line-through;
                            }
                        }
                        .cartControl-wrapper {
                            position: absolute;
                            right: 0;
                            bottom: 12px;
                        }
                    }
                }
            }
        }
    }
</style>