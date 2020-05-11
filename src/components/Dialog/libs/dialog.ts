/*
 * @Author: majiaao
 * @Date: 2020-05-11 16:05:11
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-11 16:43:20
 * @Description: file content
 */
import Vue from 'vue'
// @ts-ignore
import Dialog from '../DialogComponent.vue'
const DialogConstrucor = Vue.extend(Dialog)
let instance: any = new DialogConstrucor({
    el: document.createElement('div')
})
// @ts-ignore
instance.showDialog = false
const dialogMethods = {
    showDialog () {
        instance.showDialog = true
        document.body.appendChild(instance.$el)
    },
    closeDialog () {
        instance.showDialog = false
    }
}
export default {
    install () {
        // @ts-ignore
        if (!Vue.$selfDialog) {
            // @ts-ignore
            Vue.$selfDialog = dialogMethods
        }
        Vue.mixin({
            created () {
                // @ts-ignore
                this.$selfDialog = Vue.$selfDialog
            }
        })
    }
}