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
}
interface VerificationInterface {
    telephone: string;
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
}
export default User;