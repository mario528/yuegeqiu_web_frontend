<!--
 * @Author: majiaao
 * @Date: 2020-05-21 15:54:19
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-22 20:59:58
 * @Description: file content
--> 
<template>
    <div class="match-container">
        <div class="match-container-bg"></div>
        <div class="match-container-content">
            <div class="width-100">
                <span class="content-title">发起赛事</span>
                <div class="content-line">
                    <div class="content-line-title">赛事名<a style="color: red;">*</a></div>
                    <div class="content-line-content">
                        <input class="content-line-content-input" v-model="matchConfig._matchName" type="text" placeholder="赛事名">
                    </div>
                </div>
                <div class="content-line">
                    <div class="content-line-title">比赛类型<a style="color: red;">*</a></div>
                    <div class="content-line-content">
                        <el-select v-model="matchConfig._matchProperty" placeholder="比赛类型">
                            <el-option v-for="item in matchPropertyList" :key="item.type" :label="item.value" :value="item.type"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="content-line">
                    <div class="content-line-title">比赛人数<a style="color: red;">*</a></div>
                    <div class="content-line-content">
                        <el-select v-model="matchConfig._matchType" placeholder="比赛类型">
                            <el-option v-for="item in matchTypeList" :key="item.type" :label="item.value" :value="item.type"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="content-line">
                    <div class="content-line-title">赛事开始时间<a style="color: red;">*</a></div>
                    <div class="content-line-content">
                        <el-date-picker v-model="matchConfig._startTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="开始时间"></el-date-picker>
                    </div>
                </div>
                <div class="content-line">
                    <div class="content-line-title">赛事结束时间<a style="color: red;">*</a></div>
                    <div class="content-line-content">
                        <el-date-picker v-model="matchConfig._endTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="结束时间"></el-date-picker>
                    </div>
                </div>
                <div class="content-line">
                    <div class="content-line-title">可参与球队数量<a style="color: red;">*</a></div>
                    <div class="content-line-content">
                       <el-input-number v-model="matchConfig._maxTeamNumber" :step="1"></el-input-number>
                    </div>
                </div>
                <div class="content-line">
                    <div class="content-line-title">赛事活动地区<a style="color: red;">*</a></div>
                    <div class="content-line-content">
                       <location-select @selectComplete="selectComplete"></location-select>
                    </div>
                </div>
                <div class="content-line">
                    <div class="content-line-title">比赛场地</div>
                    <div class="content-line-content">
                        <input class="location-input" id="tipinput" placeholder="比赛位置" type="text" v-model="matchConfig._matchAddress">
                    </div>
                </div>
                <div class="content-line">
                    <div class="content-line-title">详细介绍</div>
                    <div class="content-line-content">
                        <textarea v-model="matchConfig._matchDetail" class="content-text_area" placeholder="详细介绍"/>
                    </div>
                </div>
                <div class="content-line" v-if="userTeamList.length != 0">
                    <div class="content-line-title">所在球队是否参加比赛</div>
                    <div class="content-line-content">
                        <div class="flex-row-between team-item">
                          <div class="flex-row-y-center">
                            <span class="team-name">不参加该赛事</span>
                          </div>
                          <div :class="[matchConfig._joinTeamId == -1 ? 'select-icon-selected' : 'select-icon-common']" @click="matchConfig._joinTeamId = -1"></div>
                        </div>
                        <div class="flex-row-between team-item" v-for="(item, index) in userTeamList" :key="index">
                          <div class="flex-row-y-center">
                            <img :src="item.team_icon" class="team-icon">
                            <span class="team-name">{{item.team_name}}</span>
                          </div>
                          <div :class="[matchConfig._joinTeamId == item.id ? 'select-icon-selected' : 'select-icon-common']" @click="matchConfig._joinTeamId = item.id"></div>
                        </div>
                    </div>
                </div>
                <div class="width-100 flex-row-x-center">
                  <button class="publish-btn" @click="handleCreateMatch">发布赛事</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Getter } from 'vuex-class'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import AMap from "AMap";
