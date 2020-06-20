/*
 * @Author: majiaao
 * @Date: 2020-04-30 22:08:23
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-21 01:33:21
 * @Description: file content
 */
import { Url } from '../../utils/index'
import File from '../../model/File/file'
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
    longitude: number;
    latitude: number;
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
interface UpLoadTeamIcon {
    team_id: number | string;
    form_data: any;
}
interface JoinTeam {
    team_id: number | string;
    user_id: number | string;
}
interface DepartTeam {
    team_id: number | string;
    user_id: number | string;
}
interface TeamSuggest {
    user_id?: number | string | null;
}
interface TeamPage {
    user_id: string | number | null;
}
interface TeamMemberNumber {
    user_id: string | number | null;
    team_number: number;
    team_id: number | string;
}
interface TeamMemberPosition {
    user_id: string | number | null;
    team_position: number;
    team_id: number | string;
}
interface TeamChat {
    user_id: string | number | null;
    team_id: number | string;
}
interface SendMessage {
    user_id: string | number | null;
    team_id: number | string;
    content: string;
}
interface GetTeamMessageBoard {
    user_id: string | number | null;
    team_id: number | string;
    sort_type: number;
    page: number;
}
interface SendTeamMessageBoard {
    user_id: string | number | null;
    team_id: number | string;
    content: string;
}
interface GetUserTeamList {
    user_id: string | number | null;
}
interface CreateChallenge {
    user_id: string | number | null;
    team_id: number | string;
    time: string;
    location: Location;
    type: number;
    detail: string;
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
    uploadTeamIcon (params: UpLoadTeamIcon) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            new File().upload.call(this, params.form_data, Url.UPLOAD_TEAM_ICON, {
                team_id: params.team_id
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    joinTeam (params: JoinTeam) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.JOIN_TEAM, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    departTeam (params: DepartTeam) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.DEPART_TEAM, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    teamSuggest (params: TeamSuggest) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.TEAM_SUGGEST, {
                params
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    getTeamPageDetail (params: TeamPage) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.GET_TEAM_PAGE_DETAIL, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    changeTeamMemberNumber (params: TeamMemberNumber) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.CHANGE_TEAM_MEMBER_NUMBER, {
                params
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    changeTeamMemberPosition (params: TeamMemberPosition) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.CHANGE_TEAM_MEMBER_POSITION, {
                params
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    requestTeamChat (params: TeamChat) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.GET_TEAM_CHAT, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    sendMessage (params: SendMessage) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.SEND_TEAM_CHAT, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    getTeamMessageBoard (params: GetTeamMessageBoard) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.GET_TEAM_MESSAGE_BOARD, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    sendTeamMessageBoard (params: SendTeamMessageBoard) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.SEND_TEAM_MESSAGE_BOARD, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    getUserTeamList (params: GetUserTeamList) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.GET_USER_TEAM_LIST, {
                params
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    createChallenge (params: CreateChallenge) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.CREATE_CHALLENGE,params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
}
export default Team
