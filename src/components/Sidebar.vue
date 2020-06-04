<template>
    <div class="container">
        <div class="mask" v-show="showSiderBar" @click="handleSiderBar"></div>
        <transition name="slide-fade">
            <div
                class="flex-column-y-between sider-bar"
                v-show="showSiderBar"
                @click.stop="catchUserEvent"
            >
                <div>
                    <div class="flex-row-center sider-bar-brand">
                        <img class="sider-bar-brand-icon" :src="brandIcon" alt="约个球">
                        <div class="flex-column" style="margin-left: 10px;">
                          <strong class="sider-bar-brand-text">约个球</strong>
                        </div>
                    </div>
                    <div
                        class="flex-row-y-center sider-bar-item"
                        v-for="(item, index) in navListCopy"
                        :key="index"
                        @click="handleRouter(item.navPath)"
                    >
                        <img class="sider-bar-item-icon" :src="item.iconUrl" :alt="item.navTitle">
                        <strong class="sider-bar-item-title">{{item.navTitle}}</strong>
                    </div>
                </div>
                <div class="flex-column-x-start create-deveoper-info">
                    <span>开发者: 马加奥(Mario)</span>
                    <span>Email:</span>
                    <span> <a>mario528@163.com</a></span>
                </div>
            </div>
        </transition>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
@Component({})
export default class SiderBar extends Vue {
  @Prop({ default: [] })
  public navList!: any[];
  @Prop({ default: 0 })
  public domHeight!: number;
  @Action("handleSiderBar")
  public handleSiderBar!: () => void;
  @Getter("getSiderBarState")
  showSiderBar!: boolean;
  public navListCopy: any[] = [];
  public brandIcon: string = require("../assets/brand_icon.png");
  mounted() {
    this.navListCopy = this.initNavList();
  }
  private initNavList(): any[] {
    return this.navList.map((element, index) => {
      switch (index) {
        case 0:
          element.iconUrl = require("../assets/home_sidebar_icon.png");
          break;
        case 1:
          element.iconUrl = require("../assets/team_sidebar_icon.png");
          break;
        case 2:
          element.iconUrl = require("../assets/chat_sidebar_icon.png");
          break;
        case 3:
          element.iconUrl = require("../assets/mall_sidebar_icon.png");
          break;
      }
      return element;
    });
  }
  private catchUserEvent() {
    //   do nothing
  }
  private handleRouter (to: string) {
    this.$router.push(to)
    this.handleSiderBar()
  }
}
</script>
<style lang="scss" scoped>
@import "../stylus/scss/app.scss";
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 998;
}
.sider-bar {
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  width: 40vw;
  height: 100vh;
  text-align: center;
  z-index: 999;
  &-item {
    width: 80%;
    margin: 0 auto;
    padding: 20px 0;
    border-bottom: 1px solid #eeeeee;
    &-icon {
      width: 25px;
      height: 25px;
    }
    &-title {
      font-size: 15px;
      font-weight: 500;
      color: #333333;
      margin-left: 20px;
    }
  }
  &-brand {
    height: 65px;
    background-color: $base_color;
    &-icon {
      width: 40px;
      height: 40px;
    }
    &-text {
      color: white;
    }
  }
}
.create-deveoper-info {
    span {
        font-size: 12px;
        color: #aa99aa;
        line-height: 20px;
        margin-bottom: 5px;
        a {
            color: #17abe3;
            text-decoration: underline;
        }
    }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-100%);
  transition: all 0.3s ease;
}
</style>