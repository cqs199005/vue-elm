<template>
    <div class="cartControl">
        <transition name="dec">
            <div class="decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreasr"></div>        
        </transition>
        <div class="count" v-show="food.count>0">{{food.count}}</div>
        <div class="add icon-add_circle" @click.stop.prevent="addCount"></div>
    </div>
</template>
<script>
import Vue from 'vue'
 export default {
   data: ()=>({
   }),
   props:{
       food:{
           type:Object
       }
   },
   components: {
   },
   methods: {
       addCount(){
           if(!this.food.count) {
               Vue.set(this.food,'count',1)
           }else {
               this.food.count++;
           }
       },
       decreasr(){
           this.food.count--;
       }
   }
 }
</script>
<style lang="scss" scoped>
 .cartControl {
     .decrease,.add {
         padding: 6px;
         display: inline-block;
         font-size: 24px;
         line-height: 24px;
         color: rgb(0, 160 , 220)
     }
     .count {
         display: inline-block;
         width: 12px;
         text-align: center;
         line-height: 24px;
         font-size: 10px;
         color: rgb(147, 153, 159);
         vertical-align: top;
         padding-top: 6px;
     }
     .dec-enter,.dec-leave-to {
         opacity: 0;
         transform: translate3d(48px,0,0) rotate(180deg);
     }
     .dec-enter-active,.dec-leave-active {
         transition: all 0.5s linear;
     }
 }
</style>