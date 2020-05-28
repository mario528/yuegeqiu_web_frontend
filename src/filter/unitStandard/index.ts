import Vue from 'vue'
Vue.filter('unitStandard', (num: number) => {
    let result = [ ], counter = 0;
    const numList = (num || 0).toString().split('');
    for (let i = numList.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(numList[i]);
        if (!(counter % 3) && i != 0) { result.unshift(','); }
    }
    return result.join('')
})