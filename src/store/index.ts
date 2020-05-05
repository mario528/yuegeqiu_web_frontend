import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'
interface State {
    showSiderBar: boolean;
    showLoading: boolean;
    isLogin: boolean;
    smallScreenModel: boolean;
    token: string | undefined;
    userId: string | undefined;
    loginOrRegisterState: number;
}
const state: State = {
    showSiderBar: false,
    showLoading: false,
    isLogin: false,
    smallScreenModel: false,
    token: undefined,
    userId: undefined,
    loginOrRegisterState: Number(0)
}
Vue.use(Vuex)
export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})