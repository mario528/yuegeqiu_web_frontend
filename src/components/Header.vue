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
          <router-link tag="div" :to="item.navPath">{{item.navTitle}}</router-link>
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
          <div>
            <a class="user-text">登陆</a>
            <a class="user-text">注册</a>
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

  @Getter('getLoginState')
  public isLogin!: boolean

  public brandIcon: string = require("../assets/brand_icon.png");
  public commonUserIcon: string = require("../assets/common_user_icon.png");
  public leftSidebarIcon: string = require("../assets/left_sidebar_icon.png");
  public clientWindowWidth: number = document.body.clientWidth;
  public smallScreenMode = document.body.clientWidth <= 800;
  public domHeight = 75;
  public showUserSpread = false;
  public optimize: any | undefined | null;

  @Watch("clientWindowWidth")
  onWindowWidthChange(newValue: number, oldValue: number): void {
    if (newValue <= 800 && !this.smallScreenMode) {
      this.smallScreenMode = true;
    } else if (newValue > 800 && this.smallScreenMode) {
      this.smallScreenMode = false;
    }
    this.handleScreenModel(this.smallScreenMode)
  }
  mounted() {
    const that = this;
    this.optimize = new Optimize();
    window.onresize = () => {
      return ((): void => {
        that.clientWindowWidth = document.body.clientWidth;
      })();
    };
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
}
</script>
<style scoped lang="scss">
@import "../stylus/scss/app.scss";
.header {
  box-sizing: border-box;
  width: 100%;
  padding: 5px 5%;
  background-color: #17abe3;
  position: relative;
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
    background-color: #3399cc;
    padding: 10px 30px;
    color: #ffffff;
    font-weight: 500;
    font-size: 16px;
    margin-right: 40px;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
  }
  &-item:nth-of-type(1) {
    margin-left: 30px;
  }
  &-item:hover {
    color: #3399cc;
    background-color: #ffffff;
  }
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
    &:nth-of-type(1):after {
      content: " | ";
      color: white;
    }
    &:hover {
      cursor: pointer;
      color: greenyellow;
      text-decoration: underline;
    }
  }
}
</style>