<template>
  <div class="page">
    <div class="flex-column-center up-arrow-container" @mouseover="isHover = true" @mouseout="isHover = false">
      <img class="up-arrow" :src="iconUrl" @click="backToTop" v-show="!isHover || smallScreenModel">
      <span class="back_to_top" v-show="isHover && !smallScreenModel" @click="backToTop">回到<br/>顶部</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
@Component({})
export default class UpArrow extends Vue {
  @Getter("getScreenModel")
  public smallScreenModel!: boolean;

  public iconUrl: string = require("../assets/up_arrow.png");
  public isHover = false
  private backToTop() {
    const timer = setInterval(() => {
      const top = document.documentElement.scrollTop
      if (top > 50) {
        document.documentElement.scrollTop = document.documentElement.scrollTop - 50
      }else {
        document.documentElement.scrollTop = 0
      }
      if (top <= 0) {
        clearInterval(timer)
      }
    }, 20)
  }
}
</script>
<style lang="scss" scoped>
@media screen and (max-width: 450px) {
  .up-arrow-container {
    width: 45px;
    height: 45px;
    position: fixed;
    right: 0px;
    bottom: 20vh;
    background-color: $base_color;
    color: white;
    border-radius: 5px 0 0 5px;
    font-size: 12px;
  }
  .up-arrow {
    cursor: pointer;
    width: 25px;
    height: 25px;
  }
  .back_to_top {
    font-size: 14px;
  }
}
@media screen and (min-width: 451px) {
  .up-arrow-container {
    width: 50px;
    height: 50px;
    position: fixed;
    // right: calc(5vw - 30px);
    right: 0;
    bottom: 20vh;
    border-radius: 5px 0 0 5px;
    background-color: $base_color;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 2px 2px $base_color;
    }
  }
  .up-arrow {
    cursor: pointer;
    width: 30px;
    height: 30px;
  }
  .back_to_top {
    font-size: 14px;
    font-weight: 500;
    color: white;
  }
}
</style>
