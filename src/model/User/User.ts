import Vue from 'vue'
import { Url } from '../../utils/index'
interface LoginInterface {
    telephone: string;
    password: string;
}
class User {
    constructor() {

    }
    login(params: LoginInterface) {
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(Url.LOGIN, params).then((res: any) => {
                reslove(res)
            })
        })
    }
}
export default User;