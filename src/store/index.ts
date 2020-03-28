import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'
interface State {
    showSiderBar: boolean;
    showLoading: boolean;
}
const state: State = {
    showSiderBar: false,
    showLoading: true
}
Vue.use(Vuex)
export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})