import LocationSelect from '@/components/LocationSelect.vue'
import BasicMap from '@/components/Map/BasicMap.vue'
import Match from '@/model/Match/Match'
import { TimeFormate, Toast } from '@/utils/index'
@Component({
    components: {
        'location-select': LocationSelect,
        'basic-map': BasicMap
    }
})
export default class CreateMatch extends Vue {
  @Getter('getUserId') userId!: string | undefined
  private matchPropertyList = [{
    value: '友谊赛',
    type: 0
  }, {
    value: '正式比赛',
    type: 1
  }];
  private matchTypeList = [{
    value: '五人制',
    type: 0
  },{
    value: '七人制',
    type: 1
  },{
    value: '十一人制',
    type: 2
  }]
  private matchConfig = {
    _matchName: '',
    _matchProperty: 0,
    _startTime: '',
    _endTime: '',
    _maxTeamNumber: 0,
    _locationInfo: {
      province: '',
      city: '',
      district: ''
    },
    longitude: -1,
    latitude: -1,
    _matchAddress: '',
    _matchType: null,
    _matchDetail: null,
    _joinTeamId: -1
  };
  private today !: string
  private userTeamList = []
  @Watch('matchConfig._startTime')
  onStartTimeChanged (newValue: string, oldvalue: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    if (!this._testTimeAvaibalbe(0, newValue)) {
      this.matchConfig._startTime = oldvalue
      Toast.showToastError.call(this, '请输入正确的时间', '错误')
      return
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    newValue = new TimeFormate(newValue).formateTime('YYYY-MM-DD')
  }
  @Watch('matchConfig._endTime')
  onEndTimeChanged (newValue: string, oldvalue: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    if (!this._testTimeAvaibalbe(1, newValue)) {
      this.matchConfig._endTime = oldvalue
      Toast.showToastError.call(this, '请输入正确的时间', '错误')
      return
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    newValue = new TimeFormate(newValue).formateTime('YYYY-MM-DD')
  }
  mounted () {
    const that = this
    this.getCreateMatchDetail()
    AMap.plugin(["AMap.Autocomplete", "AMap.PlaceSearch"], function() {
      const autoOptions = {
        city: "北京", //城市，默认全国
        input: "tipinput" //使用联想输入的input的id
      };
      const autocomplete = new AMap.Autocomplete(autoOptions);
      const placeSearch = new AMap.PlaceSearch({
        city: "北京"
      });
      AMap.event.addListener(autocomplete, "select", (event: any) => {
        const { lat, lng } = event.poi.location;
        that.matchConfig.longitude = lng
        that.matchConfig.latitude = lat
      });
    });
  }
  private _testTimeAvaibalbe (type: number, time: Date) {
    const timeFormate = new Date(new TimeFormate(time).formateTime('YYYY-MM-DD')).valueOf()
    const todayTime = new Date(this.today).valueOf()
    if ( timeFormate < todayTime ) return false
    if (type == 0 && this.matchConfig._endTime != '') {
      // 选择开始时间
      const endTime = new Date(this.matchConfig._endTime).valueOf()
      if (endTime < timeFormate) return false
    }else {
      // 选择结束时间
      const startTime = new Date(this.matchConfig._startTime).valueOf()
      if (startTime > timeFormate) return false
    }
    return true
  }
  private selectComplete (locationInfo: any) {
    this.matchConfig._locationInfo = locationInfo
  }
  private handleCreateMatch() {
    const  { _matchName, _matchProperty, _startTime, _endTime, _maxTeamNumber, _locationInfo, _matchType, longitude, latitude, _matchAddress, _matchDetail, _joinTeamId } = this.matchConfig
    if ( !_matchName || !_startTime || !_endTime || !_maxTeamNumber || _locationInfo == null ) {
      return
    }
    new Match().createMatch.call(this, {
      user_id: this.userId || localStorage.getItem('User_ID') as string,
      match_name: _matchName,
      match_property: _matchProperty,
      start_time: _startTime,
      end_time: _endTime,
      max_team_number: _maxTeamNumber,
      location_info: _locationInfo,
      match_detail: _matchDetail,
      match_type: _matchType,
      match_address: _matchAddress,
      longitude: longitude,
      latitude: latitude,
      team_id: _joinTeamId == -1 ? null : _joinTeamId
    }).then((res: any) => {
      Toast.showToastSuccess.call(this, '赛事创建成功', '成功');
      this.matchConfig = {
        _matchName: '',
        _matchProperty: 0,
        _startTime: '',
        _endTime: '',
        _maxTeamNumber: 0,
        _locationInfo: {
          province: '',
          city: '',
          district: ''
        },
        _matchAddress: '',
        longitude: -1,
        latitude: -1,
        _matchType: null,
        _matchDetail: null,
        _joinTeamId: -1
      }
    })
  }
  private getCreateMatchDetail () {
    new Match().getCreateMatchDetail.call(this, {
      user_id: this.userId || localStorage.getItem('User_ID') as string
    }).then((res: any) => {
      this.today = res.today
      this.userTeamList = res.join_team_list
    })
  }
}
</script>
<style lang="scss" scoped>
.match-container {
  width: 100vw;
  min-height: $basic_height;
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
        width: 70%;
        border: 1px solid #DCDFE6;
      }
    }
  }
}
.content-text_area {
  resize: none;
  outline: none;
  width: 60%;
  height: 15vh;
  padding: 10px;
}
.publish-btn {
  margin: 20px 0;
  outline: none;
  padding: 10px 40px;
  background-color: transparent;
  border: 1px solid #333333;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}
.team-item {
  width: 60%;
  padding: 10px 0;
}
.team-icon {
  width: 3vw;
  height: 3vw;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
}
.team-name {
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
}
.select-icon-common {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: relative;
  border: 1px solid $base_color;
  cursor: pointer;
}
.select-icon-selected {
  @extend .select-icon-common;
  background-color: $base_color;
  &::after {
    position: absolute;
    top: 3px;
    left: 3px;
    content: " ";
    width: 9px;
    height: 9px;
    background-color: $light_green;
    border-radius: 50%;
  }
}
.location-input {
  height: 40px;
  width: 70%;
  padding: 0 5px;
  border: 1px solid rgba(#b4bccc, .7);
  border-radius: 5px;
  outline: none;
}
@media screen and (max-width: 450px) {
  .match-container {
    &-content {
      width: 100%;
    }
  }
  .content {
    &-line {
      &-title {
        display: inline-block;
        font-size: 12px;
        width: 35%;
      }
      &-content {
        display: inline-block;
        width: 65%;
      }
    }
  }
  .team-item {
    width: 100%;
    padding: 10px 0;
  }
}
@media screen and (min-width: 451px) {
  .match-container {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5vh 0;
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
  .map-container {
    width: 300px;
    height: 300px;
  }
}
</style>