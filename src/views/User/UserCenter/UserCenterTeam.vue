<!--
 * @Author: majiaao
 * @Date: 2020-04-28 21:06:30
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-03 14:04:30
 * @Description: file content
 -->
<template>
    <div class="user-team-container">
      <div class="width-100 flex-row-between user-team-container-title">
        我的球队
        <div class="flex-row-y-center" @click="handleRouter('join_team')">
          <img :src="require('../../../assets/find_icon.png')" class="search-icon">
          <span class="common-text">点击查找更多球队</span>
        </div>
      </div>
      <!-- 球队列表 -->
      <div class="flex-row width-100 user-team-container-line team-area">
        <span class="user-team-container-line-title">我的球队</span>
        <div class="team-area-item" v-for="(item, index) in teamList" :key="index" @click="handleTeamDetail(item.id)">
          <img :src="item.team_icon" class="team-area-item-icon">
          <div class="team-area-item-team_name">{{item.team_name}}</div>
          <div class="team-area-item-description">{{item.description}}</div>
        </div>
        <div class="width-100 empty-tip" v-if="teamList.length == 0">
          <div>暂未加入任何球队</div>
          <a @click="handleRouter('teamSearch')">点击搜索球队</a>或<a @click="handleRouter('create_team')">创建球队</a>
        </div>
      </div>
      <!-- 近期活动 -->
      <div class="width-100 user-team-container-line">
        <span class="user-team-container-line-title">近期活动</span>
        <div class="calendar">
          <div class="calendar-week_list" v-for="(item, index) in weekList" :key="index">{{item}}</div>
        </div>
        <div class="calendar-content">
          <div class="calendar-content-item" v-for="(item, index) in calendar.today_week" :key="index"></div>
          <div class="calendar-content-item-white" v-for="(item, index) in calendar.calendar_list" :key="index">
            <div class="calendar-content-item-date">{{item.date.substring(8)[0] == '0' ? item.date.substring(9) : item.date.substring(8)}}</div>
          </div>
        </div>
      </div>
    </div>
</template> 
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
import Team from "@/model/Team/Team";
@Component
export default class UserCenterTeam extends Vue {
  @Getter("getUserId")
  private userId!: string | undefined;
  
  private teamList = [];
  private weekList = ['日','一','二','三','四','五','六']
  private calendar = {}
  mounted() {
    this.requestUserTeamInfo();
  }
  private requestUserTeamInfo() {
    const params = {
      user_id: this.userId || (localStorage.getItem("User_ID") as string)
    };
    new Team().getUserTeamInfo.call(this, params).then((res: any) => {
      const { team, calendar } = res;
      this.teamList = team;
      this.calendar = calendar
    });
  }
  handleRouter(type: string) {
    switch (type) {
      case "create_team":
        this.$router.push('/team/create')
        break;
      case "join_team":
        this.$router.push('/team/search')
        break;
      case "teamSearch":
        this.$router.push('/team/search')
        break;
    }
  }
  private handleTeamDetail (teamId: string): void {
    this.$router.push({
      path: '/team/detail',
      query: {
        td: teamId
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.user-team-container {
  width: 100%;
  height: 100%;
  &-title {
    font-size: 18px;
    font-weight: 500;
    text-align: start;
    box-sizing: border-box;
    padding: 15px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  &-line {
    text-align: start;
    box-sizing: border-box;
    padding: 25px 20px;
    &-title {
      font-size: 16px;
      position: relative;
      padding-left: 8px;
      font-weight: 500;
      &::before {
        content: " ";
        width: 5px;
        height: 100%;
        background-color: $side_color;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
}
.search-icon {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.common-text {
  font-size: 12px;
  color: $base_black_color;
  margin-left: 10px;
  cursor: pointer;
}
.team-area {
  text-align: center;
  flex-wrap: wrap;
  &-item {
    width: 25%;
    min-width: 150px;
    height: width;
    padding: 15px 0;
    margin: 0 20px 20px 0;
    background-color: $base_color;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    color: $light_green;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    &-icon {
      width: 100px;
      height: 100px;
      background-color: white;
      border-radius: 50%;
      animation: rotate3d 10s ease infinite;
    }
    &-team_name {
      font-size: 16px;
      font-weight: 500;
      margin-top: 10px;
    }
    &-description {
      font-size: 12px;
      margin-top: 5px;
    }
  }
}
.calendar {
  display: grid;
  padding: 15px 0 0 0;
  grid-template-columns: repeat(auto-fill, 13%);
  color: #eeeeee;
  font-weight: 500;
  &-week {
    &_list {
      text-align: center;
      padding: 10px 0;
      background-color: $base_color;
    }
  }
  &-content {
    display: grid;
    grid-template-columns: repeat(auto-fill, 13%);
    &-item {
      background-color: rgba(0, 0, 0, 0.02);
      text-align: center;
      height: 100px;
      position: relative;
      border: 1px solid rgba(169,169,169,.1);
      &-date {
        font-size: 18px;
        font-weight: 600;
        position: absolute;
        top: 10px;
        left: 10px;
      }
      &-white {
        @extend .calendar-content-item;
        background-color: rgba(0, 0, 0, 0.02);
      }
    }
  }
}
.empty-tip {
  padding: 40px 0;
  div {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  a {
    text-decoration: underline;
    font-size: 14px;
    color: $base_color;
    cursor: pointer;
    font-weight: 500;
  }
}
@keyframes rotate3d {
  0% {
    transform: rotateY(0deg)
  }
  50% {
    transform: rotateY(360deg)
  }
  100% {
    transform: rotateY(0deg)
  }
}
@media screen and (max-width: 450px){
  .team-area {
    text-align: center;
    flex-wrap: wrap;
    &-item {
      width: 100%;
      margin: 0 0 20px 0;
      &-team_name {
        font-size: 14px;
      }
      &-description {
        font-size: 10px;
      }
      &-icon {
        max-width: 80px;
        max-height: 80px;
      }
    }
  }
  .calendar-content {
    &-item-date {
      position: relative;
      margin: 0 auto;
      top: 10px;
      left: auto;
    }
  }
}
@media screen and (max-width: 451px){
  .team-area {
    &-item {
      
    }
  }
}
</style>