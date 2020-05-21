import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component:  () => import('@/views/Home.vue')
  },
  {
    path: '/team',
    name: 'Team',
    meta: {
      title: '球队'
    },
    component: () => import('@/views/Team/Team.vue')
  },
  {
    path: '/mall',
    name: 'Mall',
    meta: {
      title: '商城'
    },
    component: () => import('@/views/Mall/Mall.vue')
  },
  {
    path: '/user/center',
    redirect: '/user/center/team',
    name: 'userCenter',
    children: [
      {
        path: 'history',
        name: 'UserCenterBoughtHistory',
        component: () => import('@/views/User/UserCenter/UserCenterHistory.vue')
      },
      {
        path: 'message',
        name: 'UserCenterDynamic',
        component: () => import('@/views/User/UserCenter/UserCenterDynamic.vue')
      },
      {
        path: 'team',
        name: 'UserCenterTeam',
        component: () => import('@/views/User/UserCenter/UserCenterTeam.vue')
      },
    ],
    meta: {
      title: '个人中心',
      // this page need user login
      requireAuth: true
    },
    component: () => import('@/views/User/UserCenter/UserCenter.vue')
  },
  {
    path: '/user/relation',
    name: 'FriendRelationShip',
    component: () => import('@/views/User/FriendRelationShip.vue'),
    meta: {
      requireAuth: true  
    }
  },
  {
    path: '/user/setting',
    name: 'userSetting',
    component: () => import('@/views/User/UserSetting.vue'),
    meta: {
      title: '帐号管理',
      // this page need user login
      requireAuth: true  
    }
  },
  {
    path: '/user/info/complete',
    name: 'completeInfo',
    component: () => import('../views/User/UserRegisterInfo.vue'),
    meta: {
      title: '完善信息',
      // this page need user login
      requireAuth: true
    }
  },
  {
    path: '/user/info/update',
    name: 'updateInfo',
    component: () => import('../views/User/UserUpdateInfo.vue'),
    meta: {
      title: '修改个人信息',
      // this page need user login
      requireAuth: true
    }
  },
  {
    path: '/team/create',
    name: 'createTeam',
    component: () => import('../views/Team/TeamCreate.vue'),
    meta: {
      title: '创建球队',
      requireAuth: true
    }
  },
  {
    path: '/team/search',
    name: 'teamSearch',
    component: () => import('../views/Team/TeamSearch.vue'),
    meta: {
      title: '搜索球队'
    }
  },
  {
    path: '/team/detail',
    name: 'teamDetail',
    component: () => import('../views/Team/TeamDetail.vue'),
    meta: {
      title: '球队详情'
    }
  },
  {
    path: '/match/create',
    name: 'createMatch',
    component: () => import('../views/Match/CreateMatch.vue'),
    meta: {
      title: '创建赛事',
      requireAuth: true
    }
  },
  {
    path: '/chat',
    name: 'chatHome',
    component: () => import('../views/Chat/Home.vue'),
    meta: {
      title: '论坛'
    }
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
