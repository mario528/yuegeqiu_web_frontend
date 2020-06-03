<!--
 * @Author: majiaao
 * @Date: 2020-06-02 20:54:38
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-03 17:55:02
 * @Description: file content
--> 
<template>
  <div class="flex-column container">
    <el-dialog :showDialog="showEditDialog" @closeDialog="handleEditDialog(false)">
      <div slot="dialog-content">
        <div class="flex-row" @click.stop="handleSwitchTag">
          <div :class="[tagIndex == 0 ? 'tag-item-activity' : 'tag-item']" data-tag="0">位置</div>
          <div :class="[tagIndex == 1 ? 'tag-item-activity' : 'tag-item']" data-tag="1">号码</div>
        </div>
        <div class="tag-content">
          <div v-show="tagIndex == 0">
            <el-select v-model="positionType" placeholder="请选择">
              <el-option
                v-for="item in tagOptions"
                :key="item.type"
                :label="item.value"
                :value="item.type"
              ></el-option>
            </el-select>
          </div>
          <div v-show="tagIndex == 1">
            <div class="number-area" @click.stop="handleSelectNumber">
              <div :class="[!disabledNumberList.includes(item) ? 'number-area-item' : selectNumber == item ? 'number-area-item-selected' : 'number-area-item-disable']" v-for="(item, index) in 50" :key="index" data-avaiable="!disabledNumberList.includes(item)" :data-teamNumber="item">
                {{item}}
              </div>
            </div>
          </div>
        </div>
        <div class="width-100 flex-row-x-center">
          <span class="tag-content-btn" @click="handleDialogBtn">修改{{(tagIndex == 1 && selectNumber != -1 ? '号码:' + selectNumber : '')}}</span>
        </div>
      </div>
    </el-dialog>
    <div class="team-info">
      <div class="flex-row-y-center team-state">
        <img
          :src="isTeamMember ? require('../../../assets/true.png') : require('../../../assets/join.png')"
          class="team-state-icon"
        >
        {{isTeamMember ? '已关注' : '点击关注'}}
      </div>
      <div class="edit-member-info" v-if="isTeamMember" @click="handleEditDialog(true)">编辑个人信息</div>
      <el-carousel
        class="carousel-box"
        arrow="hover"
        height="100%"
        :interval="carouselConf.interval"
      >
        <el-carousel-item>
          <div class="flex-column-center team-info-container">
            <img :src="teamInfo.team_icon" class="team-icon">
            <span class="team-name">{{teamInfo.team_name}}</span>
            <span class="team-description">{{teamInfo.description}}</span>
          </div>
        </el-carousel-item>
        <!-- <el-carousel-item v-for="(item, index) in teamBanner" :key="index">
                    <div>1</div>
        </el-carousel-item>-->
      </el-carousel>
    </div>
    <!-- 球队通告 非队长/管理员-->
    <div class="flex-row team-inform" v-if="teamRole == 2">
      <div class="team-inform-title">球队通告</div>
      <div class="team-inform-content">{{teamInfo.team_inform || '暂未发布任何通告'}}</div>
    </div>
    <!-- 球队通告 队长/管理员-->
    <div class="flex-row team-inform" v-if="teamRole != 2">
      <team-inform
        :showInfromValue="teamInfo.team_inform"
        :teamId="teamId"
        :canEdit="teamRole == 0 || teamRole == 1"
      ></team-inform>
    </div>
    <!-- 标签页 -->
    <div class="width-100 flex-row team-tab" @click.stop="handleSwitchTab">
      <div
        :class="[ activityIndex == 0 ? 'team-tab-item-activity' : 'team-tab-item']"
        data-index="0"
      >详细信息</div>
      <div
        :class="[ activityIndex == 1 ? 'team-tab-item-activity' : 'team-tab-item']"
        data-index="1"
      >成员</div>
      <div
        :class="[ activityIndex == 2 ? 'team-tab-item-activity' : 'team-tab-item']"
        data-index="2"
      >近期活动</div>
      <div
        :class="[ activityIndex == 3 ? 'team-tab-item-activity' : 'team-tab-item']"
        data-index="3"
      >赛事</div>
    </div>
    <div id="tab-line" ref="tabline">
      <div></div>
    </div>
    <!-- 详细内容 -->
    <div class="content" v-show="activityIndex == 0">
      <div class="title">球队基本资料</div>
      <div class="flex-row-y-center detail-line">
        <div class="detail-line-title">球队地区</div>
        <div class="flex-row detail-line-content">
          <div class="province" v-if="teamInfo.province != teamInfo.city">{{teamInfo.province}}</div>
          <div class="city">{{teamInfo.city}}</div>
          <div class="district">{{teamInfo.district}}</div>
        </div>
      </div>
      <div class="flex-row-y-center detail-line">
        <div class="detail-line-title">活动区域</div>
        <div class="flex-row detail-line-content">
          <div>{{teamInfo.activity_position_detail}}</div>
        </div>
      </div>
    </div>
    <div class="content" v-show="activityIndex == 1">
      <div class="div.member-list">
        <div class="flex-row member-list-head">
          <div class="flex-row-x-center team-number">号码</div>
          <div class="team-mamber_name">用户名</div>
          <div class="team-role">身份</div>
          <div class="flex-row-x-center team-position">位置</div>
          <div class="team-operate" v-if="teamRole != 2">操作</div>
        </div>
        <div class="flex-column member-list-content">
          <div
            class="flex-row width-100"
            style="padding: 10px 0; border-bottom: 1px solid #eeeeee;"
            v-for="(item, index) in teamMember"
            :key="index"
          >
            <div class="flex-row-center team-number">{{item.team_number || '-'}}</div>
            <div class="flex-row-y-center team-mamber_name">
              <img :src="item.head_url" class="team-mamber_icon">
              <div>{{item.nick_name}}</div>
            </div>
            <div
              class="flex-row-y-center team-role"
              style="font-size: 14px;"
            >{{teamRole == 0 ? '队长' : teamRole == 1 ? '副队长' : '队员'}}</div>
            <div
              class="flex-row-center team-position"
              style="font-size: 14px;"
            >{{item.team_position ? item.team_position : '-'}}</div>
            <div class="flex-row-y-center team-operate" v-if="teamRole != 2">操作</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-show="activityIndex == 2"></div>
    <div class="content" v-show="activityIndex == 3">
      <div class="width-100 empty-tip" v-if="matchList.length == 0">您的球队暂未参与赛事</div>
    </div>
  </div>
