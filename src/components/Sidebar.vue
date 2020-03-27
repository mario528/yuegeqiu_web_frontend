<template>
  <div class="container" v-show="showSiderBar" @click="handleSiderBar">
      <transition name="sider-fade">
          <div class="sider-bar" v-show="showSiderBar" @click.stop="s">
              <div class="flex-row-center sider-bar-brand">
                  <img class="sider-bar-brand-icon" :src="brandIcon" alt="约个球" />
                  <strong class="sider-bar-brand-text">约个球</strong>
              </div>
              <div class="flex-row-y-center sider-bar-item" v-for="(item, index) in navListCopy" :key="index">
                  <img class="sider-bar-item-icon" :src="item.iconUrl" :alt="item.navTitle" />
                  <strong class="sider-bar-item-title">{{item.navTitle}}</strong>
              </div>
          </div>
      </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter } from 'vuex-class';
@Component({})
export default class SiderBar extends Vue {
  @Prop({ default: [] })
  public navList!: any[];
  @Prop({ default: 0 })
  public domHeight!: number;
  @Action('handleSiderBar') public handleSiderBar!: () => void
  @Getter('getSiderBarState') showSiderBar!: boolean;
  public navListCopy!: any[];
  public brandIcon: string = require("../assets/brand_icon.png");
  mounted() {
      this.navListCopy = this.initNavList()
  }
  private initNavList (): any[] {
      return this.navList.map((element, index) => {
          switch (index) {
              case 0:
                  element.iconUrl = require('../assets/home_sidebar_icon.png')
                  break;
              case 1:
                  element.iconUrl = require('../assets/team_sidebar_icon.png')
                  break;
              case 2:
                  element.iconUrl = require('../assets/mall_sidebar_icon.png')
                  break;
          }
          return element
      })
  }
}
</script>
<style lang="scss" scoped>
@import "../stylus/scss/app.scss";
.container {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .4);
    z-index: 20;
    position: absolute;
    top: 0;
    left: 0;
}
.sider-bar {
    background-color: white;
    width: 40%;
    height: 100vh;
    text-align: center;
    &-item {
        width: 80%;
        margin: 0 auto;
        padding: 20px 0;
        border-bottom: 1px solid #eeeeee;
        &-icon {
            width: 30px;
            height: 30px;
        }
        &-title {
            font-size: 15px;
            font-weight: 500;
            color: #333333;
            margin-left: 20px;
        }
    }
    &-brand {
        height: 75px;
        background-color: #17abe3;
        &-icon {
            width: 40px;
            height: 40px;
        }
        &-text {
            color: white;
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