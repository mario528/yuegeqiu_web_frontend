<!--
 * @Author: majiaao
 * @Date: 2020-04-28 21:06:30
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-01 23:17:10
 * @Description: file content
 -->
<template>
    <div class="flex-column-center container">
        <div class="width-100 flex-x-start user-center-title">我的球队</div>
        <div v-if="teamList.length == 0" class="empty-area">
            <img class="empty-area-icon" :src="require('@/assets/empty_box.png')">
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
}
</script>
<style lang="scss" scoped>
.container {
    padding: 20px;
}
.empty-area {
  color: #a9a9a9;
  text-align: center;
  &-icon {
    margin: 10vh auto 2vh auto;
    width: 5vw;
    height: 5vw;
    min-width: 40px;
    min-height: 40px;
  }
}
@media screen and (max-width: 400px) {
  .empty-area {
    &-icon {
      margin: 10px auto 10px auto;
    }
  }
}
@media screen and (min-width: 401px) {
  .empty-area {
    &-icon {
      margin: 10vh auto 2vh auto;
    }
  }
}
</style>