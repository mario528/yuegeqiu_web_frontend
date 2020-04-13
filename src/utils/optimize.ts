class Optimize {
    public timer: any;
    public processTime!: number;
    constructor () {
    }
    // 防抖
    public debounce (fn: any, delay = 2000) {
        let timer: any;
        return function () {
            if (timer) clearTimeout(timer)
            else {
                timer = setTimeout(() => {
                    fn
                }, delay);
            }

        }

    }
    // 函数节流
    public throttle (fn: any, delay = 2000) {
        let timer: any;
        let startTime: number = +new Date()
        return function () {
            const currentTime: number = +new Date();             
            const remaining = delay - (currentTime - startTime);  
            clearTimeout(timer)
            if (remaining > 0) {
                timer = setTimeout(fn, remaining);
            }else {
                fn()
                startTime = +new Date();
            }
            if (!timer) {
                timer = setTimeout(()=> {
                    fn()
                    clearTimeout(timer)
                },delay)
            }
        }
    }
}
export default Optimize