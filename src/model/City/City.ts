/*
 * @Author: majiaao
 * @Date: 2020-04-25 23:25:42
 * @LastEditors: majiaao
 * @LastEditTime: 2020-04-25 23:37:49
 * @Description: file content
 */
import { Url } from '../../utils/index'
interface cityData {
    code: string;
}
class City {
    constructor () {}
    getProvinces () {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.GET_PROVINCES, {}).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    getCities (params: cityData) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.GET_CITIES, {
                params
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    getDistricts (params: cityData) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.GET_DISTRICTS, {
                params
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    
}
export default City