</template>
<script lang="ts">
enum Positiontype {
  "门将",
  "边后卫",
  "中后卫",
  "后腰",
  "前腰",
  "边锋",
  "前锋"
}
import { Vue, Component } from "vue-property-decorator";
import { Getter } from "vuex-class";
import TeamType from "@/model/Team/Team";
import TeamCenterInform from "@/components/TeamPageInform.vue";
import Dialog from "@/components/Dialog/DialogComponent.vue";
import Team from '@/model/Team/Team'
import { Toast } from '@/utils/index'
@Component({
  components: {
    "team-inform": TeamCenterInform,
    "el-dialog": Dialog
  }
})
export default class MTeamDetail extends Vue {
  @Getter("getUserId")
  public userId!: string | number;

  public teamId!: string | number;
  public teamInfo: object = {};
  public teamMember: object = {};
  public showMoreInfo = false;
  public calendar!: string[];
  public calendarList!: [];
  public isTeamMember = true;
  public teamRole!: null | number;
  public matchList = [];
  private teamBanner = [];
  private carouselConf = {
    autoplay: true,
    interval: 6000,
    direction: "vertical"
  };
  private activityIndex = 0;
  private showEditDialog = false;
  private tagIndex = 0;
  private tagOptions = [
    {
      value: '门将',
      type: 0
    },{
      value: '边后卫',
      type: 1
    },{
      value: '中后卫',
      type: 2
    },{
      value: '后腰',
      type: 3
    },{
      value: '前腰',
      type: 4
    },{
      value: '边锋',
      type: 5
    },{
      value: '前锋',
      type: 6
    }
  ]
  private positionType = 6;
  private disabledNumberList = [];
  private selectNumber = -1
  mounted() {
    this.teamId = +this.$route.query.td;
    this.requestTeamDetail();
    this.handleSwitchTab({
      target: {
        dataset: { index: this.activityIndex }
      }
    });
  }
  private requestTeamDetail() {
    const teamType = new TeamType();
    const params = {
      team_id: +this.teamId,
      user_id: this.userId || (localStorage.getItem("User_ID") as string)
    };
    teamType.getTeamDetail.call(this, params).then((res: any) => {
      const {
        team_info,
        team_member,
        calendar,
        is_member,
        team_role,
        match_list
      } = res;
      team_member.forEach((item: any) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        item.team_position = Positiontype[item.team_position];
        if (item.team_number != null) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          this.disabledNumberList.push(item.team_number)
        }
      });
      this.teamInfo = team_info;
      this.teamMember = team_member;
      this.isTeamMember = is_member;
      this.teamRole = team_role;
      this.calendar = [calendar["start_at"], calendar["end_at"]];
      this.calendarList = calendar.calendar_list.map((item: any) => {
        item.showDialogContent = false;
        item.loading = true;
        return item;
      });
      document.title = team_info.team_name;
    });
  }
  private handleSwitchTab(event: any) {
    const idx = event.target.dataset.index;
    const distance = idx * 25;
    this.activityIndex = idx;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.$refs.tabline.style = `transform: translateX(${distance}vw)`;
  }
  private handleEditDialog(state: boolean) {
    this.showEditDialog = state;
  }
  private handleSwitchTag(event: any) {
    const tagIndex = +event.target.dataset.tag
    this.tagIndex = tagIndex
    this.selectNumber = 0
    this.positionType = 6
  }
  private handleSelectNumber (event: any) {
    const { avaiable, teamnumber } = event.target.dataset;
    if (!avaiable) return
    this.selectNumber = +teamnumber
  }
  private handleDialogBtn () {
    if (this.tagIndex == 0) {
      this.handleSwitchTeamPosition()
    }else {
      this.handleSwitchTeamNumber()
    }
  }
  private handleSwitchTeamNumber () {
    if (this.selectNumber == -1) return
    new Team().changeTeamMemberNumber.call(this, {
      user_id: this.userId || localStorage.getItem('User_ID'),
      team_number: this.selectNumber,
      team_id: this.teamId 
    }).then((res: any) => {
      Toast.showToastSuccess.call(this, '修改成功')
      this.requestTeamDetail()
      this.handleEditDialog(false)
    })
  }
  private handleSwitchTeamPosition () {
    if (!this.positionType) return 
    new Team().changeTeamMemberPosition.call(this, {
      user_id: this.userId || localStorage.getItem('User_ID'),
      team_position: +this.positionType,
      team_id: this.teamId
    }).then((res: any) => {
      Toast.showToastSuccess.call(this, '修改成功')
      this.requestTeamDetail()
      this.handleEditDialog(false)
    })
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  overflow-x: hidden;
  min-height: 82vh;
  margin-top: -2vh;
}
.team-info {
  position: relative;
  height: 30vh;
}
.carousel-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
}
.common-carousel-item {
  width: 100vw;
  height: 100%;
  z-index: -5;
}
.team-info-container {
  position: relative;
  width: 100vw;
  height: 100%;
  background-color: rgba($side-color, 0.8);
  z-index: 100;
}
.carousel-box ::v-deep .el-carousel__item.is-active {
  z-index: -1;
}
.team-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid white;
  margin: -10px 0 10px 0;
}
.team-name {
  font-size: 14px;
  font-weight: 500;
  color: white;
}
.team-description {
  font-size: 12px;
  color: white;
  margin-top: 5px;
}
.team-state {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 300;
  background-color: $side-color;
  color: white;
  font-weight: 500;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
  &-icon {
    width: 20px;
    height: 20px;
    margin: 0 5px;
  }
}
.team-tab {
  &-item {
    width: 25vw;
    padding: 10px 0;
    text-align: center;
    font-weight: 400;
    &-activity {
      @extend .team-tab-item;
      color: $side-color;
      font-weight: 500;
    }
  }
}
#tab-line {
  width: 25vw;
  height: 3px;
  div {
    background-color: $side-color;
    width: 40%;
    height: 3px;
    margin: 0 auto;
  }
  transition: all 0.5s ease;
}
.content {
  width: 96vw;
  margin: 2vh auto 5vh auto;
}
.title {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  background-color: rgba(#eeeeee, 0.4);
  color: #909399;
  font-weight: 500;
}
.detail-line {
  width: 100%;
  background-color: white;
  padding: 10px 5px;
  border-bottom: 1px solid #eeeeee;
  &-title {
    width: 30%;
  }
  &-content {
    width: 65%;
    margin-left: 5%;
  }
}
.province {
  padding: 5px;
  background-color: #1e90ff;
  color: white;
  margin-right: 10px;
  border-radius: 5px;
  font-size: 12px;
}
.city {
  @extend .province;
  background-color: #ba55d3;
}
.district {
  background-color: #9370db;
  @extend .province;
}
.team-inform {
  width: 96vw;
  margin: 10px auto;
  &-title {
    width: 20%;
    text-align: center;
    color: $side_color;
    font-weight: 500;
    background-color: #f2f6fc;
    padding: 5px 0;
  }
  &-content {
    width: 78%;
    margin-left: 2%;
    padding: 5px 0;
    font-size: 14px;
    font-family: serif;
  }
}
.member-list {
  &-head {
    width: 100%;
    background-color: rgba(#eeeeee, 0.4);
    color: #909399;
    padding: 10px 0;
  }
}
.team-number {
  flex: 1;
}
.team-mamber_name {
  flex: 3;
}
.team-role {
  flex: 1;
}
.team-position {
  flex: 1;
}
.team-operate {
  float: 2;
}
.team-mamber_icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.team-mamber_name {
  div {
    margin-left: 5px;
    font-size: 14px;
    font-family: serif;
  }
}
.empty-tip {
  padding: 20px 0;
  text-align: center;
  color: #909399;
  font-weight: 500;
}
.edit-member-info {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 400;
  background-color: $side-color;
  color: white;
  font-weight: 500;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
}
.tag-item {
  background-color: #c0c4cc;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  margin-right: 10px;
  &-activity {
    @extend .tag-item;
    background-color: #67c23a;
  }
}
.tag-content {
  margin-top: 4vh;
  &-btn {
    padding: 5px 20px;
    background-color: #67c23a;
    color: white;
    font-weight: 500;
    margin: 0 auto;
    border-radius: 5px;
    margin-top: 10vh;
  }
}
.number-area-item {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  float: left;
  background-color: #67c23a;
  color: white;
  font-weight: 500;
  border: 1px solid #eeeeee;
  z-index: 50;
  &-disable {
    @extend .number-area-item;
    background-color: #C0C4CC;
    color: white;
  }
  &-selected {
    @extend .number-area-item;
    background-color: #F56C6C;
    color: white;
  }
}
</style>


