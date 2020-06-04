<template>
  <div class="page">
    <div class="flex-column-center up-arrow-container">
      <img class="up-arrow" :src="iconUrl" @click="backToTop">
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
@Component({})
export default class UpArrow extends Vue {
  public iconUrl: string = require("../assets/up_arrow.png");
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
    width: 35px;
    height: 45px;
    position: fixed;
    right: 10px;
    bottom: 20vh;
    border-radius: 5px;
    background-color: $base_color;
  }
  .up-arrow {
    cursor: pointer;
    width: 25px;
    height: 25px;
  }
}
@media screen and (min-width: 451px) {
  .up-arrow-container {
    width: 50px;
    height: 50px;
    position: fixed;
    right: calc(5vw - 30px);
    bottom: 20vh;
    border-radius: 50%;
    background-color: $base_color;
    &:hover {
      box-shadow: 0px 0px 2px 2px $base_color;
    }
  }
  .up-arrow {
    cursor: pointer;
    width: 30px;
    height: 30px;
  }
}
</style>
