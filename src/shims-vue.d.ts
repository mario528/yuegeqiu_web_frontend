import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
declare module '*.vue' {
  export default Vue
}
declare module 'vue/types/vue' {
  interface Vue {
    $http: any,
    $router: VueRouter,
    $route: Route,
    $urls: any,
    $selfLoading: any
  }
}

declare module "element-ui"