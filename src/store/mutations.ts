import TYPES from './mutation-types'
import { MutationTree } from 'vuex'
const mutations: MutationTree<any> = {
    [TYPES.SET_SIDEBAR_STATE] (state): void {
        state.showSiderBar = !state.showSiderBar
    },
    [TYPES.SET_LOADING_STATE] (state): void {
        state.showLoading = !state.showLoading
    }
}
export default mutations
