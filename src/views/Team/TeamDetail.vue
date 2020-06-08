<!--
 * @Author: majiaao
 * @Date: 2020-05-05 16:56:29
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-08 16:28:35
 * @Description: file content
 -->
<template>
  <div class="team-detail_container">
    <up-arrow></up-arrow>
    <div class="width-100 flex-column team-detail-content">
      <!-- 球队详情 -->
      <div class="width-100 flex-row team-info">
        <img
          src="https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/4fd3026cc54fe450787965c631f63c02.jpg"
          class="team-info-icon"
        >
        <div class="flex-column-y-center width-100 team-info-detail">
          <div class="team-info-name">{{teamInfo.team_name}}</div>
          <div class="team-info-description">{{teamInfo.description}}</div>
          <div class="flex-row-x-between width-100 team-address">
            <div class="flex-row-y-center">
              <span class="team-address-title">活动区域</span>
              <div class="flex-row">
                <span
                  class="team-location team-province"
                  v-if="teamInfo.province != teamInfo.city"
                >{{teamInfo.province}}</span>
                <span class="team-location team-city">{{teamInfo.city}}</span>
                <span class="team-location team-district">{{teamInfo.district}}</span>
              </div>
            </div> 
            <div class="flex-row-center team-state" v-if="isTeamMember" @click="handleMemberBtn">
              <img class="team-state-btn" :src="require('@/assets/already_icon.png')" alt="" />
              已加入
            </div>
            <div class="flex-row-center team-state team-state-disable" v-else @click="handleMemberBtn">
              <img class="team-state-btn" :src="require('@/assets/join_team.png')" alt="" />
              加入球队
            </div>
          </div>
        </div>
      </div>
      <!-- 通告 -->
      <div
        class="width-100 flex-row team-inform-container"
        v-if="isTeamMember && teamRole && ![0,1].includes(teamRole)"
      >
        <div class="team-inform-btn">通告</div>
        <div refs="teamInformContainer" class="flex-row-y-center team-inform-content">
          <span ref="teamInform">{{teamInfo.team_inform}}</span>
        </div>
      </div>
      <!-- 编辑通告 -->
      <div class="team-line" v-if="isTeamMember && [0,1].includes(teamRole)">
        <div class="width-100">
          <team-inform
            :showInfromValue="teamInfo.team_inform"
            :teamId="teamId"
            :canEdit="teamRole == 0 || teamRole == 1"
            :baseColor="'#303F9F'"
          ></team-inform>
        </div>
      </div>
      <!-- 球队活动 -->
      <div class="width-100 team-line">
        <team-calendar :dateArray="calendar" :calendarList="calendarList" :teamId="teamId"></team-calendar>
      </div>
      <!-- 球队赛事 -->
      <div class="team-line width-100" style="padding-bottom: 20px;">
        <div class="flex-row-between content-title">球队赛事</div>
        <div class="width-100 match-content" v-show="!pageConfig._hideMatch">
          <el-table :data="matchList" style="width: 100%">
            <div slot="empty">
              <div>您的球队暂未参加赛事</div>
            </div>
            <el-table-column label="赛事名" prop="match_name"></el-table-column>
            <el-table-column label="比赛类型" prop="match_property"></el-table-column>
            <el-table-column label="比赛类型" prop="match_type"></el-table-column>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline>
                  <el-form-item label="开始时间">
                    <span>{{ props.row.start_time }}</span>
                  </el-form-item>
                  <el-form-item label="结束时间">
                    <span>{{ props.row.end_time }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="team-detail-member_list" style="padding-left: 20px; border-left: 1px solid #eeeeee;">
      <div class="nav-title">球队成员</div>
      <div class="flex-row member-list-header">
        <div class="member-list-item list-number">号码</div>
        <div class="member-list-item list-nick_name">用户名</div>
        <div class="member-list-item list-position">位置</div>
        <div class="member-list-item list-role">身份</div>
        <div
          class="member-list-item list-edit"
          v-if="isTeamMember && teamRole && [0,1].includes(teamRole)"
        >编辑</div>
      </div>
      <div class="flex-column member-list-content">
        <div class="flex-row member-list-line" v-for="(item, index) in teamMember" :key="index">
          <div class="member-list-item list-number flex-row-y-center">{{item.team_number}}</div>
          <div class="member-list-item list-nick_name flex-row-y-center">
            <img :src="item.head_url" class="list-user_icon">
            <span style="margin-left: 5px;">{{item.nick_name}}</span>
          </div>
          <div class="member-list-item list-position flex-row-y-center">{{item.team_position}}</div>
          <div
            class="member-list-item list-role flex-row-y-center"
          >{{item.role == 0 ? '队长' : item.role == 1 ? '副队长' : '球员'}}</div>
          <div
            class="member-list-item list-edit flex-row-y-center"
            v-if="isTeamMember && teamRole && [0,1].includes(teamRole)"
          >编辑</div>
        </div>
      </div>
      <!-- 球队地图 -->
      <div class="flex-row-between nav-title" style="margin-top: 5vh">
        活动位置
        <div style="font-size: 12px;">球队地图</div>
      </div>
      <div id="team-map"></div>
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
  "前锋",
  "教练"
}
/* eslint-disable @typescript-eslint/camelcase */
import { Vue, Component } from "vue-property-decorator";
import { State, Getter } from "vuex-class";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import AMap from "AMap";
import { Toast, TimeFormate, MapUtils } from "@/utils/index";
import TeamType from "@/model/Team/Team";
import TeamShirt from "@/components/TeamShirt.vue";
import TeamCenterInform from "@/components/TeamPageInform.vue";
import TeamCalendar from "@/components/TeamCalendar.vue";
import IconDIY from "@/components/IconDiy.vue";
@Component({
  components: {
    "team-shirt": TeamShirt,
    "team-inform": TeamCenterInform,
    "team-calendar": TeamCalendar,
    "mario-icon": IconDIY
  }
})
export default class TeamDetail extends Vue {
  @Getter("getUserId")
  public userId!: string | number;
  public map!: any;
  public teamId!: string | number;
  public teamInfo: object = {};
  public teamMember: object = {};
  public showMoreInfo = false;
  public calendar!: string[];
  public calendarList = [];
  public isTeamMember = false;
  public teamRole!: null | number;
  public matchList = [];
  private positionType = 6;
  private disabledNumberList = [];
  private pageConfig = {
    _hideMatch: false
  };
  private downArrow: string = require("@/assets/user_arrow_black.png");
  mounted() {
    const that = this;
    this.teamId = +this.$route.query.td;
    this.requestTeamDetail();
    this.map = new AMap.Map("team-map", {
      resizeEnable: true,
      mapStyle: "amap://styles/fresh",
      zooms: [10, 16],
      loadComplete: false
    });
    this.map.setFeatures(["point", "road", "building", "bg"]);
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
          this.disabledNumberList.push(item.team_number);
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
      if (
        this.isTeamMember &&
        this.teamRole &&
        ![0, 1].includes(this.teamRole)
      ) {
        this.$nextTick(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          const contentWidth = this.$refs.teamInform.scrollWidth;
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          const containerWidth = document.body.clientWidth * 0.8 * 0.55 * 0.9;
          if (contentWidth < containerWidth) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.$refs.teamInform.style = "animation: none;";
          }
        });
      }
      document.title = team_info.team_name;
      const marker = new AMap.Marker({
        size: new AMap.Size(20, 20),
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        title: this.teamInfo.team_name,
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        position: [this.teamInfo.longitude, this.teamInfo.latitude]
      });
      this.map.add(marker)
    });
  }
  private uploadRequest(fileFormData: any) {
    new TeamType().uploadTeamIcon
      .call(this, {
        team_id: +this.teamId,
        form_data: fileFormData
      })
      .then((res: any) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.teamInfo.team_icon = res.team_url;
        Toast.showToastSuccess.call(this, "上传成功", "成功");
      })
      .catch((err: any) => {
        Toast.showToastError.call(this, err.msg, "失败");
      });
  }
  private handleMemberBtn() {
    if (this.isTeamMember) {
      this.$confirm("离队操作不可撤销，是否继续?", "离队", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.handleLeaveTeam();
      });
    } else {
      this.handleJoinTeam();
    }
  }
  private handleJoinTeam() {
    new TeamType().joinTeam
      .call(this, {
        team_id: +this.teamId,
        user_id: this.userId || (localStorage.getItem("User_ID") as string)
      })
      .then((res: any) => {
        Toast.showToastSuccess.call(this, "加入球队成功", "成功");
        this.requestTeamDetail();
      });
  }
  private handleLeaveTeam() {
    new TeamType().departTeam
      .call(this, {
        team_id: +this.teamId,
        user_id: this.userId || (localStorage.getItem("User_ID") as string)
      })
      .then((res: any) => {
        Toast.showToastSuccess.call(this, "离队成功", "成功");
        this.requestTeamDetail();
      });
  }
  private handleContentVisibleByType(type: any) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.pageConfig._hideMatch = !this.pageConfig._hideMatch;
  }
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.team-detail {
  &_container {
    width: 80vw;
    margin: 0px auto;
    background-color: blue;
  }
  &-content {
    float: left;
    width: 55%;
    margin-bottom: 15px;
  }
  &-member_list {
    float: left;
    margin-left: 5%;
    width: 40%;
  }
}
.nav-title {
  background: linear-gradient(
    -45deg,
    rgba($base-color, 0.6) 50%,
    $base-color 50%
  );
  padding: 8px;
  color: white;
  font-weight: 500;
  border-radius: 5px;
}
.member-list {
  &-header {
    width: 100%;
    border-bottom: 1px solid #eeeeee;
  }
  &-item {
    padding: 10px 0;
  }
  &-line {
    padding: 5px 0;
    border-bottom: 1px solid #eeeeee;
  }
}
.list {
  &-number {
    flex: 1;
  }
  &-nick_name {
    flex: 2;
  }
  &-user_icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  &-position {
    flex: 1;
  }
  &-role {
    flex: 1;
  }
  &-edit {
    flex: 1;
  }
}
.team-info {
  border-bottom: 1px solid #eeeeee;
  &-detail {
    margin-left: 5%;
  }
  &-icon {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 10px;
  }
  &-name {
    font-size: 22px;
    font-weight: 500;
    font-family: "Tahoma";
    letter-spacing: 2px;
  }
  &-description {
    font-size: 14px;
    color: #909399;
    font-weight: 500;
    margin: 10px 0;
    letter-spacing: 1px;
  }
}
.team-address {
  &-title {
    font-size: 14px;
    font-weight: 500;
  }
}
.team-location {
  padding: 2px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  border-radius: 5px;
  margin-left: 10px;
}
.team-province {
  background-color: #1e90ff;
}
.team-city {
  background-color: #0000cd;
}
.team-district {
  background-color: #4169e1;
}
.team-inform {
  &-container {
    margin: 20px 0;
  }
  &-btn {
    width: 10%;
    text-align: center;
    padding: 5px 0;
    background-color: #67c23a;
    color: white;
    box-shadow: $basic_shadow;
  }
  &-content {
    width: 90%;
    background-color: white;
    font-size: 14px;
    padding: 0 20px;
    overflow: hidden;
    border-bottom: 1px solid #eeeeee;
    span {
      white-space: nowrap;
      display: inline-block;
      animation: wordLoop 25s linear infinite normal;
    }
  }
}
.team-line {
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 5px;
}
.content-title {
  width: 100%;
  margin: 20px 0;
  text-align: start;
  font-weight: 500;
}
.down-arrow {
  width: 25px;
  height: 25px;
  transition: all 0.3s ease;
  &-up {
    @extend .down-arrow;
    transform: rotate(180deg);
  }
}
#team-map {
  width: 100%;
  height: 400px;
  margin-top: 2vh;
}
.team-state {
  width: 20%;
  text-align: center;
  padding: 8px 0;
  background-color: $base-color;
  color: white;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &-btn {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  &-disable {
    background-color: #C0C0C0;
  }
}
@keyframes wordLoop {
  0% {
    transform: translateX(0%);
  }
  30% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
