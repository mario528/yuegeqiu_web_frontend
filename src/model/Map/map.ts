/*
 * @Author: majiaao
 * @Date: 2020-06-01 17:48:25
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-01 17:56:27
 * @Description: file content
 */ 
import Vue from 'vue'
import { Url } from '../../utils/index'
interface GetTeamMap {
    city: string;
}
class MapType {
    constructor () {}
    getTeamMap (params: GetTeamMap) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.GET_TEAM_MAP, {
                params
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
}
export default new MapType();