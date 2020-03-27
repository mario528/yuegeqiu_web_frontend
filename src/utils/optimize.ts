class Optimize {
    constructor () {}
    // 防抖
    debounce (fn: any, delay = 200) {
        let timer: any
            ,that: any = this
        return function () {
            if (timer) {
                clearTimeout(timer)
            }else {
                timer = setTimeout(() => {
                    fn.call(that)
                }, delay)
            }
        }
    }
}
export {
    Optimize
}