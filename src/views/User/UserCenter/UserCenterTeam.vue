<!--
 * @Author: majiaao
 * @Date: 2020-04-28 21:06:30
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-12 13:05:48
 * @Description: file content
 -->
<template>
    <div class="flex-column-center container">
        <div class="width-100 flex-x-start user-center-title">我的球队</div>
        <div class="team-area" v-if="teamList.length != 0">
          <div class="flex-column-x-center team-area-item" :style="{'background-color': item.home_court_color}" v-for="(item, index) in teamList" :key="index" @click="handleTeamDetail(item.id)">
            <img class="team-area-icon" :src="item.team_icon" alt="">
            <div class="team-area-name">球队:{{item.team_name}}</div>
          </div>
        </div>
        <div v-else class="empty-area">
            <div class="flex-row-y-center empty-area-tips-line">
                <div class="empty-area-tips-btn" @click="handleRouter('create_team')">创建球队</div>
                <img class="empty-area-icon" :src="require('@/assets/empty_box.png')">
                <div class="empty-area-tips-btn" @click="handleRouter('join_team')">加入球队</div>
            </div>
            <div class="empty-area-text">您暂时未加入任何球队</div>
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
  mounted() {
    this.requestUserTeamInfo();
  }
  private requestUserTeamInfo() {
    const params = {
      user_id: this.userId || (localStorage.getItem("User_ID") as string)
    };
    new Team().getUserTeamInfo.call(this, params).then((res: any) => {
      const { team } = res;
      this.teamList = res.team;
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
.container {
  padding: 20px;
}
.empty-area {
  color: $base_color;
  text-align: center;
  font-weight: 500;
  &-icon {
    width: 5vw;
    height: 5vw;
    min-width: 55px;
    min-height: 55px;
    padding: 0 5px;
  }
  &-tips {
    &-btn {
      display: inline-block;
      position: relative;
      margin: 0 10px;
      font-size: 13px;
      background-color: $base_color;
      color: white;
      padding: 5px 10px;
      border-radius: 5px;
      width: 70px;
      animation: crosswiseSlider 1.5s ease-in-out;
      overflow: hidden;
      display: block;
      white-space: nowrap;
      cursor: pointer;
    }
  }
}
.team-area {
  width: 100%;
  float: left;
  margin-top: 5vh;
  &-item {
    float: left;
    margin-right: 5vw;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #a9a9a9;
    border-radius: 15px;
  }
  &-icon {
    width: 8vw;
    height: 8vw;
    min-width: 100px;
    min-height: 100px;
    background-color: white;
    border-radius: 50%;
    border: 1px solid #a9a9a9;
    margin: 0 auto;
  }
  &-name {
    margin: 10px auto;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
  }
}
@media screen and (max-width: 450px) {
  .empty-area {
    padding: 30px 0;
    &-tips {
      &-line {
        padding: 30px 0;
      }
    }
  }
}
@media screen and (min-width: 451px) {
  .empty-area {
    padding: 15vh 0;
    &-tips {
      &-line {
        margin-bottom: 5vh;
      }
    }
  }
}
@keyframes crosswiseSlider {
  0% {
    width: 0;
    height: 100%;
  }
  100% {
    width: 70px;
    height: 100%;
  }
}
</style>