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
    console.log(document.documentElement.scrollTop);
  }
}
</script>
<style lang="scss" scoped>
@media screen and (max-width: 400px) {
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
@media screen and (min-width: 401px) {
  .up-arrow-container {
    width: 60px;
    height: 70px;
    position: fixed;
    right: calc(5vw - 40px);
    bottom: 20vh;
    border-radius: 5px;
    background-color: $base_color;
  }
  .up-arrow {
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
}
</style>
