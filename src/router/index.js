import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
import seller from '@/components/seller/seller.vue'
import goods from '@/components/goods/goods.vue'
import ratings from '@/components/ratings/ratings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path:'/',redirect:'/goods'},
    { path:'/seller',component:seller },
    { path:'/goods',component:goods },
    { path:'/ratings',component:ratings },
  ],
  linkActiveClass:"active"
})