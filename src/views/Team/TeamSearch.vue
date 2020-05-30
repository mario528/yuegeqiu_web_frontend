<!--
 * @Author: majiaao
 * @Date: 2020-05-12 11:57:09
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-13 00:26:46
 * @Description: file content
 -->
<template>
    <div class="flex-column-x-center search-container">
        <side-dialog :showDialog="showDialog" @closeShowDialog="closeShowDialog">
            <div slot="header">
                <div class="title">搜索结果</div>
            </div>
            <div slot="content">
                <div
                    class="flex-row-y-center width-100 content-line"
                    v-for="(item, index) in searhResult"
                    :key="index"
                >
                    <div class="flex-row-y-center content-line-left">
                        <img :src="item.team_icon" class="team-icon">
                        <div>
                            <div class="team-name">{{item.team_name}}</div>
                            <div class="team-description">{{item.description}}</div>
                        </div>
                    </div>
                    <div
                        class="flex-row-center content-line-right"
                        @click="handleTeamPage(item.id)"
                    >查看</div>
                </div>
            </div>
        </side-dialog>
        <div class="flex-column-x-center search-input-area">
            <div class="flex-row search-tag">
                <div
                    :class="[searchType == 0 ? 'search-tag-item-choosed' : 'search-tag-item']"
                    @click="swtichType(0)"
                >球队名</div>
                <div
                    :class="[searchType == 1 ? 'search-tag-item-choosed' : 'search-tag-item']"
                    @click="swtichType(1)"
                >区域</div>
            </div>
            <div class="flex-row-x-center width-100">
                <transition>
                    <div class="flex-row-x-center search-area" v-if="searchType == 0">
                        <el-autocomplete
                            class="search-input"
                            v-model="searchquery"
                            :fetch-suggestions="querySearchAsync"
                            placeholder="请输入球队名称"
                            @select="handleSelect"
                        ></el-autocomplete>
                        <div class="search-btn">搜索</div>
                    </div>
                    <div class="flex-row-x-center location-area" v-if="searchType == 1">
                        <location-selecter @selectComplete="selectComplete"></location-selecter>
                        <div class="search-btn-position" @click="handleFindTeamByLocation">搜索</div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import LocationSelect from "@/components/LocationSelect.vue";
import Team from "@/model/Team/Team";
import SideDialogByCommon from "@/components/SlideDialogByCommon.vue";
@Component({
  components: {
    "location-selecter": LocationSelect,
    "side-dialog": SideDialogByCommon
  }
})
export default class TeamSearch extends Vue {
  private searchquery = "";
  private searchType = 0;
  private searchLocationInfo!: {
    province?: string;
    city?: string;
    district?: string;
  };
  private showDialog = false;
  private searhResult!: [];
  private querySearchAsync(queryString: any, cb: (result: any) => void) {
    if (!queryString) return;
    new Team().searchTeam
      .call(this, {
        team_name: queryString
      })
      .then((res: any) => {
        cb(this.processDate(res));
      });
  }
  private processDate(data: any[]) {
    if (data.length == 0) {
      return [
        {
          value: "暂无数据",
          address: ""
        }
      ];
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const resultArray = [];
      data.forEach(item => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        resultArray.push({
          value: item.team_name,
          address: item.district,
          team_id: item.id
        });
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return resultArray;
    }
  }
  private handleSelect(detail: any) {
    this.$router.push({
      path: "/team/detail",
      query: {
        td: detail.team_id
      }
    });
  }
  private initPageData() {
    this.searchquery = "";
    this.searchLocationInfo = {
      province: "",
      city: "",
      district: ""
    };
  }
  private swtichType(index: number) {
    if (this.searchType == index) return;
    this.initPageData();
    this.searchType = index;
  }
  private selectComplete(locationInfo: any) {
    this.searchLocationInfo = locationInfo;
  }
  private closeShowDialog() {
    this.showDialog = false;
  }
  private handleFindTeamByLocation() {
    if (
      !this.searchLocationInfo.province &&
      !this.searchLocationInfo.city &&
      !this.searchLocationInfo.district
    )
      return;
    new Team().searchTeam
      .call(this, this.searchLocationInfo)
      .then((res: any) => {
        this.searhResult = res;
        this.showDialog = true;
      });
  }
  private handleTeamPage(teamId: any) {
    this.$router.push({
      path: "/team/detail",
      query: {
        td: teamId
      }
    });
  }
}
</script>
<style lang="scss" scoped>
$search_height: 50px;
.search-container {
  height: 82vh;
  width: 100vw;
  margin-top: -2vh;
  background-size: 100%;
  overflow: hidden;
}
.search-input-area {
  width: 80vw;
  margin-top: 20vh;
}
.search-input {
  width: 80%;
}
.search-input ::v-deep .el-input__inner {
  display: inline-block;
  width: 100%;
  height: $search_height;
  border-radius: 0;
  box-sizing: border-box;
}
.search-tag {
  width: 50%;
  padding: 10px 0;
  &-item {
    width: 60px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
    font-weight: 600;
    cursor: pointer;
    &-choosed {
      @extend .search-tag-item;
      color: $side_color;
    }
  }
}
.search-area {
  width: 50%;
}
.search-btn {
  width: 20%;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  background-color: $side-color;
  color: white;
  font-weight: 500;
  line-height: $search_height;
}
.location-area ::v-deep .el-input__inner {
  height: $search_height;
  border: none;
  box-sizing: border-box;
}
.content-line {
  border-bottom: 1px solid $border_color;
  padding: 10px 0;
  &-left {
    width: 80%;
  }
  &-right {
    width: 20%;
    background-color: $side_color;
    color: white;
    font-weight: 500;
    padding: 5px 0;
    border-radius: 5px;
    cursor: pointer;
  }
}
.team {
  &-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #333333;
    margin-right: 5%;
  }
  &-name {
    font-weight: 600;
    font-size: 18px;
    color: #333333;
  }
  &-description {
    font-size: 12px;
    margin-top: 5px;
    color: $disable_color;
  }
}
.search-btn-position {
    @extend .search-btn;
}
@media screen and (max-width: 450px) {
  .search-container {
    background-color: $base_color;
  }
  .search-input-area {
    width: 90vw;
    margin-top: 20vh;
  }
  .search-tag {
    width: 100%;
  }
  .search-area {
    width: 100%;
  }
  .location-area {
    width: 100%;
  }
  .search-btn-position {
    @extend .search-btn;
    width: 40%;
    height: 50px;
    line-height: 50px;
  }
}
@media screen and (min-width: 451px) {
  .search-container {
    background: url("https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/football_search_bg.jpg")
      no-repeat;
  }
  .location-area {
    width: 50%;
  }
}
</style>


