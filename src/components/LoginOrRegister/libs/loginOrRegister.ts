import Vue from 'vue'
// @ts-ignore
import LoginOrRegister from '../LoginOrRegister.vue'

let LoginOrRegisterConstructor = Vue.extend(LoginOrRegister)
let instance: any = new LoginOrRegisterConstructor({
    el: document.createElement('div')
})
instance.dialogState = 1
instance.showDialog = false

let loginOrRegisterMethods = {
    changeDialogState () {
        instance.showDialog = !instance.showDialog
        document.body.appendChild(instance.$el)
    }
} 


export default {
    install () {
        // @ts-ignore
        if (!Vue.$loginDialog) {
            // @ts-ignore
            Vue.$loginDialog = loginOrRegisterMethods
        }
        Vue.mixin({
            created () {
                // @ts-ignore
                this.$loginDialog = Vue.$loginDialog
            }
        })
    }
}