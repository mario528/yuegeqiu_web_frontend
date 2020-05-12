/*
 * @Author: majiaao
 * @Date: 2020-04-30 22:08:23
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-12 17:07:48
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
    home_court_color: string;
    away_court_color: string;
    user_id: string;
}
interface GetUserTeamInfo {
    user_id: string;
}
interface GetTeamDetail {
    team_id: string | number;
    user_id: string | number;
}
interface UpdateTeamInfo {
    team_id: string | number;
    user_id: string | number;
    inform_detail: string;
}
interface GetActivityRole {
    user_id: string;
    team_id: string | number;
    activity_id: string;
}
interface CreateTeamActivity {
    team_id: string;
    user_id: string;
    activity_title: string;
    activity_date: string;
    activity_time: string;
    activity_detail?: string;
}
interface SearchTeam {
    team_name?: string;
    province?: string;
    city?: string;
    district?: string;
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
    getTeamDetail (params: GetTeamDetail) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.GET_TEAM_DETAIL, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    updateTeamInfo (params: UpdateTeamInfo) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.UPDATE_TEAM_INFORM, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    createTeamActivity (params: CreateTeamActivity) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.CREATE_TEAM_ACTIVITY, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    getActivityRole (params: GetActivityRole) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.GET_ACTIVITY_ROLE, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    searchTeam (params: SearchTeam) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.SEARCH_TEAM, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
}
export default Team
