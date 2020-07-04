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
  },
  getScreenModel (state): boolean {
    return state.smallScreenModel
  },
  getAccountToken (state): any {
    return state.token
  },
  getUserId (state): string | undefined {
    return state.userId || localStorage.getItem('User_ID')
  },
  getLoginOrRegisterState (state): number {
    return state.loginOrRegisterState
  },
  getOnlineNumbers (state): number {
    return state.onlineNumber
  },
  getRegisterTeamNumber (state): number {
    return state.registerTeamNumber
  },
  getRegisterUserNumber (state): number {
    return state.registerUserNumber
  }
}

export default getters