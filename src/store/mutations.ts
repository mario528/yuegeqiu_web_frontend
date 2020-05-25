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
    [TYPES.CLEAR_ACCOUNT_TOKEN] (state): void {
        state.token = undefined
    },
    [TYPES.SET_LOGIN_STATE] (state, status: boolean): void {
        state.isLogin = status
    },
    [TYPES.SET_USER_ID] (state, userId: string): void {
        state.userId = userId
    },
    [TYPES.SET_LOGIN_OR_REGISTER_STATE] (state, dialogState: number): void {
        state.loginOrRegisterState = dialogState
    },
    [TYPES.SET_ONLINE_NUMBERS] (state, onlineNumber: number): void {
        state.onlineNumber = onlineNumber
    }
}
export default mutations
