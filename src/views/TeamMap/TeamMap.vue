<template>
  <div class="team-map-container">
    <div class="flex-column-center loading-container" v-if="!mapOptions.loadComplete">
      <i class="el-icon-loading loading-icon"></i>
      <div>加载中</div>
    </div>
    <div id="container"></div>
    <div class="info" v-if="mapOptions.loadComplete">点击地图上的点标记，打开所添加的自定义信息窗体</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BrowserLocation } from "@/utils/index";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import AMap from "AMap";
@Component({
  components: {}
})
export default class TeamMap extends Vue {
  private map!: any;
  private infoWindow!: any;
  private mapOptions = {
    zooms: [10, 16],
    center: [116.473778, 39.990661],
    viewMode: "3D",
    loadComplete: false
  };
  private markerList = [];
  private pluginList = [
    "AMap.ToolBar",
    "AMap.Scale",
    "AMap.PlaceSearch",
    "AMap.Autocomplete",
    "AMap.Geolocation"
  ];
  mounted() {
    this.map = new AMap.Map("container", this.mapOptions);
    // map load complete
    this.map.on("complete", () => {
      this.mapOptions.loadComplete = true;
      // add plugin
      AMap.plugin(this.pluginList, () => {
        //异步加载插件
        const toolBar = new AMap.ToolBar();
        this.map.addControl(toolBar);
      });
      this.addMarker([116.60982, 39.907761]);
    });
  }
  private addMarker(position: number[]) {
    const marker = new AMap.Marker({
      position: position
    });
    this.map.add(marker);
  }
}
</script>
<style lang="scss" scoped>
$loading_color: #000080;
.team-map-container {
  width: 100vw;
  height: 82vh;
  margin-top: -2vh;
  position: relative;
}
#container {
  width: 100%;
  height: 100%;
}
.loading-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  div {
    font-size: 20px;
    font-weight: 500;
    margin-top: 20px;
    color: $loading_color;
  }
}
.loading-icon {
  font-size: 50px;
  color: $loading_color;
}
.info {
  position: absolute;
  top: 3vh;
  right: 10vw;
  padding: 10px 20px;
  font-size: 12px;
  font-weight: 500;
  background-color: $base_color;
  color: white;
  border-radius: 5px;
}
</style>


