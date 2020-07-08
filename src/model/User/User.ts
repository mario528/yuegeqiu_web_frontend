import Vue from 'vue'
import { Url } from '../../utils/index'
interface LoginInterface {
    telephone: string;
    password: string;
}
interface RegisterInterface {
    telephone: string;
    password: string;
    verification_code: string;
    channe?: string;
}
interface VerificationInterface {
    telephone: string;
}
interface CheckToken {
    token: string;
}
interface GetUserInfo {
    user_id: string | undefined | null;
    token?: string | undefined | null;
}
interface Location {
    province?: string;
    city?: string;
    district?: string;
}
interface CompleteUserInfo {
    user_id: string;
    nick_name?: string;
    sex?: number;
    location?: Location;
}
interface UserCenter {
    user_id: string | undefined;
    token: string | undefined;
}
interface GetUserFriendShip {
    user_id: string | undefined;
}
interface GetUserRelationShip {
    interview_user_id: string;
    mode: number | string;
    user_id: string | null;
    page: number;
}
interface GetUserInfoByUpdate {
    user_id: string | undefined | null;
    token?: string | undefined | null;
}
interface UploadUserIcon {
    user_id: string | undefined | null;
    form_data: any;
}
interface GetUserMessage {
    user_id: string | undefined | null;
    page: number;
}
interface GetInformDetail {
    user_id: string | undefined | null;
    inform_id: string | number;
}
interface UpdateInformState {
    user_id: string | undefined | null;
    inform_id: string | number;
    state: boolean;
}
class User {
    constructor() {

    }
    login(params: LoginInterface) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.LOGIN, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    logout () {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.LOGOUT, {}).then((res: any) => {
                // @ts-ignore
                this.$router.push('/')
                reslove(res)
            }).catch((err: any) => {            
                reject(err)
            })
        })
    }
    register (params: RegisterInterface) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.REGISTER, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    checkToken (params: CheckToken) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.CHECK_TOKEN_AVAILABLE, {
                params
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    getVerificationCode (params: VerificationInterface) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.VERIFICATION_CODE, {
                params
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    getUserInfo (params: GetUserInfo) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.GET_USER_INFO, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    completeUserInfo (params: CompleteUserInfo) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.COMPLETE_USER_INFO, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    getUserCenterData (params: UserCenter) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.USER_CENTER, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                if (err.response.status) {
                    // @ts-ignore
                    this.$router.push('/404');
                }
                reject(err)
            })
        })
    }
    getUserFriendShip (params: GetUserFriendShip) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.GET_FRIEND_SHIP_RELATIONS, {
                params
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    getUserFriendShipDetail (params: GetUserRelationShip) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.GET_USER_RELATION_ShIP_DETAIL, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    getUserInfoByUpdate (params: GetUserInfoByUpdate) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.GET_USER_INFO_BY_UPDATE, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    changeUserInfo (params: CompleteUserInfo) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.UPDATE_USER_INFO, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    uploadUserIcon (params: UploadUserIcon) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.UPLOAD_USER_ICON, params).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    getUserMessage (params: GetUserMessage) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.GET_USER_MESSAGE, {
                params
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    getInformDetail (params: GetInformDetail) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.GET_INFORM_DETAIL, {
                params
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    updateInformState (params: UpdateInformState) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.get(Url.UPDATE_INFORM_STATE, {
                params
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
}
export default User;