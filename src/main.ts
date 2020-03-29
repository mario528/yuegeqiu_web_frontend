import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import http from './model/Http/http'
import {
  Carousel,
  CarouselItem
} from 'element-ui'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.use(Carousel)
Vue.use(CarouselItem)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
