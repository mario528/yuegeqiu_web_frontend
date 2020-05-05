<template>
  <header ref="header" class="flex-row-x-between header">
    <!-- Header left side -->
    <div class="flex-row-y-center" v-if="!smallScreenMode">
      <span class="flex-row-y-center">
        <img class="brand-icon" :src="brandIcon" alt="约个球">
        <strong class="brand-name">约个球</strong>
      </span>
      <div class="flex-row-y-center">
        <nav class="nav-bar-item" v-for="(item, index) in navList" :key="index">
          <router-link
            exact
            class="router-link-class"
            tag="div"
            :to="item.navPath"
          >{{item.navTitle}}</router-link>
        </nav>
      </div>
    </div>
    <div class="flex-row-y-center" v-else>
      <img class="header-slider-icon" :src="leftSidebarIcon" alt="展开" @click="handleSiderBar">
      <strong class="brand-name-small">约个球</strong>
    </div>
    <!-- Header right side -->
    <div class="flex-row-y-center user-area">
      <div v-if="!isLogin">
        <div class="flex-row-y-center">
          <img
            :src="commonUserIcon"
            :class="[ smallScreenMode ? 'user-icon-small user-icon-unlogin' : 'user-icon user-icon-unlogin' ]"
            @mouseover="processSetSpread('mouseover')"
            @click="processSetSpread('click')"
            @mouseout="processSetSpread('mouseout')"
          >
          <div @click="handleTapLoginOrRegister($event.target)">
            <a class="user-text" data-value="login">登陆</a>
            <a class="user-text-line">｜</a>
            <a class="user-text" data-value="register">注册</a>
          </div>
        </div>
      </div>
      <div v-if="isLogin">
        <el-dropdown trigger="click" size="medium" @command="handleSelectDropDownItem">
          <div class="flex-row-y-center">
            <img class="user-img" :src="userInfo.head_url" /> 
            <div class="user-name">{{userInfo.nick_name || userInfo.telephone}}</div>
            <img :src="downArrow" class="user-arrow">
          </div>
          <el-dropdown-menu slot="dropdown" class="dropdown-menu">
            <div class="dropdown-menu-item">{{userInfo.nick_name || userInfo.telephone}}</div>
            <el-dropdown-item command="userCenter" icon="el-icon-user" class="dropdown-menu-item">个人中心</el-dropdown-item>
            <el-dropdown-item command="message" icon="el-icon-chat-dot-round" class="dropdown-menu-item">消息</el-dropdown-item>
            <el-dropdown-item command="logout" icon="el-icon-switch-button" class="dropdown-menu-item">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import userModel from '@/model/User/User'
import Optimize from "@/utils/optimize";
import { productionConf } from '@/config/index'
import { Toast } from '@/utils/index'
@Component({
  components: {}
})
export default class Header extends Vue {
  @Prop({ default: [] })
  public navList!: any[];

  @Action("handleSiderBar")
  public handleSiderBar!: (state: boolean) => void;

  @Action("handleScreenModel")
  public handleScreenModel!: (state: boolean) => void;

  @Action("handleSetAccountToken")
  public handleSetAccountToken!: (token: string | undefined) => void;

  @Action("handleSetUserId")
  public handleSetUserId!: (userId: string | undefined) => void;

  @Action("handleLoginOrRegisterState")
  public handleLoginOrRegisterState!: (state: number) => void

  @Getter('getAccountToken')
  public token: string | undefined

  @Getter('getUserId')
  public userId: string | undefined

  // @Getter("getLoginState")
  // public isLogin!: boolean;

  public brandIcon: string = require("../assets/brand_icon.png");
  public commonUserIcon: string = require("../assets/common_user_icon.png")
  public leftSidebarIcon: string = require("../assets/left_sidebar_icon.png")
  public downArrow: string = require('../assets/user_arrow.png')
  public clientWindowWidth = 1440;
  public smallScreenMode = document.body.clientWidth <= 850;
  public domHeight = 75;
  public showUserSpread = false;
  public optimize: any | undefined | null;
  public routePath: any;
  public userInfo = {}
  public isLogin = false

  @Watch("clientWindowWidth")
  onWindowWidthChange(newValue: number, oldValue: number): void {
    if (newValue <= 850 && !this.smallScreenMode) {
      this.smallScreenMode = true;
    } else if (newValue > 850 && this.smallScreenMode) {
      this.smallScreenMode = false;
    }
    this.handleScreenModel(this.smallScreenMode);
  }

