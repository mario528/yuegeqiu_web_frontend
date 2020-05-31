<template>
    <div class="team-map-container">
        <amap
            :zoom="mapOptions.zoom"
            :center="mapOptions.center"
            :viewMode="mapOptions.viewMode"
            :rotation="mapOptions.rotation"
            ref="teamMap"
        >
            <amap-marker
                v-for="(item, index) in markerList"
                :key="index"
                :position="[item.x, item.y]"
            />
            <amap-tool-bar/>
            <amap-control-bar/>
            <amap-hawk-eye/>
            <amap-scale/>
            <amap-map-type/>
        </amap>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { BrowserLocation } from '@/utils/index'
@Component({
  components: {}
})
export default class TeamMap extends Vue {
  private mapOptions = {
    zoom: 14,
    center: [116.473778, 39.990661],
    viewMode: "3D",
    rotation: 15
  };
  private markerList = [
    {
      x: 116.473571,
      y: 39.993083
    }
  ];
  created() {
    new BrowserLocation().getLocation()   
  }
}
</script>
<style lang="scss" scoped>
.team-map-container {
  width: 100vw;
  height: 82vh;
  margin-top: -2vh;
}
</style>


