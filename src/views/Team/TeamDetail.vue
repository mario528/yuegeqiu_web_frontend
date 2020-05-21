<!--
 * @Author: majiaao
 * @Date: 2020-05-05 16:56:29
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-21 14:37:52
 * @Description: file content
 -->
<template>
   <div class="container">
      <div class="container-box">
         <div class="container-main">
            <div class="main-content">
               <!-- 球队信息 -->
               <div class="width-100 flex-row-between team-troduction">
                  <div>
                     <div class="team-troduction-name">{{teamInfo.team_name}}</div>
                     <div class="team-troduction-description">{{teamInfo.description}}</div>
                  </div>
                  <div :class="[isTeamMember ? 'flex-row-y-center team-troduction-state' : 'flex-row-y-center team-troduction-state team-troduction-state-disable']" @click="handleMemberBtn">
                     <img :src="isTeamMember ? require('../../assets/true.png') : require('../../assets/join.png')" class="team-troduction-state-icon">
                     {{isTeamMember ? '已加入' : '加入球队'}}
                  </div>
               </div>
               <!-- 球队通告 -->
               <div class="width-100">
                  <team-inform :showInfromValue="teamInfo.team_inform" :teamId="teamId" :canEdit="teamRole == 0 || teamRole == 1"></team-inform>
               </div>
               <!-- 球队赛事 -->
               <div class="width-100">
                  <div class="content-title">球队赛事</div>
                  <div class="width-100 match-content">
                     
                  </div>
               </div>
               <!-- 球队日历 -->
               <div class="width-100 team-calendar-container">
                  <team-calendar :dateArray="calendar" :calendarList="calendarList" :teamId="teamId"></team-calendar>
               </div>
            </div>
         </div>
         <div class="container-left">
            <div class="flex-row-center team-icon">
               <!-- <img id="team-icon" :src="teamInfo.team_icon"> -->
               <div id="team-icon">
                  <mario-icon :iconPath="teamInfo.team_icon" :hoverModel="true" @uploadRequest="uploadRequest"></mario-icon>
               </div>
            </div>
            <div class="team-info">
               <div class="flex-row-y-center team-info-line">
                  <div class="team-info-line-title">主场球衣</div>
                  <team-shirt
                     canvasId="home-team-shirt"
                     :baseColor="teamInfo.home_court_color"
                     :another="teamInfo.away_court_color"
                     :canvasWidth="50"
                     :canvasHeight="50"
                  ></team-shirt>
               </div>
               <div class="flex-row-y-center team-info-line">
                  <div class="team-info-line-title">客场球衣</div>
                  <team-shirt
                     canvasId="away-team-shirt"
                     :baseColor="teamInfo.away_court_color"
                     :another="teamInfo.home_court_color"
                     :canvasWidth="50"
                     :canvasHeight="50"
                  ></team-shirt>
               </div>
               <div
                  class="flex-row-y-center team-info-line"
                  v-show="teamInfo.city != teamInfo.province && showMoreInfo"
               >
                  <div class="team-info-line-title">省市</div>
                  <div class="team-info-line-content">{{teamInfo.province}}</div>
               </div>
               <div class="flex-row-y-center team-info-line">
                  <div class="team-info-line-title">城市</div>
                  <div class="team-info-line-content">{{teamInfo.city}}</div>
               </div>
               <div class="flex-row-y-center team-info-line" v-show="showMoreInfo">
                  <div class="team-info-line-title">区域</div>
                  <div class="team-info-line-content">{{teamInfo.district}}</div>
               </div>
               <div class="show-slider">
                  <img
                     @click="showMoreInfo = !showMoreInfo"
                     :class="[showMoreInfo ? 'show-slider-icon arrow-down' : 'show-slider-icon arrow-up']"
                     :src="require('@/assets/slider_icon.png')"
                     alt=""
                  >
               </div>
            </div>
         </div>
         <div class="container-right">
            <div class="team-user-title">球员列表</div>  
            <div class="team-user-list">
               <div class="team-user-list-title">
                  <div class="team-user-list-title-item">用户名</div>
                  <div class="team-user-list-title-item">位置</div>
               </div>
               <div class="flex-row-y-center team-user-list-item" v-for="(item, index) in teamMember" :key="index" @click="handleUserCenter(item.id)">
                  <div class="flex-row-y-center team-user-list-item-left">
                     <div class="user-icon-area">
                        <img :src="item.head_url" class="user-icon">
                        <img :src="require('../../assets/caption.png')" class="caption-icon" v-if="item.role == 0" />   
                     </div>   
                     <div class="user-name">{{item.nick_name}}</div>
                  </div>
                  <div class="user-position-type">前锋</div>
               </div>
            </div>       
         </div>
      </div>
   </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { Vue, Component } from "vue-property-decorator";
