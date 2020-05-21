<!--
 * @Author: majiaao
 * @Date: 2020-05-21 15:54:19
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-21 18:40:15
 * @Description: file content
--> 
<template>
    <div class="match-container">
        <div class="match-container-bg"></div>
        <div class="match-container-content">
            <div class="width-100">
                <span class="content-title">发起赛事</span>
                <div class="content-line">
                    <div class="content-line-title">赛事名</div>
                    <div class="content-line-content">
                        <input class="content-line-content-input" type="text" placeholder="赛事名">
                    </div>
                </div>
                <div class="content-line">
                    <div class="content-line-title">比赛类型</div>
                    <div class="content-line-content">
                        <el-select v-model="matchConfig._matchProperty" placeholder="比赛类型">
                            <el-option v-for="item in matchPropertyList" :key="item" :value="item"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="content-line">
                    <div class="content-line-title">赛事开始时间</div>
                    <div class="content-line-content">
                        <el-date-picker v-model="matchConfig._startTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="开始时间"></el-date-picker>
                    </div>
                </div>
                <div class="content-line">
                    <div class="content-line-title">赛事结束时间</div>
                    <div class="content-line-content">
                        <el-date-picker v-model="matchConfig._endTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="结束时间"></el-date-picker>
                    </div>
                </div>
                <div class="content-line">
                    <div class="content-line-title">可参与球队数量</div>
                    <div class="content-line-content">
                       <el-input-number v-model="matchConfig._maxTeamNumber" :step="1"></el-input-number>
                    </div>
                </div>
                <div class="content-line">
                    <div class="content-line-title">赛事活动地区</div>
                    <div class="content-line-content">
                       <location-select></location-select>
                    </div>
                </div>
                <div class="content-line">
                    <div class="content-line-title">比赛场地</div>
                    <div class="content-line-content">
                        <basic-map></basic-map>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import LocationSelect from '@/components/LocationSelect.vue'
import BasicMap from '../../components/BasicMap.vue'
@Component({
    components: {
        'location-select': LocationSelect,
        'basic-map': BasicMap
    }
})
export default class CreateMatch extends Vue {
  private matchPropertyList = ["友谊赛", "正式比赛"];
  private matchConfig = {
    _matchProperty: null,
    _startTime: null,
    _endTime: null,
    _maxTeamNumber: null,
    _locationInfo: null
  };
  private handleCreateMatch() {}
}
</script>
<style lang="scss" scoped>
.match-container {
  width: 100vw;
  min-height: 82vh;
  margin-top: -2vh;
  position: relative;
  &-content {
    padding: 15px;
    background-color: white;
    box-shadow: $basic_shadow;
    box-sizing: border-box;
  }
}
.content {
  &-title {
    padding-left: 20px;
    position: relative;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      top: -20%;
      width: 5px;
      height: 140%;
      background-color: $base_color;
      font-weight: 600;
      font-size: 16px;
    }
  }
  &-line {
    padding: 20px 15px;
    border-bottom: 1px solid #eeeeee;
    &-title {
      display: inline-block;
      width: 30%;
    }
    &-content {
      display: inline-block;
      width: 70%;
      &-input {
        padding: 5px;
        height: 30px;
        width: 50%;
      }
    }
  }
}
@media screen and (max-width: 450px) {
  .match-container {
    &-content {
      width: 100%;
    }
  }
}
@media screen and (min-width: 451px) {
  .match-container {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100%;
      z-index: -1;
      background-image: url("https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/create_match_bg.jpg");
      background-size: cover;
      background-position: center 0;
      background-repeat: no-repeat;
      filter: blur(5px);
    }
    &-content {
      width: 60%;
      margin: 0 auto;
    }
  }
}
</style>