<!--
 * @Author: majiaao
 * @Date: 2020-05-05 16:56:29
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-21 23:10:34
 * @Description: file content
 -->
<template>
  <div class="team-detail_container">
    <chat-frame
      :title="teamInfo.team_name"
      :memberNumber="teamMember.length"
      :teamId="teamId"
      :isTeamMember="isTeamMember"
    ></chat-frame>
    <el-dialog :showDialog="showEditDialog" @closeDialog="handleEditDialog(false)">
      <div slot="dialog-content" v-if="showEditDialog">
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
              <div
                :class="[!disabledNumberList.includes(item) ? 'number-area-item' : selectNumber == item ? 'number-area-item-selected' : 'number-area-item-disable']"
                v-for="(item, index) in 50"
                :key="index"
                :data-avaiable="!disabledNumberList.includes(item)"
                :data-teamNumber="item"
              >{{item}}</div>
            </div>
          </div>
        </div>
        <div class="width-100 flex-row-x-center">
          <span
            class="tag-content-btn"
            @click="handleDialogBtn"
          >修改{{(tagIndex == 1 && selectNumber != -1 ? '号码:' + selectNumber : '')}}</span>
        </div>
      </div>
    </el-dialog>
    <up-arrow></up-arrow>
    <!-- 左侧 -->
    <div class="width-100 flex-column team-detail-content">
      <!-- 球队详情 -->
      <div class="width-100 flex-row team-info">
        <div class="team-upload" v-if="[0,1].includes(teamRole)">
          <mario-icon
            :iconPath="teamInfo.team_icon"
            :hoverModel="true"
            @uploadRequest="uploadRequest"
          ></mario-icon>
        </div>
        <img :src="teamInfo.team_icon" class="team-info-icon" v-else>
        <div class="flex-column-y-center team-info-detail">
          <div class="width-100 flex-row-between">
            <div>
              <div class="team-info-name">{{teamInfo.team_name}}</div>
              <div class="team-info-description">{{teamInfo.description}}</div>
            </div>
            <div class="invite-game" v-if="!isTeamMember" @click="handleChallenge">约个球</div>
          </div>
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
              <img class="team-state-btn" :src="require('@/assets/already_icon.png')" alt="">
              已加入
            </div>
            <div
              class="flex-row-center team-state team-state-disable"
              v-else
              @click="handleMemberBtn"
            >
              <img class="team-state-btn" :src="require('@/assets/join_team.png')" alt="">
              加入球队
            </div>
          </div>
        </div>
      </div>
      <!-- 挑战 -->
      <div class="width-100" v-if="showChallengeDialog">
        <div class="flex-row-y-center challeng-line">
          <div class="challeng-line-title">比赛类型</div>
          <div class="challeng-line-content">
            <el-select v-model="matchConfig._matchType" placeholder="比赛类型" class="challeng-line-content-select">
              <el-option v-for="item in matchTypeList" :key="item.type" :label="item.value" :value="item.type"></el-option>
            </el-select>
          </div>
        </div>
        <div class="flex-row-y-center challeng-line">
          <div class="challeng-line-title">比赛时间</div>
          <div class="challeng-line-content">
            <el-date-picker v-model="matchConfig._matchTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="比赛时间"></el-date-picker>
          </div>
        </div>
        <div class="flex-row-y-center challeng-line">
          <div class="challeng-line-title">地点</div>
          <div class="challeng-line-content">
            <input class="challeng-line-input" id="tipinput" placeholder="比赛位置" type="text" v-model="matchConfig._positionDetail">
          </div>
        </div>
        <div class="flex-row-y-center challeng-line">
          <div class="challeng-line-title">更多</div>
          <div class="challeng-line-content">
            <div class="challeng-line-text_content">
              <textarea class="challeng-line-text_area"
                      :maxlength="textareaConfig.maxlength"
                      placeholder="联系方式/介绍" 
                      v-model="matchConfig._moreDetail">
              </textarea>
              <a class="count-down">{{matchConfig._moreDetail.length}}/100</a>
            </div>
          </div>
        </div>
        <div class="flex-row-center">
          <div class="challeng-line-btn" @click="handleCreateChallenge">去约球！</div>
        </div>
      </div>
      <!-- 通告 -->
      <div
        class="width-100 flex-row team-inform-container"
        v-if="isTeamMember && teamRole && ![0,1].includes(teamRole)"
      >
        <div class="team-inform-btn">通告</div>
        <div refs="teamInformContainer" class="flex-row-y-center team-inform-content">
          <span ref="teamInform">{{teamInfo.team_inform || '暂无通告'}}</span>
        </div>
      </div>
      <!-- 编辑通告 -->
      <div class="team-line" v-if="isTeamMember && [0,1].includes(teamRole)">
        <div class="width-100">
          <team-inform
            :showInfromValue="teamInfo.team_inform"
            :teamId="teamId"
            :canEdit="teamRole == 0 || teamRole == 1"
          ></team-inform>
        </div>
      </div>
      <!-- 球队活动 -->
      <div class="width-100 team-line">
        <team-calendar :dateArray="calendar" :calendarList="calendarList" :teamId="teamId"></team-calendar>
      </div>
      <!-- 球队赛事 -->
      <div class="team-line width-100" style="padding-bottom: 80px;">
        <div class="flex-row-between content-title">球队赛事</div>
        <div class="width-100 match-content" v-show="!pageConfig._hideMatch">
          <el-table :data="matchList" style="width: 100%">
            <div slot="empty">
              <div>{{isTeamMember ? '您的' : '该'}}球队暂未参加赛事</div>
              <div class="flex-row" @click.stop="handleMatchEvent">
                <div class="match-btn" data-type="join">参加赛事</div>
                <div class="match-btn" data-type="create">发起赛事</div>
              </div>
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
    <!-- 右侧 -->
    <div
      class="team-detail-member_list"
      style="padding-left: 20px; border-left: 1px solid #eeeeee;"
    >
      <div class="flex-row-between width-100 nav-title">
        球队成员
        <span
          v-if="isTeamMember"
          style="font-size: 12px;"
          @click="handleEditDialog(true)"
        >编辑个人信息</span>
      </div>
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
      <div class="flex-column member-list-content" @click.stop="handleUserCenter">
        <div class="flex-row member-list-line" v-for="(item, index) in teamMember" :key="index" data-id="item">
          <div
            class="member-list-item list-number flex-row-y-center"
          >{{item.team_number ? item.team_number : '-'}}</div>
          <div class="member-list-item list-nick_name flex-row-y-center">
            <img :src="item.head_url" class="list-user_icon">
            <span style="margin-left: 5px;">{{item.nick_name}}</span>
          </div>
          <div
            class="member-list-item list-position flex-row-y-center"
          >{{item.team_position ? item.team_position : '-'}}</div>
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
      <div class="flex-row-between nav-title" style="margin-top: 5vh">活动位置
        <div style="font-size: 12px;">球队地图</div>
      </div>
      <!-- 球队地图 -->
      <div id="team-map">
        <div class="flex-column-center team-map-loading" v-if="teamMapLoading">
          <i class="el-icon-loading loading-icon"></i>
          <div>加载中</div>
        </div>
      </div>
      <!-- 球队留言板 -->
      <div class="message-board-container">
        <div class="flex-row-between width-100 nav-title" style="margin-top: 5vh">留言板</div>
        <div class="message-board">
          <div
            class="message-board-content"
            :style="{ 'animation':  scrollMode ? 'roll 10s linear;' : 'none'}"
            ref="messageBoardContent"
            @mouseover="handleRollStyle(true)"
            @mouseleave="handleRollStyle(false)"
          >
            <div
              class="flex-row message-board-content-line"
              v-for="(item, index) in messageBoardList"
              :key="index"
            >
              <div>
                <img :src="item.user_info.head_url" class="message-board-content-head_url" />
                <div class="message-board-content-nick_name">{{item.user_info.nick_name | standardNickName}}</div>
              </div>
              <div class="message-board-content-detail">
                {{item.content}}
                <div class="flex-row-y-center message-board-content-time">{{item.publish_date | unitTime}}</div>
              </div>
            </div>
            <div class="empty-tips" v-if="messageBoardList.length == 0">暂无留言</div>
          </div>
          <div class="width-100 flex-row-x-end message-board-footer">
            <el-pagination
              background=""
              :current-page="pageConfig._pageCurrent"
              :page-size="pageConfig._pageSize"
              layout="prev, pager, next"
              :total="pageConfig._pageTotal"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
          <div class="flex-row" style="margin-top: 10px; padding: 5px 10px;">
            <textarea class="message-board-content-text_area" v-model="messageBoardContent"></textarea>
            <div class="flex-row-y-center message-board-content-send_btn" @click="handSendBoardMessage">
              <img class="message-board-content-send_btn_icon" :src="require('@/assets/send_msg_icon.png')" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
