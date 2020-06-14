<template>
  <div class="container flex-column-center loading-mask" v-if="showLoading">
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({})
export default class Loading extends Vue {
  @Prop()
  public showLoading!: boolean;
  public loadingImg: string = require("../../assets/loading_icon.png");
}
</script>
<style lang="scss" scoped>
.loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .8);
  z-index: 900;
}
.loading {
  height: 40px;
  margin: 0 auto;
  margin-top: 100px;
}
.loading span {
  display: inline-block;
  width: 8px;
  height: 100%;
  margin-right: 5px;
  border-radius: 4px;
  background: lightgreen;
  animation: load 1.04s ease infinite;
}
@keyframes load {
  0%,
  100% {
    height: 40px;
    background: lightgreen;
  }
  50% {
    height: 60px;
    margin-top: -20px;
    background: lightblue;
  }
}
.loading span:nth-child(2) {
  animation-delay: 0.13s;
}
.loading span:nth-child(3) {
  animation-delay: 0.26s;
}
.loading span:nth-child(4) {
  animation-delay: 0.39s;
}
.loading span:nth-child(5) {
  animation-delay: 0.52s;
}
</style>