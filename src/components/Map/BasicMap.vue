<template>
  <div class="map-container"></div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import AMap from "AMap";
import { locationConf } from "@/config/index";
import { MapUtils } from '../../utils/index'
@Component({
  components: {
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
  mounted() {
    // 根据id获取用户定位
    MapUtils.getUserLoactionByIp().then((res: any) => {
    })
  }
  private getUserLocation () {

  }
}
</script>
<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
