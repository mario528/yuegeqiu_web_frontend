<template>
    <div class="error-container">
        <div style="padding-bottom: 10vh; text-align: center;">
            <img class="error-icon" :src="errorIcon">
            <div>{{showText}}<a v-if="!printEnd" class="cursor">|</a></div>
        </div>
        <transition name="fade">
            <div class="back-home" v-if="printEnd" @click="backHome">Back Home</div>
        </transition>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
@Component
export default class NotFound extends Vue {
  public errorIcon: string = require("../assets/404.png");
  public showText = "";
  public printEnd = false
  created() {
    this.hanldeTypewriting();
  }
  private hanldeTypewriting() {
    const baseStr = "You are Lost ...";
    const baseStrArray: string[] = baseStr.split("");
    let timer: any; 
    if (this.showText != baseStr) {
      timer = setInterval(() => {
        if (this.showText == baseStr) {
            timer = null
            this.printEnd = true
            return
        }
        this.showText += baseStrArray[0];
        baseStrArray.shift();
      }, 250);
    }
  }
  private backHome () {
      this.$router.push('/')
  }
}
</script>
<style lang="scss" scoped>
.error-container {
  box-sizing: border-box;
  margin-top: -2vh;
  width: 100vw;
  min-height: 82vh;
  background-color: $base_color;
  color: #63c565;
  font-size: 16px;
  padding-top: 30vh; 
  text-align: center;
}
.error-icon {
  width: 10vw;
  min-width: 120px;
  height: auto;
  margin-top: -15vh;
  margin-bottom: 2vh;
}
.cursor {
    width: 1px;
    font-size: 16px;
    color: #63c565;
    background-color: #63c565;
    margin-left: 2px;
}
.back-home {
    width: 10vw;
    min-width: 120px;
    height: 5vh;
    text-align: center;
    line-height: 5vh; 
    border: 1px solid #63c565;
    border-radius: 20px;
    margin: 0 auto;
    &:hover {
        cursor: pointer;
        background-color: #63c565;
        color: $base_color;
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>


