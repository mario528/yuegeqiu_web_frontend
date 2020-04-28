<template>
  <div class="container">
    <div class="flex-row user-info">
      <a
        v-if="!userInfo.nick_name || !userInfo.nick_name || !userInfo.city"
        class="flex-row-center user-info-detail-tip"
      >完善信息</a>
      <img
        class="user-info-icon"
        :src="userInfo.head_url"
        :alt="userInfo.nick_name || userInfo.telephone"
      >
      <div class="flex-row-y-center user-info-detail">
        <div class="user-info-detail-name">{{userInfo.nick_name || userInfo.telephone}}</div>
        <img :src="sexIcon" class="user-info-detail-sex-icon" v-if="userInfo.sex">
      </div>
    </div>
    <div class="flex-row user-section-list">
      <div class="user-section-list-item" v-for="(item, index) in sectionList" :key="index">
        <router-link exact class="user-section-list-item-link" :to="item.path">{{item.navTitle}}</router-link>
      </div>
    </div>
    <div class="user-section-container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
import UserModel from "@/model/User/User";
@Component({
  components: {}
})
export default class UserCenter extends Vue {
  public userName: any;
  public userId: string | undefined;
  public token: string | undefined;
  public userInfo = {};
  public sexIcon!: string;
  public sectionList = [
    {
      navTitle: '我的球队',
      path: '/'
    },{
      navTitle: '我的动态',
      path: '/user/center/dynamic'
    },{
      navTitle: '购物记录',
      path: '/user/center/history'
    }
  ]
  @Watch("$route")
  onRouteChange(newValue: any, oldValue: any) {
    console.log(newValue, oldValue);
  }
  beforeCreate() {
    this.userId =
      this.$route.params.userId || (localStorage.getItem("User_ID") as string);
    this.token =
      this.$route.params.token ||
      (localStorage.getItem("Authorization") as string);
  }
  created() {
    this.getUserCenterInfo();
  }
  beforeRouteEnter(to: any, from: any, next: any) {
    next();
  }
  beforeRouterUpdate(to: any, from: any, next: any) {}
  beforeRouteLeave(to: any, from: any, next: any) {}
  private getUserCenterInfo() {
    const userType = new UserModel();
    const params = {
      user_id: this.userId,
      token: this.token
    };
    userType.getUserCenterData
      .call(this, params)
      .then((res: any) => {
        this.userInfo = res.user_info;
        if (res.user_info.sex) {
          this.sexIcon =
            res.user_info.sex == 0
              ? require("../../../assets/women_icon.png")
              : require("../../../assets/men_icon.png");
        }
      })
      .catch((error: any) => {});
  }
}
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.container {
  width: 100vw;
  height: 100%;
}
.user-info {
  width: 90%;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 10px 30px 10px 30px;
  background-color: #F6F6F6;
  border-radius: 10px;
  position: relative;
  &-icon {
    width: 8vw;
    height: 8vw;
    min-width: 70px;
    min-height: 70px;
    border-radius: 50%;
  }
  &-detail {
    box-sizing: border-box;
    width: 50vw;
    padding: 0 0 0 20px;
    &-sex-icon {
      width: 25px;
      height: 25px;
      margin-left: 5px;
    }
    &-tip {
      position: absolute;
      right: 0;
      top: 0;
      width: 35px;
      height: 35px;
      text-align: center;
      background-color: $base_color;
      color: white;
      border-top-right-radius: 10px;
      border-top-right-radius: 10px;
      border-top-right-radius: 10px;
      border-top-right-radius: 10px;
      font-size: 4px;
    }
    &-name {
      font-size: 26px;
      color: #333333;
      font-weight: 500;
    }
  }
}
@media screen and (max-width: 400px) {
  .user-section-list {
    width: 90vw;
    margin: 10px 5%;
    padding: 10px 0; 
    border: 1px solid #eeeeee;
    display: flex;
    flex-direction: row;
    justify-content: center;
    &-item {
      border-right: 1px solid #eeeeee;
      padding: 5px 20px;
      &:last-of-type {
        border: none;
      }
      &-link {
        text-decoration: none;
        color: inherit;
        font-weight: inherit;
      }
    }
  }
  .user-section-container {
    width: 90vw;
    margin: 0 5%;
    background-color: aqua;
  }
}
@media screen and (min-width: 401px) {
  .user-section-list {
    box-sizing: 5px;
    width: 15vw;
    margin: 0 0 0 5%;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #eeeeee;
    border-right: 1px solid #eeeeee;
    border-top-left-radius: 10px;
    float: left;
    &-item {
      padding: 20px 2vw;
      color: #333333;
      font-weight: 500;
      border-bottom: 1px solid #eeeeee;
      &-link {
        text-decoration: none;
        color: inherit;
        font-weight: inherit;
      }
    }
  }
  .user-section-container {
    width: 75vw;
    float: left;
    min-height: 500px;
    background-color: aqua;
  }
}
</style>


