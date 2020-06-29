/*
 * @Author: majiaao
 * @Date: 2020-04-26 14:27:15
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-29 20:59:23
 * @Description: file content
 */
const Utils = {
    isObjectValueAvaiable(obj: Record<string, any>): boolean {
        let flag = true
        for (const key in obj) {
            // @ts-ignore
            if (typeof obj[key] == 'object') {
                const result = Utils.isObjectValueAvaiable(obj[key])
                if (!result) {
                    return result
                }
            }else {
                if (typeof obj[key] == 'undefined') {
                    flag = false
                }
                if (typeof obj[key] == 'string' && obj[key] == '') {
                    flag = false
                }
            }
        }
        return flag
    },
    isObjectValueEquality (obj1: any, obj2: any): boolean {
        if (Object.keys(obj1).length != Object.keys(obj2).length) return false
        let bool = true
        const keysList = Object.keys(obj1)
        keysList.forEach(item => {
            if (obj1[item] != obj2[item]) {
                bool = false
            }
        })
        return bool
    },
    isObject (obj: any): boolean {
        return Object.prototype.toString.call(obj) === '[object Object]'
    },
    objDelayering (obj: any): any {
        const delayerObj: any = {}
        if (!Utils.isObject(obj)) {
            throw new Error('输入参数类型有误')
            return
        }else {
            const keys = Object.keys(obj)
            keys.forEach(((item: any) => {
                if (Utils.isObject(obj[item])) {
                    
                }else {
                    delayerObj[item] = obj[item]
                }
            }))
            return delayerObj
        }
    }
} 
export default Utils