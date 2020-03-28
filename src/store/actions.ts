import { ActionTree } from 'vuex'
import TYPES from './mutation-types'
const actions: ActionTree<any, any> = {
    async handleSiderBar({ state, commit }) {
        commit(TYPES.SET_SIDEBAR_STATE)
    },
    async handleLoadingState ({state, commit}) {
        commit(TYPES.SET_LOADING_STATE)
    }
}
export default actions