/*
 * @Author: majiaao
 * @Date: 2020-04-26 14:27:15
 * @LastEditors: majiaao
 * @LastEditTime: 2020-04-26 16:39:17
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
    }
} 
export default Utils