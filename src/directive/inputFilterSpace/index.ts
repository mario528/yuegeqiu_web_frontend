import Vue from 'vue'
Vue.directive('filter-space', {
    update(detail) {
        // @ts-ignore
        detail.value = detail.value.replace(/\s+/g, '')
    }
})
