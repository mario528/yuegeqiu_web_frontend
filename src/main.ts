// register router hooks
require('./utils/registerHooks')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import http from './model/Http/http'
import UpArrow from './components/UpArrow.vue'
import Header from './components/Header.vue'
import SideBar from "@/components/Sidebar.vue";
import Footer from '@/components/Footer.vue'

import {
  Carousel,
  CarouselItem,
  Image
} from 'element-ui'
import Loading from './components/Loading/libs/loading'

Vue.config.productionTip = false
Vue.prototype.$http = http


Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Loading)
Vue.use(Image)
// 自定义组件
Vue.component('up-arrow', UpArrow)
Vue.component('nav-header', Header)
Vue.component('side-bar', SideBar)
Vue.component('footer-area', Footer)

// add router navigation keeper
router.beforeEach((to, from, next) => {
  console.log("路由开始载入")
  // @ts-ignore
  Vue.$selfLoading.show()
  next()
})
router.afterEach((to, from) => {
  console.log("路由载入完成")
  // @ts-ignore
  Vue.$selfLoading.hide()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
