import TYPES from './mutation-types'
import { MutationTree } from 'vuex'
const mutations: MutationTree<any> = {
    [TYPES.SET_SIDEBAR_STATE] (state): void {
        state.showSiderBar = !state.showSiderBar
    },
    [TYPES.SET_LOADING_STATE] (state): void {
        state.showLoading = !state.showLoading
    },
    [TYPES.SET_SCREEN_MODEL] (state, item: boolean): void {
        state.smallScreenModel = item
    },
    [TYPES.SET_ACCOUNT_TOKEN] (state, token: string): void {
        state.token = token
    },
    [TYPES.CLEAR_ACCOUNt_TOKEN] (state): void {
        state.token = undefined
    },
    [TYPES.SET_LOGIN_STATE] (state, status: boolean): void {
        state.isLogin = status
    },
    [TYPES.SET_USER_ID] (state, userId: string): void {
        state.userId = userId
    }
}
export default mutations
