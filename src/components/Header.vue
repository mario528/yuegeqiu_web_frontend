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
      <div>
        <div class="flex-row-y-center">
          <img
            :src="commonUserIcon"
            :class="[ smallScreenMode ? 'user-icon-small user-icon-unlogin' : 'user-icon user-icon-unlogin' ]"
            @mouseover="processSetSpread('mouseover')"
            @click="processSetSpread('click')"
            @mouseout="processSetSpread('mouseout')"
          >
          <div @click="handleTapLoginOrRegister">
            <a class="user-text" data-set="login">登陆</a>
            <a class="user-text-line">｜</a>
            <a class="user-text" data-set="register">注册</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";

import Optimize from "../utils/optimize";

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

  @Getter("getLoginState")
  public isLogin!: boolean;

  public brandIcon: string = require("../assets/brand_icon.png");
  public commonUserIcon: string = require("../assets/common_user_icon.png");
  public leftSidebarIcon: string = require("../assets/left_sidebar_icon.png");
  public clientWindowWidth = 1440;
  public smallScreenMode = document.body.clientWidth <= 850;
  public domHeight = 75;
  public showUserSpread = false;
  public optimize: any | undefined | null;
  public routePath: any;

  @Watch("clientWindowWidth")
  onWindowWidthChange(newValue: number, oldValue: number): void {
    if (newValue <= 850 && !this.smallScreenMode) {
      this.smallScreenMode = true;
    } else if (newValue > 850 && this.smallScreenMode) {
      this.smallScreenMode = false;
    }
    this.handleScreenModel(this.smallScreenMode);
  }
  mounted() {
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
    // @ts-ignore
    this.$event.emit("changeLoginDialogState");
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
      color: greenyellow;
      text-decoration: underline;
    }
    &-line {
      color: white;
    }
  }
}
</style>