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
    }
}
export default actions