<template>
  <div class="page">
    <div class="flex-column-x-center container">
      <div class="flex-column-center no-open" v-if="!isOpen">
        <img class="no-open-icon" :src="require('@/assets/no_open.png')">
        <div>商城暂未开放 敬请期待～</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Mall extends Vue {
  private isOpen !: boolean
  mounted() {
    this.isOpen = false 
  }
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
.no-open {
  width: 100vw;
  min-height: 82vh;
  margin-top: -2vh;
  background-color: $base_color;
  color: $high_light_color;
  font-weight: 600;
  font-size: 18px;
  &-icon {
    width: 10vw;
    height: 10vw;
    margin-bottom: 5vh;
  }
}
</style>