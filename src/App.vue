<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <div class="naver">
      <router-link class="item" to="/goods" tag="div">商品</router-link>
      <router-link class="item" to="/ratings" tag="div">评论</router-link>
      <router-link class="item" to="/seller" tag="div">商家</router-link>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import Header from './components/header/header'
  export default {
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('api/seller').then(res => res.body).then(res => {
        if (res.errno === 0) {
          this.seller = res.data
        }
      })
    },
    components: {
      Header
    }
  }
</script>

<style lang="scss" scoped>
  @import './common/css/mixin.scss';
  #app {
    .naver {
      display: flex;
      height: 40px;
      line-height: 40px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      .item {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
</style>
