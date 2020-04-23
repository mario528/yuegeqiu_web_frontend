<template>
  <transition name="fade">
    <div class="flex-column-center dialog-mask" @click.self="handleMaskState" v-if="showDialog">
      <div class="dialog-main">
        <div class="flex-row">
          <div :class="[dialogState == 1 ? 'type-item-activity' : 'type-item']" @click="swithType(event,1)">登陆</div>
          <div class="separator">/</div>
          <div :class="[dialogState == 2 ? 'type-item-activity' : 'type-item']" @click="swithType(event,2)">注册</div>
        </div>
        <div v-if="dialogState == 1" class="flex-column-x-center content ">
          <input class="user-input" v-model="loginTelNumber" placeholder="手机号" maxlength="11" />
          <div class="width-100" style="position: relative;">
            <input class="user-input-psw" @input="handleInputPsw($event.target.value, 1)" placeholder="密码" :value="showLoginPswStr" />
            <img class="eyes-icon" :src="eyesIcon" @click="handleSwitchPswType(1)">
          </div>
          <div class="width-100 flex-row-x-end grey-color">忘记密码</div>
          <button class="login-btn" @click="handleLogin">登陆</button>
        </div>
        <div v-if="dialogState == 2" class="flex-column-x-center content">
          <input class="user-input" v-model="registerTelNumber" placeholder="手机号" maxlength="11" />
          <div class="width-100" style="position: relative;">
            <input class="user-input-psw" @input="handleInputPsw($event.target.value, 2)" placeholder="密码" :value="showRegisterPswStr" />
            <img class="eyes-icon" :src="eyesIcon" @click="handleSwitchPswType(2)">
          </div>
          <div class="verification-container width-100 flex-row">
            <input v-model="verificationCode" class="user-input-verification" maxlength="4" placeholder="请输入验证码"/>
            <div class="verification-btn-available" @click="handleSendMessage">发送验证码</div>
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
import User from '../model/User/User'
@Component({})
export default class LoginOrRegister extends Vue {
  private showDialog = false;
  private dialogState = 1;
  private loginTelNumber = '';
  private loginPsw = '';
  private hidePsw = false;
  private showLoginPswStr = '';
  private eyesIcon: any = this.hidePsw ? require('../assets/eyes_close.png') : require('../assets/eyes_open.png')
  private registerTelNumber = ''
  private showRegisterPswStr = ''
  private registerPsw = ''
  private countDown = 60
  private countTimer = null
  private verificationCode = ''

  @Action('handleSetAccountToken')
  private handleSetAccountToken!: (token: string) => void

  @Action('handleSetLoginState')
  private handleSetLoginState!: (state: boolean) => void

  created() {
    // @ts-ignore
    this.$event.on("changeLoginDialogState", () => {
      this.showDialog = !this.showDialog;
    });
  }
  private handleMaskState() {
    this.showDialog = !this.showDialog
    this._initState()
  }
  private swithType (event: any, type: number) {
    if (type == this.dialogState) return
    this.dialogState = type
    this._initState()
  }
  private handleInputPsw (value: string, type: number) {
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
  private handleLogin () {
    // @ts-ignore
    const userType = new User()
    const params = {
      telephone: this.loginTelNumber,
      password: this.loginPsw
    }
    userType.login.call(this, params).then((res: any) => {
      // @ts-ignore
      const { token } = res
      localStorage.setItem("Authorization", token)
      this.$notify({
        title: '成功',
        message: '登陆成功',
        type: 'success'
      })
      this.handleSetLoginState(true)
      this._initState()
      this.showDialog = false
    })
  }
  private handleRegister () {
    const userType = new User()
    const params = {
      telephone: this.registerTelNumber,
      password: this.registerPsw,
      verification_code: this.verificationCode
    }
    userType.register.call(this, params).then((res: any) => {
      const token = res.token
      localStorage.setItem("Authorization", token)
      this.handleSetAccountToken(token)
      this.$notify({
        title: '成功',
        message: '账户注册成功',
        type: 'success'
      })   
      this._initState()
      this.showDialog = false
      setTimeout(() => {
        this.$router.push('/user/completeInfo')
      }, 1000);
    }).catch((err: any) => {
      
    })
  }
  private handleSendMessage () {
    if (!this.registerTelNumber) {
      this.$notify.error({
        title: 'Error',
        message: '请输入正确的手机号'
      });
      return
    }
    const userType = new User()
    const params = {
      telephone: this.registerTelNumber
    }
    userType.getVerificationCode.call(this, params).then((res: any) => {
      
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
  min-width: 300px;
  width: 40vw;
  padding: 40px 5vw 3vw 5vw;
  border-radius: 10px;
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
  border-bottom: 1px solid #A9A9A9;
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
    width: 30%;
    height: 50px;
    margin: 20px 0;
    text-align: center;
    line-height: 50px;
    border: 1px solid #eeeeee;
    margin-left: 20%;
    font-size: 14px;
    font-weight: 500;
    color: $base_color;
    &-available {
      @extend .verification-btn ;
      background-color: $base_color;
      color: white;
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
</style>


