// register router hooks
require('./utils/registerHooks')
import Vue from 'vue'
import AmapVue from '@amap/amap-vue'
import socketio from 'socket.io-client'
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
  ColorPicker,
  Calendar,
  TimeSelect,
  Autocomplete,
  Pagination,
  DatePicker,
  InputNumber,
  Form,
  FormItem,
  Table,
  TableColumn,
} from 'element-ui'
import Loading from './components/Loading/libs/loading'
import Dialog from './components/Dialog/libs/dialog'
// add websocket
const io = socketio('http://localhost:3000')
// const io = socketio('http://101.201.142.182:3000')

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$notify = Notification
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$socket = io
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
Vue.use(ColorPicker)
Vue.use(Calendar)
Vue.use(TimeSelect)
Vue.use(Autocomplete)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
// 自定义插件
Vue.use(Loading)
Vue.use(Dialog)
// 自定义组件
Vue.component('up-arrow', UpArrow)
Vue.component('nav-header', Header)
Vue.component('side-bar', SideBar)
Vue.component('footer-area', Footer)
Vue.component('login-register', LoginOrRegister)
// add amap
AmapVue.config.key = 'f45c4c21a6db14cbc4c7e3721129bd10'
Vue.use(AmapVue)
// add router navigation keeper
router.beforeEach((to, from, next) => {
  console.log("路由开始载入")
  // @ts-ignore
  Vue.$selfLoading.show()
  if (to.meta.title) document.title = to.meta.title
  else document.title = '约个球'
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
io.on('connect', (socket: any) => {
  console.log('链接成功')
})
io.on('onlineNumber', (params: any) => {
  store.commit('SET_ONLINE_NUMBERS', params.online_number)
})
io.on('addUser', (params: any) => {
  store.commit('SET_REGISTER_USER_NUMBER', params.user_number)
})
io.on('addTeam', (params: any) => {
  store.commit('SET_REGISTER_TEAM_NUMBER', params.team_number)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
