<template>
  <div id="app">
    <div class="app-content">
      <router-view/>
    </div>
    <loading :showLoading="showLoading"></loading>
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { State, Action, Getter } from "vuex-class";

import Loading from "@/components/Loading.vue";
@Component({
  components: {
    Loading
  }
})
export default class App extends Vue {
  @Getter("getLoadingState")
  public showLoading!: boolean

  @Action('handleLoadingState') public handleLoadingState!: () => void
}
</script>

<style lang="scss">
@import './stylus/scss/app';
* {
  margin: 0;
  padding: 0;
}
</style>
