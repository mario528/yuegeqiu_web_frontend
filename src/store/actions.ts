import { ActionTree } from 'vuex'
import TYPES from './mutation-types'
const actions: ActionTree<any, any> = {
    async handleSiderBar({ state, commit }) {
        commit(TYPES.SET_SIDEBAR_STATE)
    },
    async handleLoadingState ({state, commit}) {
        commit(TYPES.SET_LOADING_STATE)
    },
    async handleScreenModel ({state, commit}, data: boolean) {
        commit(TYPES.SET_SCREEN_MODEL, data)
    },
    async handleSetAccountToken ({state, commit}, token: string | undefined) {
        commit(TYPES.SET_ACCOUNT_TOKEN, token)
    },
    async handleClearAccountToken ({state, commit}) {
        commit(TYPES.CLEAR_ACCOUNT_TOKEN)
    },
    async handleSetLoginState ({state, commit}, data: boolean) {
        commit(TYPES.SET_LOGIN_STATE, data)
    },
    async handleSetUserId ({state, commit}, userId: string | undefined) {
        commit(TYPES.SET_USER_ID, userId)
    },
    async handleLoginOrRegisterState ({state, commit}, dialogState: number) {
        commit(TYPES.SET_LOGIN_OR_REGISTER_STATE, dialogState)
    },
    async handleChangeOnlineNumber ({state, commit}, onlineNumber: number) {
        commit(TYPES.SET_ONLINE_NUMBERS, onlineNumber)
    },
    async handleAddUserRegisterNumber ({ state, commit }, userNumber: number) {
        commit(TYPES.SET_REGISTER_USER_NUMBER, userNumber)
    },
    async handleAddTeamRegisterNumber ({state, commit}, teamNumber: number) {
        commit(TYPES.SET_REGISTER_TEAM_NUMBER, teamNumber)
    }
}
export default actions