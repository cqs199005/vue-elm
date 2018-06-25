<template>
    <div class="header">
        <div class="header-warper">
            <div class="warper-img">
                <img :src="seller.avatar" width="64" height="64">
            </div>
            <div class="warper-content">
                <div v-if="seller.supports" class="support-count" @click="showDetail">
                    <span class="count">
                            {{seller.supports.length}}个
                        </span>
                    <i class="icon-keyboard_arrow_right"></i>
                </div>
                <div class="titile">
                    <span class="news"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="desClass[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
        </div>
        <div class="header-notice" @click="showDetail">
            <span class="notice-ico"></span>
            <span class="notice-content">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <transition name="fade">
            <div class="detail" v-show="detailShow">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star_wrapper">
                            <Star :size="48" :score="seller.score"></Star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li v-for="(item,index) in seller.supports" class="support-item" :key="index">
                                <span class="support-ico" :class="desClass[item.type]"></span>
                                <span class="text">{{item.description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="content">
                            <p>{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close">
                    <i class="icon-close" @click="closeDetail"></i>
                </div>
            </div>
        </transition>
       
    </div>
</template>
<script>
    import Star from '../star/star'
    export default {
        data() {
            return {
                desClass: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
                detailShow: false
            }
        },
        props: {
            seller: {
                type: Object
            }
        },
        methods: {
            showDetail() {
                this.detailShow = true;
            },
            closeDetail() {
                this.detailShow = false;
            }
        },
        components: {
            Star
        }
    }
</script>
<style lang="scss" scoped>
    /* 导入样式函数 */
    @import '../../common/css/mixin.scss';
    .header {
        color: #fff;
        background-color: rgba(7, 17, 27, 0.5);
        position: relative;
        overflow: hidden;
        .header-warper {
            padding: 24px 12px 18px 24px;
            position: relative;
            font-size: 0;
            .warper-img {
                display: inline-block;
                vertical-align: top;
                border-radius: 2px;
            }
            .warper-content {
                display: inline-block;
                font-size: 14px;
                margin-left: 16px;
                .name {
                    margin-left: 6px;
                    font-size: 16px;
                    line-height: 18px;
                    font-weight: bold;
                }
                .description {
                    margin-top: 8px;
                    margin-bottom: 10px;
                    font-size: 12px;
                    line-height: 12px;
                }
                .support {
                    .icon {
                        font-size: 0;
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        margin-right: 4px;
                        background-size: cover;
                        background-repeat: no-repeat;
                        vertical-align: top;
                        &.decrease {
                            @include bg-img('decrease_1')
                        }
                        &.discount {
                            @include bg-img('discount_1')
                        }
                        &.guarantee {
                            @include bg-img('guarantee_1')
                        }
                        &.invoice {
                            @include bg-img('invoice_1')
                        }
                        &.special {
                            @include bg-img('special_1')
                        }
                    }
                    .text {
                        font-size: 12px;
                        line-height: 12px;
                        vertical-align: top;
                    }
                }
                .support-count {
                    position: absolute;
                    right: 12px;
                    bottom: 14px;
                    padding: 0 8px;
                    border-radius: 14px;
                    background-color: rgba(0, 0, 0, 0.2);
                    line-height: 24px;
                    .icon-keyboard_arrow_right {
                        line-height: 24px;
                    }
                }
            }
        }
        .news {
            display: inline-block;
            width: 30px;
            height: 18px;
            @include bg-img('brand');
            background-size: cover;
            background-repeat: no-repeat;
            vertical-align: top;
        }
        .header-notice {
            font-size: 10px;
            padding: 9px 22px 9px 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            position: relative;
            background-color: rgba(7, 17, 27, 0.2);
            .notice-ico {
                display: inline-block;
                width: 22px;
                height: 12px;
                @include bg-img('bulletin');
                background-size: cover;
                background-repeat: no-repeat;
                vertical-align: top;
            }
            .icon-keyboard_arrow_right {
                position: absolute;
                right: 12px;
                top: 10px;
                font-size: 10px;
            }
        }
        .background {
            position: absolute;
            width: 100%;
            height: 100%;
            filter: blur(10px);
            z-index: -1;
            top: 0;
            left: 0;
        }
        .detail {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(7, 17, 27, 0.8);
            overflow: auto;
            z-index: 99;
            /* 动画 */
            &.fade-enter,&.fade-leave-to {
                opacity: 0;
            }
            &.fade-enter-active,&.fade-leave-active {
                transition: all 0.5s;
            }

            .detail-wrapper {
                min-height: 100%;
                width: 100%;
                overflow: hidden;
                .detail-main {
                    margin-top: 64px;
                    padding-bottom: 64px;
                    .name {
                        text-align: center;
                    }
                    .star_wrapper {
                        text-align: center;
                        margin-top: 18px;
                        padding: 2px 0;
                    }
                    /* 有线标题 */
                    .title {
                        display: flex;
                        width: 80%;
                        margin: 28px auto 24px auto;
                        .line {
                            flex: 1;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                            position: relative;
                            top: -6px;
                        }
                        .text {
                            padding: 0 12px;
                            font-size: 14px;
                            font-weight: 700;
                        }
                    }
                    /* 满减活动 */
                    .supports {
                        width: 80%;
                        margin: 0 auto;
                        .support-item {
                            margin-left: 12px;
                            margin-bottom: 12px;
                            .support-ico {
                                display: inline-block;
                                width: 16px;
                                height: 16px;
                                background-size: cover;
                                background-repeat: no-repeat;
                                vertical-align: top;
                                margin-right: 6px;
                                &.decrease {
                                    @include bg-img('decrease_2')
                                }
                                &.discount {
                                    @include bg-img('discount_2')
                                }
                                &.guarantee {
                                    @include bg-img('guarantee_2')
                                }
                                &.invoice {
                                    @include bg-img('invoice_2')
                                }
                                &.special {
                                    @include bg-img('special_2')
                                }
                            }
                            .text {
                                font-size: 12px;
                                line-height: 16px;
                                vertical-align: top;
                            }
                        }
                    }
                    .content {
                        width: 80%;
                        margin: 0 auto;
                        p {
                            padding: 0 12px;
                            font-size: 12px;
                            line-height: 23px;
                        }
                    }
                }
            }
            .detail-close {
                position: relative;
                font-size: 32px;
                width: 32px;
                height: 32px;
                margin: -64px auto 0 auto;
                clear: both;
            }
        }
    }
</style>