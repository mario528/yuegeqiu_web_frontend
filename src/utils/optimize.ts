class Optimize {
    public timer: any;
    public processTime!: number;
    constructor () {
    }
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
    // 函数节流
    processFunc (fn: any, delay = 2) {
        const currentTimeStemp = +new Date()
        if (currentTimeStemp - this.processTime < delay * 1000) {
            fn()
            this.processTime = currentTimeStemp
            clearTimeout(this.timer)
        }else {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                fn()
            }, delay * 1000);
        }
    }
}
export default Optimize