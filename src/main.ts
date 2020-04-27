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
import LoginOrRegister from '@/components/LoginOrRegister.vue'

import {
  Carousel,
  CarouselItem,
  Image,
  Notification,
  Steps,
  Step,
  Radio,
  RadioGroup,
  Select,
  Option,
  OptionGroup,
  Upload,
  MessageBox,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from 'element-ui'
import Loading from './components/Loading/libs/loading'
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$notify = Notification
Vue.prototype.$msgbox = MessageBox
// register a event handler
import { EventHandler } from './utils/index'
// @ts-ignore
Vue.$event = new EventHandler()
Vue.mixin({
  created() {
    // @ts-ignore
    this.$event = Vue.$event
  }
})

import dynamicDirectives from './directive/dynamicDirective'
// register custom vue-directive
dynamicDirectives(['inputFilterSpace','inputFocus'])

// 引用Element-ui plugins
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Image)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Upload)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
// 自定义插件
Vue.use(Loading)
// 自定义组件
Vue.component('up-arrow', UpArrow)
Vue.component('nav-header', Header)
Vue.component('side-bar', SideBar)
Vue.component('footer-area', Footer)
Vue.component('login-register', LoginOrRegister)
// add router navigation keeper
router.beforeEach((to, from, next) => {
  console.log("路由开始载入")
  // @ts-ignore
  Vue.$selfLoading.show()
  if (to.meta.requireAuth && !localStorage.getItem('Authorization')) {
    Vue.nextTick(() => {
      Vue.prototype.$notify.error({
        title: 'Error',
        message: '请登录'
      })
      router.push('/')
    })
  }
  if (localStorage.getItem('Authorization') && to.meta.requireAuth) {
    // @ts-ignore
    Vue.prototype.$http.get('/api/v1/token/state', {
      params: {
        token: localStorage.getItem('Authorization')
      }
    }).then((res: any) => {
      next()
    }).catch((err: any) => {
      setTimeout(() => {
        if (err.response.status == 401) {
          Vue.prototype.$notify.error({
              title: 'Error',
              message: '登陆状态失效'
          })
        }
      }, 300);
      next()
    })
  }else {
    next()
  }
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
