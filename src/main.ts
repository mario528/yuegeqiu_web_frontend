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
  CarouselItem
} from 'element-ui'

Vue.config.productionTip = false
Vue.prototype.$http = http


Vue.use(Carousel)
Vue.use(CarouselItem)
// 自定义组件
Vue.component('up-arrow', UpArrow)
Vue.component('nav-header', Header)
Vue.component('side-bar', SideBar)
Vue.component('footer-area', Footer)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
