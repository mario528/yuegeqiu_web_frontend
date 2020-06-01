/*
 * @Author: majiaao
 * @Date: 2020-06-01 15:22:02
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-01 15:28:28
 * @Description: file content
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import AMap from "AMap";
class MapUtils {
    constructor() {

    }
    public getUserLoactionByIp() {
        return new Promise((reslove, reject) => {
            AMap.plugin('AMap.CitySearch', function () {
                const citySearch = new AMap.CitySearch()
                citySearch.getLocalCity((status: any, result: any) => {
                    if (status === 'complete' && result.info === 'OK') {
                        // 查询成功，result即为当前所在城市信息
                        reslove(result)
                    }else {
                        reject()
                    }
                })
            })
        })
    }
}
export default new MapUtils()