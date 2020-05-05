/*
 * @Author: majiaao
 * @Date: 2020-04-30 22:08:23
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-04 16:53:33
 * @Description: file content
 */
import { Url } from '../../utils/index'
interface Location {
    province?: string;
    city?: string;
    district?: string;
}
interface CreateTeamInterface {
    team_name: string;
    location: Location;
    team_description: string;
    team_activity_location_detail: string;
    user_id: string;
}
interface GetUserTeamInfo {
    user_id: string;
}
class Team {
    constructor() {}
    crateTeam (params: CreateTeamInterface) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.CREATE_TEAM, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    getUserTeamInfo (params: GetUserTeamInfo) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.USER_TEAM_INFO, {
                params
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
}
export default Team
