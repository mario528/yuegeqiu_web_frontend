<template>
  <div class="map-container">
    <amap :zoom="mapZoom" :center="locationInfo" ref="amap">
      <amap-marker 
       ref="marker"
       :position="locationInfo" 
       map-style="amap://styles/whitesmoke"
      />
      <map-search></map-search>
    </amap>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
import { withAmap } from '@amap/amap-vue'
import { locationConf } from "@/config/index";
import MapSearch from '@/components/Map/MapSearch.vue'
@Component({
  mixins: [withAmap],
  components: {
    'map-search': MapSearch
  }
})
export default class BasicMap extends Vue {
  @Prop({ default: 15 })
  mapZoom!: number;
  @Prop({
    default: [
      locationConf.basicLocation.longitude,
      locationConf.basicLocation.latitude
    ]
  })
  locationInfo!: any[];
  
}
</script>
<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
