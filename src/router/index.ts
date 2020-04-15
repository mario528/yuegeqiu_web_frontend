import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component:  () => import('../views/Home.vue')
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('../views/Team.vue')
  },
  {
    path: '/mall',
    name: 'Mall',
    component: () => import('../views/Mall/Mall.vue')
  },
  {
    path: '/user/:userId',
    name: 'userCenter',
    component: () => import('../views/User/UserCenter.vue')
  },
  {
    path: '*',
    name: "notFoundPage",
    component: () => import('../views/NotFound.vue')
  }
]

// this will return an new VueRouter instance
export default new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
