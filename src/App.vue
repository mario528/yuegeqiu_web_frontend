<template>
  <div id="app">
    <router-view/>
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
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
