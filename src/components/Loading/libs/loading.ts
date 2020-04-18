import Vue from 'vue'
// @ts-ignore
import Loading from '../Loading.vue'

const LoadingConstructor = Vue.extend(Loading) 
const instance: any = new LoadingConstructor({
    el: document.createElement('div')
})
instance.showLoading = false
const LoadingMethods = {
    show () {
        instance.showLoading = true
        document.body.appendChild(instance.$el)
    },
    hide () {
        instance.showLoading = false
    }
}
export default {
    install () {
        // @ts-ignore
        if (!Vue.$selfLoading) {
            // @ts-ignore
            Vue.$selfLoading = LoadingMethods
        }
        Vue.mixin({
            created () {
                // @ts-ignore
                this.$selfLoading = Vue.$selfLoading
            }
        })
    }
}