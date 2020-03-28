<template>
    <div class="flex-column-center container" v-if="showLoading">
        <transition name="loading">
            <img :src="loadingImg" class="loading-span bounce" v-if="showLoading">
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({})
export default class Loading extends Vue {
  @Prop()
  public showLoading!: boolean;
  public loadingImg: string = require('../assets/loading_icon.png')
}
</script>
<style lang="scss" scoped>
@import "../stylus/scss/app.scss";
.container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
}
@keyframes bounce {
  from,
  20%,
  53%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -60px, 0);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -24px, 0);
  }

  90% {
    transform: translate3d(0, -4px, 0);
  }
  95% {
    transform: translate3d(0, -2px, 0);
  }
}
.loading-span {
  width: 50px;
  height: 50px;
  background-color: #17abe3;
  border-radius: 50%;
  animation: bounce 3s infinite;
}
</style>