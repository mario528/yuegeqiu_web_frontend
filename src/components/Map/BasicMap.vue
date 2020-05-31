<template>
  <div class="map-container">
    
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
import { locationConf } from "@/config/index";
import MapSearch from '@/components/Map/MapSearch.vue'
@Component({
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
