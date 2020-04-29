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
                reject(err)
            })
        })
    }
}
export default User;