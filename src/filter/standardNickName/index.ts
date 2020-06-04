import Vue from 'vue'
Vue.filter('standardNickName', (nickName: string | undefined | null) => {
    if (nickName) {
        if (nickName.length > 7) return nickName.slice(0,7) + '...'
        else return nickName
    }else return ''
})