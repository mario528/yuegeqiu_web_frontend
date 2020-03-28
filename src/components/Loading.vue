<template>
  <div class="container" v-if="showLoading">
      <transition name="loading">
          <span class="loading-span"></span>
      </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
export default class Loading extends Vue {
    @Prop({})
    public showLoading!: Boolean;
}
</script>
<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
}
</style>