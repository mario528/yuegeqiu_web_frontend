import { GetterTree } from 'vuex'

const getters: GetterTree<any, any> = {
  getSiderBarState(state): boolean {
      return state.showSiderBar
  },
  getLoadingState (state): boolean {
    return state.showLoading
  },
  getLoginState (state): boolean {
    return state.isLogin
  }
}

export default getters