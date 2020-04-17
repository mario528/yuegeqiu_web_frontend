<template>
  <div class="page">
    <nav-header :navList="navList"></nav-header>
    <side-bar :nav-list="navList" :dom-height="domHeight"></side-bar>
    <div class="flex-column-x-center container">
      Team
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { router } from '../config/index'
@Component({
  components: {}
})
export default class Team extends Vue {
  public navList: any[] = router
  public domHeight = 75
}
</script>
<style lang="scss" scoped>
.page {
  position: relative;
}
.container {
  width: 90vw;
  margin: 0 auto;
}
</style>