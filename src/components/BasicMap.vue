<template>
  <div class="map-container">
    <amap :zoom="mapZoom" :center="[117.000923, 36.675807]">
      <amap-marker :position="[117.000923, 36.675807]"/>
    </amap>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
@Component({})
export default class BasicMap extends Vue {
  @Prop({ default: 5 }) mapZoom!: number
}
</script>
<style lang="scss" scoped>
.map-container {
  width: 500px;
  height: 500px;
}
</style>
