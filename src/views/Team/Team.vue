<template>
  <div class="flex-column-center page">
    <div class="width-92 container">
      <!-- 我的球队 -->
      <div class="flex-column mine-team">
        <div class="mine-team-title">我的球队</div>
        <div class="flex-column-center mine-team-content">
          <div class="mine-team-tip" v-if="is_login && joinTeamList.length == 0">暂无</div>
          <div class="mine-team-login_btn fade-center" v-if="!is_login" @click="handleLogin">请登录</div>
        </div>
      </div>
      <!-- 当前热门活动 -->
      <div class="flex-column hot-match"></div>
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
  private isLogin!: boolean;
  private joinTeamList!: [];
  @Action("handleLoginOrRegisterState")
  public handleLoginOrRegisterState!: (state: number) => void
  mounted() {
    this.getTeamPageData();
  }
  private getTeamPageData() {
    new TeamType().getTeamPageDetail
      .call(this, {
        user_id: this.userId || localStorage.getItem("User_ID") || null
      })
      .then((res: any) => {
        const { is_login, join_team_list } = res;
        this.isLogin = is_login;
        this.joinTeamList = join_team_list;
      });
  }
  private handleLogin () {
    this.handleLoginOrRegisterState(1)
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
    height: 20vh;
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
}
@media screen and (max-width: 450px) {
  .mine-team {
    width: 100%;
  }
}
@media screen and (min-width: 451px) {
  .mine-team {
    width: 40%;
    float: left;
  }
}
</style>