enum PositiontypeEnum {
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
import { State, Getter, Action } from "vuex-class";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import AMap from "AMap";
import { Toast, TimeFormate, MapUtils } from "@/utils/index";
import { LoginStateCheck } from '@/mixins/index'
import TeamType from "@/model/Team/Team";
import TeamShirt from "@/components/TeamShirt.vue";
import TeamCenterInform from "@/components/TeamPageInform.vue";
import TeamCalendar from "@/components/TeamCalendar.vue";
import IconDIY from "@/components/IconDiy.vue";
import Dialog from "@/components/Dialog/DialogComponent.vue";
import ChatFrame from "@/components/ChatFrame.vue";
@Component({
  components: {
    "team-shirt": TeamShirt,
    "team-inform": TeamCenterInform,
    "team-calendar": TeamCalendar,
    "mario-icon": IconDIY,
    "el-dialog": Dialog,
    "chat-frame": ChatFrame
  }
})
export default class TeamDetail extends LoginStateCheck {
  @Getter("getUserId")
  public userId!: string | number;
  @Action("handleLoginOrRegisterState")
  public handleLoginOrRegisterState!: (state: number) => void
  public map!: any;
  public teamId = -1;
  public teamInfo: object = {};
  public teamMember: object = {};
  public showMoreInfo = false;
  public calendar: string[] = [];
  public calendarList = [];
  public isTeamMember = false;
  public teamRole = 2;
  public matchList = [];
  private positionType = 6;
  private disabledNumberList = [];
  private textareaConfig = {
    maxlength: 100
  }
  private pageConfig = {
    _hideMatch: false,
    _pageCurrent: 0,
    _pageSize: 5,
    _pageTotal: 0,
    _messageBoardModel: 0 // 0 按时间正序 1 按时间倒叙
  };
  private tagIndex = 0;
  private tagOptions = [
    {
      value: "门将",
      type: 0
    },
    {
      value: "边后卫",
      type: 1
    },
    {
      value: "中后卫",
      type: 2
    },
    {
      value: "后腰",
      type: 3
    },
    {
      value: "前腰",
      type: 4
    },
    {
      value: "边锋",
      type: 5
    },
    {
      value: "前锋",
      type: 6
    },
    {
      value: "教练",
      type: 7
    }
  ];
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
  private selectNumber = -1;
  private showEditDialog = false;
  private downArrow: string = require("@/assets/user_arrow_black.png");
  private messageBoardList = [];
  private scrollMode = false;
  private messageBoardContent = ''
  private teamMapLoading = true
  private showChallengeDialog = false
  private matchConfig = {
    _matchType: 0,
    _matchTime: '',
    _positionDetail: '',
    _locationDetail: {
      longitude: undefined,
      latitude: undefined
    },
    _teamId: -1,
    _moreDetail: ''
  }
  mounted() {
    const that = this
    this.teamId = +this.$route.query.td;
    this.map = new AMap.Map("team-map", {
      resizeEnable: true,
      mapStyle: "amap://styles/fresh",
      zooms: [10, 16],
      loadComplete: false
    });
    this.map.setFeatures(["point", "road", "building", "bg"]);
    this.map.on("complete", () => {
      this.teamMapLoading = false
    })
    this.requestTeamDetail();
    this.requestTeamMessageBoard();
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
        that.matchConfig._locationDetail = {
          longitude: lng,
          latitude: lat
        };
      });
    });
  }
  beforeDestroy() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.$socket.emit("disconnectTeamChat", {
      team_id: +this.teamId
    });
  }
  private handleLogin () {
    this.handleLoginOrRegisterState(Number(1))
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.$event.emit("changeLoginDialogState");
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
        item.team_position = PositiontypeEnum[item.team_position];
        if (item.team_number != null) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          this.disabledNumberList.push(item.team_number);
        }
      });
      this.teamInfo = team_info;
      this.teamMember = team_member;
      this.isTeamMember = Boolean(is_member);
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
      this.map.add(marker);
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
    if (!this.checkLoginState()) {
      this.handleLogin()
      return
    }
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
    if (!this.checkLoginState()) {
      this.handleLogin()
      return
    }
    new TeamType().joinTeam
      .call(this, {
        team_id: +this.teamId,
        user_id: this.userId || (localStorage.getItem("User_ID") as string)
      })
      .then((res: any) => {
        Toast.showToastSuccess.call(this, "加入球队成功", "成功");
        // TODO 服务端问题
        setTimeout(() => {
          this.requestTeamDetail();
        }, 500)
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
        // TODO 服务端问题
        setTimeout(() => {
          this.requestTeamDetail();
        }, 500)
      });
  }
  private handleContentVisibleByType(type: any) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.pageConfig._hideMatch = !this.pageConfig._hideMatch;
  }
  private handleSwitchTag(event: any) {
    const tagIndex = +event.target.dataset.tag;
    this.tagIndex = tagIndex;
    this.selectNumber = 0;
    this.positionType = 6;
  }
  private handleEditDialog(state: boolean) {
    this.showEditDialog = state;
    this.showChallengeDialog = state;
  }
  private handleSelectNumber(event: any) {
    const { avaiable, teamnumber } = event.target.dataset;
    if (!avaiable) return;
    this.selectNumber = +teamnumber;
  }
  private handleDialogBtn() {
    if (!this.checkLoginState()) {
      this.handleLogin()
      return
    }
    if (this.tagIndex == 0) {
      this.handleSwitchTeamPosition();
    } else {
      this.handleSwitchTeamNumber();
    }
  }
  private handleSwitchTeamNumber() {
    if (this.selectNumber == -1) return;
    new TeamType().changeTeamMemberNumber
      .call(this, {
        user_id: this.userId || localStorage.getItem("User_ID"),
        team_number: this.selectNumber,
        team_id: this.teamId
      })
      .then((res: any) => {
        Toast.showToastSuccess.call(this, "修改成功");
        this.requestTeamDetail();
        this.handleEditDialog(false);
      });
  }
  private handleSwitchTeamPosition() {
    if (!this.positionType) return;
    new TeamType().changeTeamMemberPosition
      .call(this, {
        user_id: this.userId || localStorage.getItem("User_ID"),
        team_position: +this.positionType,
        team_id: this.teamId
      })
      .then((res: any) => {
        Toast.showToastSuccess.call(this, "修改成功");
        this.requestTeamDetail();
        this.handleEditDialog(false);
      });
  }
  private handleRollStyle(state: boolean) {
    if (state) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.$refs.messageBoardContent.style = "animation-play-state: paused";
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.$refs.messageBoardContent.style = "animation-play-state: running";
    }
  }
  private requestTeamMessageBoard(page = 0) {
    new TeamType().getTeamMessageBoard
      .call(this, {
        team_id: +this.teamId,
        user_id: this.userId || (localStorage.getItem("User_ID") as string),
        sort_type: this.pageConfig._messageBoardModel,
        page: page
      })
      .then((res: any) => {
        const { list, count  } = res.message_board_info
        this.pageConfig._pageTotal = count
        this.messageBoardList = list
        this.$nextTick(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          const messageBoardContentHeight = this.$refs.messageBoardContent.clientHeight;
          if (messageBoardContentHeight > 400) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.scrollMode = true;
          }
        });
      });
  }
  private handleCurrentChange(page: any) {
    this.pageConfig._pageCurrent = page
    this.requestTeamMessageBoard(page - 1)
  }
  private handSendBoardMessage () {
    if (!this.checkLoginState()) {
      this.handleLogin()
      return
    }
    if (!this.messageBoardContent) {
      return
    }
    new TeamType().sendTeamMessageBoard.call(this, {
      team_id: +this.teamId,
      user_id: this.userId || (localStorage.getItem("User_ID") as string),
      content: this.messageBoardContent
    }).then((res: any) => {
      Toast.showToastSuccess.call(this, '留言成功')
      this.messageBoardContent = ''
      this.handleCurrentChange(1)
    })
  }
  private handleMatchEvent (event: any) {
    if (!this.checkLoginState()) {
      this.handleLogin()
      return
    }
    const type = event.target.dataset.type
    if (type == 'create') {
      this.$router.push({
        path: '/match/create',
        name: 'createMatch'
      })
    }else {
      // this.$router.push({
      //   path: '/match/create',
      //   name: 'createMatch'
      // })
    }
  }
  private handleUserCenter (event: any) {
    const visit_id = event.target.dataset.id
  }
  private handleChallenge () {
    if (!this.checkLoginState()) {
      this.handleLogin()
      return
    }
    new TeamType().getUserTeamList.call(this, {
      user_id: this.userId || (localStorage.getItem("User_ID") as string)
    }).then((res: any) => {
      const teamNumber = res.team_list.length
      if (teamNumber == 0) {
        Toast.showToastError.call(this, '您暂无加盟球队')
      }else if (teamNumber == 1) {
        this.showChallengeDialog = true
        this.matchConfig._teamId = res.team_list[0].id
      }else {
        // 
      }
    });
  }
  private handleCreateChallenge () {
    new TeamType().createChallenge.call(this, {
      user_id: this.userId || (localStorage.getItem("User_ID") as string),
      team_id: this.matchConfig._teamId,
      time: this.matchConfig._matchTime,
      location: this.matchConfig._positionDetail,
      type: this.matchConfig._matchType,
      detail: this.matchConfig._moreDetail
    }).then((res: any) => {
      const teamNumber = res.team_list.length
      if (teamNumber == 0) {
        Toast.showToastError.call(this, '您暂无加盟球队')
      }else if (teamNumber == 1) {
        this.showChallengeDialog = true
      }else {
        // 
      }
    });
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
    min-width: 1000px;
    margin: 0px auto;
    position: relative;
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
    border: 1px solid #a9a9a9;
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
    width: 70%;
  }
  &-icon {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 10px;
    border: 1px solid #eeeeee;
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
  position: relative;
}
.team-map-loading {
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2); 
  color: white;
}
.loading-icon {
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 10px;
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
    background-color: #c0c0c0;
  }
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
    background-color: #c0c4cc;
    color: white;
  }
  &-selected {
    @extend .number-area-item;
    background-color: #f56c6c;
    color: white;
  }
}
.team-upload {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.message-board {
  margin-top: 20px;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  box-shadow: $basic_shadow;
  margin-bottom: 2vh;
  &-content {
    width: 100%;
    min-height: 50vh;
    position: relative;
    &-line {
      padding: 10px 5px;
      box-sizing: border-box;
      border-bottom: 1px solid #eeeeee;
    }
    &-head_url {
      width: 60px;
      height: 60px;
      display: block;
      border-radius: 5px;
    }
    &-nick_name {
      font-size: 12px;
      margin-top: 5px;
    }
    &-detail {
      margin-left: 20px;
      width: 75%;
      min-height: 100%;
      padding: 10px 10px 40px 10px;
      box-sizing: border-box;
      word-break: break-all;
      background-color: #F8F3F3;
      border-radius: 10px;
      position: relative;
    }
    &-time {
      position: absolute;
      right: 10px;
      bottom: 10px;
      height: 20px;
      line-height: 20px;
      color: #a9a9a9;
      font-size: 12px;
    }
    &-text_area {
      resize: none;
      width: 90%;
      height: 40px;
      border: 1px solid #eeeeee;
      outline: none;
      padding: 10px;
      font-size: 16px;
      color: #a9a9a9;
      font-weight: 500;
    }
    &-send_btn {
      width: 10%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      &_icon {
        width: 30px;
        height: 30px;
        margin: 5px auto;
        box-shadow: $basic_shadow;
      }
    }
  }
  &-footer {
    padding: 5px 0;
    border-top: 1px solid #eeeeee;
  }
}
.empty-tips {
  width: 100%;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #a9a9a9;
  font-weight: 500;
  letter-spacing: 1px;
}
.match-btn {
  background-color: $base-color;
  color: white;
  margin: 0 auto;
  width: 25%;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;
}
.invite-game {
  background-color: $side_color;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
  border-radius: 20px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  color: white;
  font-weight: 500;
  position: relative;
  cursor: pointer;
}
.dialog-header {
  font-size: 18px;
  font-weight: 500;
  padding: 2px 15px;
  box-sizing: border-box;
  position: relative;
  &::before {
    content: '';
    background-color: $side_color;
    width: 8px;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }
}
.challeng-line {
  padding: 10px 0;
  &-title {
    font-size: 14px;
    font-weight: 500;
    width: 20%;
  }
  &-content {
    width: 60%;
    margin-left: 20%;
  }
  &-input {
    height: 40px;
    width: 85%;
    padding: 0 5px;
    border: 1px solid rgba(#b4bccc, .7);
    border-radius: 5px;
  }
  &-text_content {
    width: 85%;
    height: 120px;
    position: relative;
    border: 1px solid rgba(#b4bccc, .7);
    border-radius: 5px;
  }
  &-text_area {
    width: 100%;
    height: 100px;
    resize: none;
    padding: 5px 10px 20px 10px;
    font-size: 14px;
    color: #333;
    outline: none;
    border: none;
  }
  &-btn {
    background-color: $side_color;
    color: white;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 5vh;
    cursor: pointer;
  }
}
.count-down {
  color: #a9a9a9;
  font-size: 12px;
  position: absolute;
  bottom: 0px;
  right: 5%;
  z-index: 50;
}
#tipinput {
  border: 1px solid rgba(#b4bccc, .7);
  outline: none;
}
.challeng-line-content ::v-deep .challeng-line-content-select {
  width: 85%;
}
@keyframes roll {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
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
