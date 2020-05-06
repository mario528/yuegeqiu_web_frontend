<!--
 * @Author: majiaao
 * @Date: 2020-05-05 16:56:29
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-07 02:12:57
 * @Description: file content
 -->
<template>
   <div class="container">
      <div class="container-box">
         <div class="container-main">
            <div class="main-content">
               <!-- 球队通告 -->
               <div class="width-100 team-inform-title">球队通告</div>
               <div class="team-inform"></div>
            </div>
         </div>
         <div class="container-left">
            <div class="team-icon">
               <img id="team-icon" :src="teamInfo.team_icon">
            </div>
            <div class="team-info">
               <div class="flex-row-y-center team-info-line">
                  <div class="team-info-line-title">球队名:</div>
                  <div class="team-info-line-content">{{teamInfo.team_name}}</div>
               </div>
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
               <div class="flex-row-y-center team-info-line" v-show="showMoreInfo">
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
                        <img :src="require('../../assets/caption.png')" class="caption-icon" />   
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
import TeamType from "@/model/Team/Team";
import TeamShirt from "../../components/TeamShirt.vue";
@Component({
  components: {
    "team-shirt": TeamShirt
  }
})
export default class TeamDetail extends Vue {
  @Getter("getUserId")
  public userId!: string | number;

  public teamId!: string | number;
  public teamInfo: object = {};
  public teamMember: object = {};
  public showMoreInfo = false;

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
      const { team_info, team_member } = res;
      this.teamInfo = team_info;
      this.teamMember = team_member;
      document.title = team_info.team_name;
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
.container {
   margin-bottom: 2vh;
}
@media screen and (max-width: 450px) {
}
@media screen and (min-width: 451px) {
  .container-box {
    width: 90%;
    height: 800px;
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
    height: 100%;
    padding: 0 10vw;
    background-color: $shallow_grey_color;
    text-align: center;
  }
  .container-left {
    box-sizing: border-box;
    width: 15vw;
    min-width: 100px;
    height: 100%;
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
  .team-inform-title {
     text-align: start;
     margin: 20px 0;
     font-weight: 500;
     font-size: 18px;
  }
  .team-inform {
     width: 100%;
     height: 100px;
     background-color: white;
  }
}
</style>