import { State, Getter } from "vuex-class";
import { Toast } from '@/utils/index'
import TeamType from "@/model/Team/Team";
import TeamShirt from "@/components/TeamShirt.vue";
import TeamCenterInform from "@/components/TeamPageInform.vue"
import TeamCalendar from "@/components/TeamCalendar.vue"
import IconDIY from '@/components/IconDiy.vue'
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

  public teamId!: string | number;
  public teamInfo: object = {};
  public teamMember: object = {};
  public showMoreInfo = false;
  public calendar !: string[]
  public calendarList !: []
  public isTeamMember !: boolean
  public teamRole !: null | number
 
  mounted() {
    this.teamId = +this.$route.query.td;
    this.requestTeamDetail();
  }
  private requestTeamDetail() {
    const teamType = new TeamType();
    const params = {
      team_id: +this.teamId,
      user_id: this.userId || (localStorage.getItem("User_ID") as string)
    };
    teamType.getTeamDetail.call(this, params).then((res: any) => {
      const { team_info, team_member, calendar, is_member, team_role } = res;
      this.teamInfo = team_info
      this.teamMember = team_member
      this.isTeamMember = is_member
      this.teamRole = team_role
      this.calendar = [calendar['start_at'], calendar['end_at']]
      this.calendarList = calendar.calendar_list.map((item: any) => {
         item.showDialogContent = false
         item.loading = true
         return item
      })
      document.title = team_info.team_name;
    });
  }
  private uploadRequest (fileFormData: any) {
     new TeamType().uploadTeamIcon.call(this,{
        team_id: +this.teamId,
        form_data: fileFormData
     }).then((res: any) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.teamInfo.team_icon = res.team_url
        Toast.showToastSuccess.call(this,"上传成功","成功")
     }).catch((err: any) => {
        Toast.showToastError.call(this, err.msg, '失败')
     })
  }
  private handleMemberBtn () {
     if (this.isTeamMember) {
        this.$confirm('离队操作不可撤销，是否继续?', '离队', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
         }).then(() => {
           this.handleLeaveTeam()
        })
     }else {
        this.handleJoinTeam()
     }
  }
  private handleJoinTeam () {
     new TeamType().joinTeam.call(this, {
        team_id: +this.teamId,
        user_id: this.userId || (localStorage.getItem("User_ID") as string)
     }).then((res: any) => {
        Toast.showToastSuccess.call(this,"加入球队成功","成功")
        this.requestTeamDetail();
     })
  }
  private handleLeaveTeam () {
   new TeamType().departTeam.call(this, {
        team_id: +this.teamId,
        user_id: this.userId || (localStorage.getItem("User_ID") as string)
     }).then((res: any) => {
        Toast.showToastSuccess.call(this,"离队成功","成功")
        this.requestTeamDetail();
     })
  }
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
   margin-bottom: 2vh;
   border-bottom: 1px solid #eeeeee;
}
@media screen and (max-width: 450px) {
}
@media screen and (min-width: 451px) {
  .container-box {
    width: 90%;
    min-height: 800px;
    margin: 0 auto;
    //  BFC
    overflow: hidden;
  }
  .container-main,
  .container-left,
  .container-right {
    float: left;
  }
  .container-main {
    box-sizing: border-box;
    width: 100%;
    min-width: 400px;
    min-height: 800px;
    padding: 0 10vw;
    background-color: $shallow_grey_color;
    text-align: center;
  }
  .container-left {
    box-sizing: border-box;
    width: 15vw;
    min-width: 100px;
    height: 100%;
    min-height: 800px;
    background-color: $side-color;
    margin-left: -100%;
    border-right: 1px solid $high_light_color;
    color: white;
    font-weight: 600;
  }
  .container-right {
    box-sizing: border-box;
    width: 15vw;
    min-width: 100px;
    height: 100%;
    min-height: 800px;
    margin-left: -15vw;
    background-color: $side-color;
    border-left: 1px solid $high_light_color;
    color: white;
  }
  .team-icon {
    width: 100%;
    text-align: center;
    padding: 10px 0;
    border-bottom: 3px solid $high_light_color;
  }
  #team-icon {
    width: 10vw;
    height: 10vw;
    min-width: 80px;
    min-height: 80px;
    border-radius: 50%;
    padding: 20px;
    border: 3px solid $high_light_color;
    background-color: $high_light_color;
  }
  .team-info {
    &-line {
      padding: 20px 5px;
      border-bottom: 3px solid $high_light_color;
      font-size: 14px;
      &-title {
        min-width: 30%;
      }
      &-content {
        margin-left: 5%;
      }
    }
  }
  .show-slider {
    margin-top: 20px;
    width: 100%;
    text-align: center;
    &-icon {
      width: 20px;
      height: 20px;
    }
  }
  .arrow-down {
    transform: rotate(180deg);
  }
  .arrow-up {
    transform: rotate(360deg);
  }
  .team-user-title {
     width: 100%;
     padding: 10px 20px;
     border-bottom: 1px solid $border_color;
  }
  .team-user-list-title {
     width: 100%;
     padding: 20px 0;
     &-item {
        display: inline-block;
        width: 35%;
        &:nth-of-type(1) {
           text-align: center;
           width: 65%;
        }
     }
  }
  .team-user-list-item {
     width: 100%;
     &-left {
        width: 65%;
     }
  }
  .user-icon-area {
     position: relative;
  }
  .user-icon {
     width: 35px;
     height: 35px;
     border-radius: 50%;
     display: inline-block;
     margin-left: 20px;
  }
  .caption-icon {
     width: 10px;
     height: 10px;
     position: absolute;
  }
  .user-position-type {
     width: 35%;
     display: inline-block;
  }
  .user-name {
     margin-left: 15px;
  }
  .main-content {
     width: 80%;
     margin: 0 auto;
  }
  .content-title {
    width: 100%;
    margin: 20px 0;
    text-align: start;
    font-weight: 500;
  }
  .team-troduction {
     text-align: start;
     margin: 10px 0; 
     padding: 15px 0;
     border-bottom: 1px solid $grey_color;
     &-name {
        font-size: 26px;
        font-weight: 600;
     }
     &-description {
        font-size: 14px;
        margin-top: 5px;
     }
     &-state {
        padding: 10px 20px;
        background-color: $side_color;
        color: white;
        font-weight: 500;
        border-radius: 10px;
        cursor: pointer;
        &-disable {
         background-color: $border_color;
         color: #333333;
        }
        &-icon {
           margin-right: 5px;
           width: 20px;
           height: 20px;
           position: relative;
        }
     }
  }
  .team-calendar {
     &-container {
        margin: 20px 0;
     }
  }
}
</style>
