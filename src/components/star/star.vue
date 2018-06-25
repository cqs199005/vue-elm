<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass,index) in itemClasses" class="star_item" :class="itemClass" :key="index"></span>
    </div>
</template>
<script>
const length = 5; //星星的长度
const ON = 'on' //全星
const HALF = 'half' //半星
const OFF = 'off' //无星
    export default {
        data: () => ({
        }),
        props: ['score', 'size'],
        components: {},
        computed: {
            starType() {
                return 'star_' + this.size;
            },
            itemClasses() {
                const result =[]
                const score = Math.floor(this.score*2)/2  //将分数化为0.5倍数的分数
                const ifDecimals = score%1 !== 0 //判断是否有小数
                const scoreLength = Math.floor(score) //全星有几个
                for(var i=0;i<scoreLength;i++) {  //添加全星
                    result.push(ON);
                }
                //添加半星
                if(ifDecimals) {
                    result.push(HALF);
                }
                //添加空星
                while(result.length<length){
                    result.push(OFF)
                }
                return result
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../common/css/mixin.scss';
    .star {
        font-size: 0;
        .star_item {
            background-repeat: no-repeat;
            display: inline-block;
            background-size: cover;
        }
        &.star_48 {
            .star_item {
                width: 20px;
                height: 20px;
                margin-right: 22px;
                &:last-of-type {
                    margin-right: 0;
                }
                &.on {
                    @include bg-img('star48_on')
                }
                &.half {
                    @include bg-img('star48_half')
                }
                &.off {
                    @include bg-img('star48_off')
                }
            }
        }
        &.star_36 {
            .star_item {
                width: 15px;
                height: 15px;
                margin-right: 6px;
                &:last-of-type {
                    margin-right: 0;
                }
                &.on {
                    @include bg-img('star36_on')
                }
                &.half {
                    @include bg-img('star36_half')
                }
                &.off {
                    @include bg-img('star36_off')
                }
            }
        }
        &.star_24 {
            .star_item {
                width: 10px;
                height: 10px;
                margin-right: 3px;
                &:last-of-type {
                    margin-right: 0;
                }
                &.on {
                    @include bg-img('star24_on')
                }
                &.half {
                    @include bg-img('star24_half')
                }
                &.off {
                    @include bg-img('star24_off')
                }
            }
        }
    }
</style>