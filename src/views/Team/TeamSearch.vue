<!--
 * @Author: majiaao
 * @Date: 2020-05-12 11:57:09
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-12 19:03:31
 * @Description: file content
 -->
<template>
    <div class="flex-column-x-center search-container">
        <div class="flex-column-x-center search-input-area">
            <div class="flex-row search-tag">
                <div :class="[searchType == 0 ? 'search-tag-item-choosed' : 'search-tag-item']" @click="swtichType(0)">球队名</div>
                <div :class="[searchType == 1 ? 'search-tag-item-choosed' : 'search-tag-item']" @click="swtichType(1)">区域</div>
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
                    <div class="flex-row-x-center width-50 location-area" v-if="searchType == 1">
                        <location-selecter @selectComplete="selectComplete"></location-selecter>
                        <div class="search-btn" @click="handleFindTeamByLocation">搜索</div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import LocationSelect from '@/components/LocationSelect.vue'
import Team from '@/model/Team/Team'
@Component({
    components: {
        'location-selecter': LocationSelect
    }
})
export default class TeamSearch extends Vue {
  private searchquery = ''
  private searchType = 0;
  private searchLocationInfo !: {
    province?: string;
    city?: string;
    district?: string;
  }
  private searhResult !: []
  private querySearchAsync (queryString: any, cb: (result: any) => void) {
      if (!queryString) return
      new Team().searchTeam.call(this, {
          team_name: queryString
      }).then((res: any) => {
           cb(this.processDate(res))
      })
  }
  private processDate(data: any[]) {
      if (data.length == 0) {
          return [
              {
                  "value": "暂无数据",
                  "address": ""
              }
          ]
      }else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const resultArray = []
        data.forEach(item => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            resultArray.push({
                value: item.team_name,
                address: item.district,
                team_id: item.id
            })
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return resultArray
      }
  }
  private handleSelect (detail: any) {
      this.$router.push({
        path: '/team/detail',
        query: {
            td: detail.team_id
        }
      })
  }
  private initPageData () {
      this.searchquery = ''
      this.searchLocationInfo = {
        province: '',
        city: '',
        district: '',
      }

  }
  private swtichType (index: number) {
      if (this.searchType == index) return
      this.initPageData()
      this.searchType = index
  }
  private selectComplete (locationInfo: any) {
      this.searchLocationInfo = locationInfo
      
  }
  private handleFindTeamByLocation () {
    new Team().searchTeam.call(this, this.searchLocationInfo).then((res: any) => {
        this.searhResult = res      
    })
  }
}
</script>
<style lang="scss" scoped>
@media screen and (max-width: 450px) {
}
@media screen and (min-width: 451px) {
  $search_height: 50px;
  .search-container {
    background: url("https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/football_search_bg.jpg")
      no-repeat;
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
  }
}
</style>


