<template>
  <transition name="fade">
    <div class="flex-column-center dialog-mask" @click.self="handleMaskState" v-if="showDialog">
      <div class="dialog-main">
        <div class="flex-row-y-center">
          <div :class="[dialogState == 1 ? 'type-item-activity' : 'type-item']" @click="swithType(1)">登陆</div>
          <div class="separator">|</div>
          <div :class="[dialogState == 2 ? 'type-item-activity' : 'type-item']" @click="swithType(2)">注册</div>
        </div>
        <div v-if="dialogState == 1" class="flex-column-center content">
          <input class="user-input" v-model="loginTelNumber" placeholder="手机号" maxlength="11" />
          <div class="width-100" style="position: relative;">
            <input class="user-input-psw" @input="handleInputPsw($event.target.value, 1)" placeholder="密码" :value="showLoginPswStr" />
            <img class="eyes-icon" :src="eyesIcon" @click="handleSwitchPswType(1)">
          </div>
          <div class="width-100 flex-row-x-end grey-color" @click="handleForgetPassword">忘记密码</div>
          <button class="login-btn" @click="handleLogin">登陆</button>
        </div>
        <div v-if="dialogState == 2" class="flex-column-x-center content">
          <input class="user-input" v-model="registerTelNumber" placeholder="手机号" maxlength="11" />
          <div class="width-100" style="position: relative;">
            <input class="user-input-psw" @input="handleInputPsw($event.target.value, 2)" placeholder="密码" :value="showRegisterPswStr" />
            <img class="eyes-icon" :src="eyesIcon" @click="handleSwitchPswType(2)">
          </div>
          <div class="verification-container width-100 flex-row">
            <input v-model="verificationCode" class="user-input-verification" maxlength="6" placeholder="请输入验证码"/>
            <div :class="[verificationBtnAvaiable ? 'verification-btn-available' : 'verification-btn-available-disable']" @click="handleSendMessage">{{verificationBtnAvaiable ? '发送验证码' : verificationBtnCountDownNumber + '秒'}}</div>
          </div>
          <button class="login-btn" @click="handleRegister">注册</button>
        </div> 
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Getter, Action } from "vuex-class";
import User from '@/model/User/User'
import { RegExp } from '@/utils/index'
@Component({})
export default class LoginOrRegister extends Vue {
  private showDialog = false;
  private loginTelNumber = '';
  private loginPsw = '';
  private hidePsw = false;
  private showLoginPswStr = '';
  private eyesIcon: any = this.hidePsw ? require('../assets/eyes_close.png') : require('../assets/eyes_open.png')
  private registerTelNumber = ''
  private showRegisterPswStr = ''
  private registerPsw = ''
  private verificationCode = ''
  private verificationBtnAvaiable = true
  private verificationBtnCountDownNumber = 60
  @Getter('getLoginOrRegisterState')
  private dialogState !: number;

  @Action('handleSetAccountToken')
  private handleSetAccountToken!: (token: string) => void

  @Action('handleSetLoginState')
  private handleSetLoginState!: (state: boolean) => void

  @Action('handleSetUserId')
  private handleSetUserId!: (userId: string) => void

  @Action('handleLoginOrRegisterState')
  private swithType (type: number) {
    if (type == this.dialogState) return
    this.dialogState = type
    this._initState()
  }

