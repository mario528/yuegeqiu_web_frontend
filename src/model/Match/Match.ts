import { Url } from '../../utils/index'
interface Location {
    province?: string;
    city?: string;
    district?: string;
}
interface CreateMatch {
    user_id: string;
    match_name: string;
    match_property: number;
    start_time: string;
    end_time: string;
    max_team_number: number;
    location_info: Location;
}
class Match {
    constructor() {

    }
    createMatch (params: CreateMatch) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.CREATE_MATCH, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    getTodayTime () {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.GET_TODAY_TIME).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
}
export default Match;