  @Watch("isLogin")
  onLoginStateChange (newValue: boolean, oldValue: boolean) {
    if (newValue && (newValue != oldValue)) {
      this.getUserInfo()
    }
  }

  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    this.routePath = this.$route.path;
    this.optimize = new Optimize();
    this.clientWindowWidth = document.body.clientWidth;
    this.optimize.debounce(
      (window.onresize = () => {
        return ((): void => {
          that.clientWindowWidth = document.body.clientWidth;
        })();
      })
    );
    this.$nextTick(() => {
      // tslint:disable-next-line
      // this.domHeight = this.$refs.header.offsetHeight
      this.domHeight = 75;
    });
    if ((this.userId || localStorage.getItem('User_ID')) && (this.token || localStorage.getItem('Authorization'))) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.isLogin = true
      // this.getUserInfo()
    }
    this.$event.on('reflashUserInfo', this.getUserInfo)
  }
  private handleshowUserSpread() {
    console.log("function call");
    this.showUserSpread = true;
  }
  private handlehideUserSpread() {
    this.showUserSpread = false;
  }
  private processSetSpread(eventType: string) {
    const fn = ["mouseover", "click"].includes(eventType)
      ? this.handleshowUserSpread
      : this.handlehideUserSpread;
    this.optimize.processFunc(fn, 0.3);
  }
  private handleTapLoginOrRegister(event: any) {
    const idx = event.dataset.value == 'login' ? 1 : 2
    this.handleLoginOrRegisterState(idx)
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.$event.emit("changeLoginDialogState");
  }
  private getUserInfo () {
      const userType = new userModel()
      const params = {
        user_id: this.userId || localStorage.getItem('User_ID'),
        token: this.token || localStorage.getItem('Authorization')
      }
      userType.getUserInfo.call(this, params).then((res: any)=> {
        this.isLogin = true
        if (!res.user_info.head_url) {
          // eslint-disable-next-line @typescript-eslint/camelcase
          res.user_info.head_url = productionConf.basicIconUrl
        }
        this.userInfo = res.user_info
      }).catch((err: any) => {
        this.isLogin = false
      })
  }
  private logout () {
    const userType = new userModel()
    userType.logout.call(this).then((res: any)=> {
      this.isLogin = false
      localStorage.removeItem('Authorization')
      localStorage.removeItem('User_ID')
      this.handleSetAccountToken(undefined)
      this.handleSetUserId(undefined)
      Toast.showToastSuccess.call(this,'账户退出成功','成功')
      this.$event.emit("reflashUserInfo")
    })
  }
  private handleSelectDropDownItem(type: string) {
    switch (type) {
      case 'message':
        
        break;
      case 'userCenter':
        this.$router.push({
          path: '/user/center',
          name: 'userCenter',
          params: {
            userId: this.userId || localStorage.getItem('User_ID') as string,
            token: this.token || localStorage.getItem('Authorization') as string,
          }
        })
        break;
      case 'logout':
        this.logout()
        break;
    }
  }
}
</script>
<style scoped lang="scss">
.header {
  box-sizing: border-box;
  height: 10vh;
  width: 100%;
  padding: 5px 0%;
  background-color: $base_color;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  // box-shadow: 0 15px 10px #e3f2fd;
  &-slider-icon {
    width: 40px;
    height: 40px;
  }
}
.brand {
  &-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: transparent;
    padding: 5px;
  }
  &-name {
    font-size: 24px;
    font-weight: 500;
    margin-right: 15px;
    font-weight: 500;
    color: white;
    &-small {
      font-size: 16px;
      font-weight: 500;
      margin-left: 20px;
      color: white;
    }
  }
}
.nav-bar {
  &-item {
    padding: 10px 30px;
    color: $header_font_color_common;
    font-weight: 500;
    font-size: 16px;
    margin-right: 40px;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
    &-activity {
      @extend .nav-bar-item;
      color: $header_font_color_activity;
    }
  }
  &-item:nth-of-type(1) {
    margin-left: 30px;
  }
  &-item:hover {
    color: $header_font_color_activity;
  }
}
.router-link-class.router-link-active {
  color: $header_font_color_activity;
}
.user {
  &-area {
    position: relative;
    justify-content: flex-end;
  }
  &-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: relative;
    margin-right: 20px;
    &-unlogin:hover {
      cursor: pointer;
      transform: scale3d(1.1, 1.1, 1.1);
    }
    &-small {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: transparent;
      padding: 5px;
    }
  }
  &-text {
    color: white;
    &:hover {
      cursor: pointer;
      color: $high_light_color;
    }
    &-line {
      color: white;
    }
  }
  &-img {
    width: 3vw;
    height: 3vw;
    min-width: 40px;
    min-height: 40px;
    border-radius: 50%; 
  }
  &-name {
    margin-left: 10px;
    color: $base_font_color;
    font-size: 14px;
    font-weight: 500;
    margin-right: 10px;
  }
  &-arrow {
    width: 2vw;
    height: 2vw;
    min-width: 15px;
    min-height: 15px;
  }
}
.dropdown-menu {
  width: 10vw;
  min-width: 150px;
  cursor: pointer;
  &-item {
    width: 100%;
    box-sizing: border-box;
    padding: 5px 5%;
    border-bottom: 1px solid #eeeeee;
    font-size: 14px;
    font-weight: 500;
    &:last-of-type {
      border-bottom: none;
    }
  }
}
</style>