<template>
  <div class="team-map-container">
    <div class="flex-column-center loading-container" v-if="!mapOptions.loadComplete">
      <i class="el-icon-loading loading-icon"></i>
      <div>加载中</div>
    </div>
    <div id="container"></div>
    <div class="info" v-if="mapOptions.loadComplete">点击地图标记，查看球队详细信息</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BrowserLocation, Toast } from "@/utils/index";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import AMap from "AMap";
import { MapUtils } from "@/utils/index";
import MapType from "@/model/Map/map";
@Component({
  components: {}
})
export default class TeamMap extends Vue {
  private map!: any;
  private infoWindow!: any;
  private mapOptions = {
    resizeEnable: true,
    mapStyle: "amap://styles/fresh",
    zooms: [10, 16],
    // center: [116.473778, 39.990661],
    viewMode: "3D",
    loadComplete: false
  };
  private markerList = [];
  private pluginList = [
    "AMap.ToolBar",
    "AMap.Scale",
    "AMap.PlaceSearch",
    "AMap.Autocomplete",
    "AMap.Geolocation",
    "AMap.MapType",
    "AMap.OverView"
  ];
  private teamList = [];
  mounted() {
    const that = this;
    MapUtils.getUserLoactionByIp().then((res: any) => {
      const searchCity = res.city;
      this.getMapDetail(searchCity);
      this.map = new AMap.Map("container", this.mapOptions);
      this.map.setFeatures(["point", "road", "building", "bg"]);
      // map load complete
      this.map.on("complete", () => {
        this.mapOptions.loadComplete = true;
        // add plugin
        AMap.plugin(this.pluginList, () => {
          //异步加载插件
          const toolBar = new AMap.ToolBar();
          this.map.addControl(toolBar);
          this.map.addControl(new AMap.Scale());
          this.map.addControl(new AMap.OverView({ isOpen: true }));
          this.map.addControl(new AMap.MapType());
          // 定位插件
          const geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000,
            buttonOffset: new AMap.Pixel(10, 20)
          });
          geolocation.getCurrentPosition();
          AMap.event.addListener(
            geolocation,
            "complete",
            (positionData: any) => {
              const { lng, lat } = positionData.position;
              that.addMarker({
                position: [lng, lat]
              });
              const circle = new AMap.Circle({
                center: new AMap.LngLat(lng, lat), // 圆心位置
                radius: 5000, // 圆半径
                fillColor: "#1791fc", // 圆形填充颜色
                strokeColor: "#fff", // 描边颜色
                strokeWeight: 2, // 描边宽度
                strokeOpacity: 0.2,
                fillOpacity: 0.4
              });
              this.map.add(circle);
            }
          );
          AMap.event.addListener(geolocation, "error", (error: any) => {
            Toast.showToastError.call(that, "定位失败");
          });
        });
        this.teamList.forEach((item: any) => {
          this.addMarker({
            team_icon: item.team_icon,
            position: [item.longitude, item.latitude],
            team_name: item.team_name,
            id: item.id,
            description: item.description
          });
        });
      });
      // this.map.on("click", (event: any) => {
      //   const { lat, lng } = event.lnglat;
      //   that.addMarker({
      //     position: [lng, lat]
      //   });
      // });
    });
  }
  private generateInfoWindow(teamDetail: any) {
    const info = `<div class="card" style="margin-top: 5px;">
        <div style="padding: 5px 0; font-weight: 400; font-size: 14px;">球队详情</div>
        <div style="font-size: 12px;">${teamDetail.team_name}</div>
        <div style="margin: 5px 0; font-size: 10px;">${
          teamDetail.description
        }</div>
        <div class="card-bottom" style="margin: 10px 0 5px 0">
          <a href='http://101.201.142.182/#/team/detail?td=${teamDetail.id}' style="text-decoration: none; z-index: 100; float:right;font-size: 12px; background-color: #303F9F; color: white; padding: 5px; border-radius: 5px;">球队首页</a>
        </div>
    </div>`;
    this.infoWindow = new AMap.InfoWindow({
      content: info //使用默认信息窗体框样式，显示信息内容
    });

    this.infoWindow.open(this.map, this.map.getCenter());
  }
  private addMarker(markerDetail: any) {
    const that = this;
    const icon = new AMap.Icon({
      size: markerDetail.team_icon
        ? new AMap.Size(50, 50)
        : new AMap.Size(20, 30),
      image:
        markerDetail.team_icon ||
        "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
      imageSize: markerDetail.team_icon
        ? new AMap.Size(50, 50)
        : new AMap.Size(20, 30)
    });
    const marker = new AMap.Marker({
      size: new AMap.Size(20, 20),
      icon: icon,
      title: markerDetail.team_name,
      position: markerDetail.position,
      extData: markerDetail
    });
    AMap.event.addListener(marker, "click", function(detail: any) {
      that.generateInfoWindow(detail.target.getExtData());
      that.infoWindow.open(that.map, marker.getPosition());
    });
    this.map.add(marker);
  }
  private handleTeamDetail(teamId: number) {
    debugger;
  }
  private getMapDetail(searchCity: string) {
    MapType.getTeamMap
      .call(this, {
        city: searchCity
      })
      .then((res: any) => {
        const { team_list } = res;
        this.teamList = team_list;
      });
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
@media screen and (max-width: 450px) {
  .info {
    text-align: center;
    width: 50vw;
    top: 3vh;
    left: 5vw;
    padding: 10px;
    border-radius: 2px;
  }
}
</style>


