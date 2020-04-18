// @ts-nocheck
interface EventEmmitterInterface {
    handler: any;
    on(eventName: string, fn: () => any, once: boolean): any;
    once(eventName: string, fn: () => any): any;
    emit(eventName: string, cb: () => any): any;
    off(eventName: string, cb: () => any): any;
    listeners(eventName: string): number;
}
class EventEmmitter implements EventEmmitterInterface {
    constructor() {
        this.handler = {}
    }
    on(eventName: string, fn: () => any, once = false): any {
        let handlerList = this.handler[eventName] || []
        if (once) {
            handlerList = [() => {
                fn.call(this)
                this.$off(eventName)
            }]
        } else {
            handlerList.push(fn)
        }
        this.handler[eventName] = handlerList
        return this
    }
    once(eventName: string, cb: () => any): any {
        this.$on(eventName, cb, true)
    }
    emit(eventName: string): any {
        if (this.handler[eventName] && this.handler[eventName].length != 0) {
            try {
                this.handler[eventName].forEach((item: any) => {
                    item()
                })
            } catch (error) {
                throw new Error(error)
            }
        }
        return this
    }
    off(eventName: string): any {
        if (this.handler[eventName]) {
            this.handler[eventName] = null
        }
        return this
    }
    listeners(eventName: string): number {
        if (!this.handler[eventName]) {
            return 0
        }
        return this.handler[eventName].length
    }
}
export default EventEmmitter