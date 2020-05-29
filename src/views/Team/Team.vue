<template>
  <div class="flex-column-center page">
    <div class="width-92 container">
      <!-- 我的球队 -->
      <div class="flex-column mine-team">
        <div class="mine-team-title">我的球队</div>
        <div class="mine-team-content">          
          <div class="mine-team-tip" v-if="isLogin && joinTeamList.length == 0">暂无加盟球队</div>
          <div class="mine-team-login_btn fade-center" v-if="!isLogin" @click="handleLogin">请登录</div>
          <div class="mine-team-item" v-for="(item, index) in joinTeamList" :key="index">
            {{item.team_name}}
          </div> 
        </div>
      </div>
      <!-- 当前热门活动 -->
      <div class="flex-column hot-match">
        <div class="hot-match-title">最新赛事</div>
        <div class="hot-match-container">
          <div class="hot-match-item" v-for="(item, index) in hotMatchList" :key="index">
            {{item.match_name}}
          </div>
        </div>
      </div>
      <!-- 测试 -->
      <div class="test"></div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import TeamType from "@/model/Team/Team";
@Component({
  components: {}
})
export default class Team extends Vue {
  @Getter("getUserId")
  private userId!: string | number | null;
  private isLogin = false;
  private joinTeamList = [];
  private hotMatchList = []
  @Action("handleLoginOrRegisterState")
  public handleLoginOrRegisterState!: (state: number) => void;
  @Watch("userId")
  onUserIdChanged(newValue: string, oldvalue: string) {
    if (oldvalue != newValue && !oldvalue) {
      this.getTeamPageData();
    }
  }
  mounted() {
    this.getTeamPageData();
  }
  private getTeamPageData() {
    new TeamType().getTeamPageDetail
      .call(this, {
        user_id: this.userId || localStorage.getItem("User_ID") || null
      })
      .then((res: any) => {
        this.isLogin = res.is_login;
        this.joinTeamList = res.join_team_list;
        this.hotMatchList = res.hot_match_list;
      });
  }
  private handleLogin() {
    this.handleLoginOrRegisterState(1);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.$event.emit("changeLoginDialogState");
  }
}
</script>
<style lang="scss" scoped>
.page {
  position: relative;
}
.container {
  margin-top: -2vh;
  min-height: 82vh;
}
.mine-team {
  &-title {
    position: relative;
    box-sizing: border-box;
    padding: 10px 4%;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid $border_color;
    margin-top: 2vh;
    &::before {
      position: absolute;
      content: " ";
      top: 10%;
      left: 0;
      width: 2%;
      height: 80%;
      background-color: $side-color;
    }
  }
  &-content {
    width: 100%;
    min-height: 20vh;
    margin-top: 20px;
    box-shadow: $basic_shadow;
  }
  &-login_btn {
    position: relative;
    padding: 10px 35px;
    border-radius: 30px;
    background-color: $side-color;
    color: white;
    font-weight: 600;
    transition: 0.3s ease-out;
    cursor: pointer;
  }
  &-tip {
    font-weight: 500;
    color: $disable_color;
    font-size: 16px;
  }
}
.hot-match {
  margin-top: 2vh;
  &-title {
    position: relative;
    box-sizing: border-box;
    padding: 10px 4%;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid $border_color;
    &::before {
      position: absolute;
      content: " ";
      top: 10%;
      left: 0;
      width: 2%;
      height: 80%;
      background-color: red;
    }
  }
  &-container {
    width: 100%;
    margin-top: 20px;
    min-height: 25vh;
    box-shadow: $basic_shadow;
  }
}
.test {
  width: 40%;
  float: left;
  height: 500px;
  box-shadow: $basic_shadow;
}
@media screen and (max-width: 450px) {
  .mine-team {
    width: 100%;
  }
  .hot-match {
    width: 100%;
  }
}
@media screen and (min-width: 451px) {
  .mine-team {
    width: 40%;
    float: left;
    padding: 10px 0;
    &-item {
      float: left;
      background-color: $side-color;
      color: white;
      font-weight: 500;
      border-radius: 20px;
      padding: 5px 10px;
      margin-top: 10px;
      margin-left: 10px;
    }
  }
  .hot-match {
    width: 55%;
    float: right;
    margin-left: 5%;
  }
}
</style>