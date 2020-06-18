import Vue from 'vue'
export class LoginStateCheck extends Vue {
    checkLoginState (): boolean {
        // @ts-ignore
        return ((this.user_id != '' && this.user_id != undefined && this.user_id != null) || localStorage.getItem('User_ID'))
    }
}