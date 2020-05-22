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
    team_id: number | null;
}
interface CreateMatchDetail {
    user_id: string;
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
    getCreateMatchDetail (params: CreateMatchDetail) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.GET_CREATE_MATCH_DETAIL, {
                params
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
}
export default Match;