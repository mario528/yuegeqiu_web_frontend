<template>
  <div id="app">
    <nav-header :navList="navList"></nav-header>
    <side-bar :nav-list="navList" :dom-height="domHeight"></side-bar>
    <div class="app-content">
      <router-view/>
    </div>
    <footer-area></footer-area>
    <login-register></login-register>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { State, Action, Getter } from "vuex-class";
import { router } from "./config/index";

@Component({
  components: {}
})
export default class App extends Vue {
  public navList: any[] = router;
  public domHeight = 75;
  @Getter("getScreenModel")
  public smallScreenModel!: boolean;
}
</script>

<style lang="scss">
@import "./stylus/scss/app";
* {
  margin: 0;
  padding: 0;
}
.app-content {
  margin-top: 2vh;
  min-height: 80vh;
}
</style>
