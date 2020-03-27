import TYPES from './mutation-types'
import { MutationTree } from 'vuex'
const mutations: MutationTree<any> = {
    [TYPES.GET_SIDEBAR_STATE] (state): void {
        state.showSiderBar = !state.showSiderBar
    }
}
export default mutations
