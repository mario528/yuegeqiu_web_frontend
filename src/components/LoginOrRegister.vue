<template>
  <transition name="fade">
    <div class="flex-column-center dialog-mask" @click.self="handleMaskState" v-if="showDialog">
      <div class="dialog-main">
        <div class="flex-row">
          <div :class="[dialogState == 1 ? 'type-item-activity' : 'type-item']" @click="swithType(event,1)">登陆</div>
          <div class="separator">/</div>
          <div :class="[dialogState == 2 ? 'type-item-activity' : 'type-item']" @click="swithType(event,2)">注册</div>
        </div>
        <div v-if="dialogState == 1" class="flex-column-x-center">
          <input class="user-input" v-model="loginTelNumber" placeholder="手机号" />
          <div class="width-100" style="position: relative;">
            <input class="user-input-psw" @input="handleInputPsw" placeholder="密码" :value="showPswStr" />
            <img class="eyes-icon" :src="eyesIcon" @click="handleSwitchPswType">
          </div>
          <div class="width-100 flex-row-x-end grey-color">忘记密码</div>
          <button class="login-btn" @click="handleLogin">登陆</button>
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
  private showPswStr = '';
  private eyesIcon: any = this.hidePsw ? require('../assets/eyes_close.png') : require('../assets/eyes_open.png')
  created() {
    // @ts-ignore
    this.$event.on("changeLoginDialogState", () => {
      this.showDialog = !this.showDialog;
    });
  }
  private handleMaskState() {
    this.showDialog = !this.showDialog;
  }
  private swithType (event: any, type: number) {
    if (type == this.dialogState) return
    this.dialogState = type
  }
  private handleInputPsw (event: any) {
    if (this.hidePsw) {
      const len = event.target.value.length
      for (let i = 0; i < len - this.showPswStr.length; i++) {
        this.showPswStr += '*'
      }
      this.loginPsw = event.target.value
    }else {
      this.showPswStr = event.target.value
      this.loginPsw = event.target.value
    }
  }
  private handleSwitchPswType () {
    if (this.hidePsw) {
      this.showPswStr = this.loginPsw
    }else {
      let str = ''
      for (let i = 0; i < this.showPswStr.length; i++) {
          str += '*'
      }
      this.showPswStr = str
    }
    this.hidePsw = !this.hidePsw
    this.eyesIcon = this.hidePsw ? require('../assets/eyes_close.png') : require('../assets/eyes_open.png')
  }
  private _initState() {
    this.loginPsw = ''
    this.showPswStr = ''
    this.dialogState = 1
    this.showDialog = false
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
      this.$notify({
        title: '成功',
        message: '这是一条成功的提示消息',
        type: 'success'
      })   
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
  padding: 2vw 5vw 3vw 5vw;
  border-radius: 5px;
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