  created() {
    this.$event.on("changeLoginDialogState", () => {
      this.showDialog = !this.showDialog;
    });
  }
  private handleMaskState() {
    this.showDialog = !this.showDialog
    this._initState()
  }
  private handleInputPsw (value: string, type: number) {
    value = value.replace(/\s+/g, '')
    if (this.hidePsw) {
      let len
      type == 1 ? len = value.length - this.showLoginPswStr.length : len = value.length - this.showRegisterPswStr.length
      for (let i = 0; i < len; i++) {
        type == 1 ? this.showLoginPswStr += '*' : this.showRegisterPswStr += '*'
      }
      type == 1 ? this.loginPsw += value.substr(value.length - 1, 1) : this.registerPsw += value.substr(value.length - 1, 1)
    }else {
      type == 1 ? this.showLoginPswStr = value : this.showRegisterPswStr = value
      type == 1 ? this.loginPsw = value : this.registerPsw = value
    }
  }
  private handleSwitchPswType (type: number) {
    if (this.hidePsw) {
      type == 1 ? this.showLoginPswStr = this.loginPsw : this.showRegisterPswStr = this.registerPsw
    }else {
      let str = ''
          ,len = type == 1 ? this.showLoginPswStr.length : this.showRegisterPswStr.length
      for (let i = 0; i < len; i++) {
          str += '*'
      }
      type == 1 ? this.showLoginPswStr = str : this.showRegisterPswStr = str
    }
    this.hidePsw = !this.hidePsw
    this.eyesIcon = this.hidePsw ? require('../assets/eyes_close.png') : require('../assets/eyes_open.png')
  }
  private _initState() {
    this.loginTelNumber = ''
    this.loginPsw = ''
    this.showLoginPswStr = ''
    this.registerTelNumber = ''
    this.showRegisterPswStr = ''
    this.verificationCode = ''
  }
  private _checkInfoAvailable (): boolean {
    if (this.dialogState == 1) {
      if (!this.loginTelNumber || !this.loginPsw) return false
      else return true
    }else {
      if (!this.registerTelNumber || !this.registerPsw || !this.verificationCode) return false
      else return true
    }
  }
  private _regTelephone (telephone: string): boolean {
    if (!RegExp.testTelePhone(telephone)) {
      this.$notify.error({
        title: 'Error',
        message: '请输入正确格式的手机号'
      })
    }
    return RegExp.testTelePhone(telephone)
  }
  private handleLogin () {
    if (!this.loginTelNumber || !this.loginPsw) {
      if (!this.loginTelNumber) {
        this.$notify.error({
          title: '错误',
          message: '手机号不能为空'
        })
        return
      }else if (!this.loginPsw){
        this.$notify.error({
          title: '错误',
          message: '密码不能为空'
        })
        return
      }
      return
    }
    if (!this._regTelephone(this.loginTelNumber)) return
    const userType = new User()
    const params = {
      telephone: this.loginTelNumber,
      password: this.loginPsw
    }
    userType.login.call(this, params).then((res: any) => {
      const { token, user_id } = res
      localStorage.setItem("Authorization", token)
      localStorage.setItem("User_ID", user_id)
      this.$notify({
        title: '成功',
        message: '登陆成功',
        type: 'success'
      })
      this.handleSetLoginState(true)
      this.handleSetUserId(user_id)
      this.handleSetAccountToken(token)
      this.$event.emit('reflashUserInfo')
      this._initState()
      this.showDialog = false
    })
  }
  private handleRegister () {
    if (!this.registerTelNumber || !this.registerPsw || this.verificationCode) {
      if (!this.registerTelNumber) {
        this.$notify.error({
          title: '错误',
          message: '手机号不能为空'
        })
        return
      }else if (!this.registerPsw){
        this.$notify.error({
          title: '错误',
          message: '密码不能为空'
        })
        return
      }else if (!this.verificationCode) {
        this.$notify.error({
          title: '错误',
          message: '验证码不能为空'
        })
        return
      }
    }
    if (!RegExp.testTelePhone(this.registerTelNumber)) {
      this.$notify.error({
        title: 'Error',
        message: '请输入正确格式的手机号'
      })
      return
    }
    if (!this._regTelephone(this.registerTelNumber)) return
    const userType = new User()
    const params = {
      telephone: this.registerTelNumber,
      password: this.registerPsw,
      verification_code: this.verificationCode
    }
    userType.register.call(this, params).then((res: any) => {
      const token = res.token
      localStorage.setItem("Authorization", token)
      localStorage.setItem("User_ID", res.user_id)
      this.$notify({
        title: '成功',
        message: '账户注册成功',
        type: 'success'
      })   
      this._initState()
      this.showDialog = false
      this.handleSetLoginState(true)
      this.handleSetAccountToken(token)
      this.handleSetUserId(res.user_id)
      this.$event.emit('reflashUserInfo')
      setTimeout(() => {
        this.$router.push({
          path: '/user/info/complete',
          name: 'completeInfo',
          params: {
            userId: res.user_id
          }
        })
      }, 1000);
    }).catch((err: any) => {
      
    })
  }
  private handleSendMessage () {
    const that = this;
    if (!this.verificationBtnAvaiable) return
    if (!this.registerTelNumber) {
      this.$notify.error({
        title: '错误',
        message: '请输入正确的手机号'
      });
      return
    }
    const userType = new User()
    const params = {
      telephone: this.registerTelNumber
    }
    userType.getVerificationCode.call(this, params).then((res: any) => {
       this.$notify({
        title: '成功',
        message: '验证码发送成功',
        type: 'success'
      })   
      this.verificationBtnAvaiable = false
      const timer = setInterval(() => {
        if (that.verificationBtnCountDownNumber == 1) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          that.verificationBtnCountDownNumber = 60
          that.verificationBtnAvaiable = true
          clearInterval(timer)
        }
        that.verificationBtnCountDownNumber --
      }, 1000)
    }).catch((err: any) => {
    })
  }
  private handleForgetPassword () {
    this.$router.push({
      
    })
  }
}
</script>
<style lang="scss" scoped>
.dialog-mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 30;
}
.dialog-main {
  background-color: white;
  box-sizing: border-box;
  width: 40vw;
  padding: 40px 5vw 10px 5vw;
  border-radius: 10px;
  box-shadow: $basic_shadow;
}
.separator {
  color: $base_color;
  margin: 0 10px;
}
.type-item {
  cursor: pointer;
  color: #A9A9A9;
  font-weight: 400;
  &-activity {
    color: #333333;
    font-weight: 500;
  }
}
.content {
  min-height: 50vh;
}
.user-input {
  box-sizing: border-box;
  width: 100%;
  margin: 20px 0;
  border: none;
  border-bottom: 1px solid #eeeeee;
  border-radius: 5px 5px 0 0;
  padding: 15px 10px;
  font-size: 16px;
  outline: none;
  &-psw {
    @extend .user-input ;
  }
  &-verification {
    @extend .user-input ;
    width: 50%;
  }
}
.verification {
  &-btn {
    cursor: pointer;
    width: 25%;
    height: 50px;
    margin: 20px 0;
    text-align: center;
    line-height: 50px;
    border: 1px solid #eeeeee;
    margin-left: 25%;
    font-size: 14px;
    font-weight: 500;
    color: $base_color;
    border-radius: 5px;
    &-available {
      @extend .verification-btn;
      background-color: $base_color;
      color: white;
      &-disable {
        @extend .verification-btn;
        background-color: #DCDCDC;
        color: white;
      }
    }
  }
}
.login-btn {
  width: 80%;
  margin: 10% 0% 5% 0;
  padding: 10px 0;
  background-color: transparent;
  outline: none;
  background-color: $base_color;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 5px;
}
.grey-color {
  cursor: pointer;
  color: $grey-color;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
}
.eyes-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
  top: 35px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@media screen and (max-width: 450px){
  .dialog-main {
    width: 85vw;
  }
}
</style>


