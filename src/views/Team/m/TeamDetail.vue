<!--
 * @Author: majiaao
 * @Date: 2020-06-02 20:54:38
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-03 00:51:14
 * @Description: file content
--> 
<template>
    <div class="flex-column container">
        <div class="team-info">
            <div class="flex-row-y-center team-state">
                <img
                    :src="isTeamMember ? require('../../../assets/true.png') : require('../../../assets/join.png')"
                    class="team-state-icon"
                >
                {{isTeamMember ? '已关注' : '点击关注'}}
            </div>
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
        <!-- 标签页 -->
        <div class="width-100 flex-row team-tab" @click.stop="handleSwitchTab">
            <div :class="[ activityIndex == 0 ? 'team-tab-item-activity' : 'team-tab-item']" data-index="0">详细信息</div>
            <div :class="[ activityIndex == 1 ? 'team-tab-item-activity' : 'team-tab-item']" data-index="1">成员</div>  
            <div :class="[ activityIndex == 2 ? 'team-tab-item-activity' : 'team-tab-item']" data-index="2">近期活动</div>
            <div :class="[ activityIndex == 3 ? 'team-tab-item-activity' : 'team-tab-item']" data-index="3">赛事</div>
        </div>
        <div id="tab-line" ref="tabline">
            <div></div>
        </div> 
        <!-- 详细内容 -->
        <div class="content" v-show="activityIndex == 0">
            
        </div>
        <div class="content" v-show="activityIndex == 1">
        </div> 
        <div class="content" v-show="activityIndex == 2">
        </div> 
        <div class="content" v-show="activityIndex == 3">
        </div>  
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter } from "vuex-class";
import TeamType from "@/model/Team/Team";

@Component
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
      const {
        team_info,
        team_member,
        calendar,
        is_member,
        team_role,
        match_list
      } = res;
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
  private handleSwitchTab (event: any) {
    const idx = event.target.dataset.index;
    const distance = idx * 25
    this.activityIndex = idx
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.$refs.tabline.style = `transform: translateX(${distance}vw)`
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 82vh;
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
    transition: all .5s ease;
}
</style>


