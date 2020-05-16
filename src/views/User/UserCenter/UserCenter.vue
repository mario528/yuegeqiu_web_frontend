<template>
  <div class="container">
    <div class="flex-row-x-center content">
      <div class="user-center-left">
        <div class="user-center-left-title">用户信息</div>
        <div class="user-center-left-info">
          <div class="flex-row-x-center width-100 user-center-left-icon">
            <icon-diy :iconPath="userInfo.head_url" :hoverModel="true"></icon-diy>
          </div>
          <div class="flex-row-center user-center-left-nickname">
            {{userInfo.nick_name}}
            <img :src="sexIcon" class="user-center-left-sex_icon">
          </div>
          <div class="flex-row-center user-center-left-friend_ship">
            <div class="user-center-left-friend_ship-item">
              <span>20</span>
              <div>关注</div>
            </div>
            <div class="user-center-left-friend_ship-item">
              <span>40</span>
              <div>粉丝</div>
            </div>
          </div>
          <div class="flex-row-center user-center-left-setting">
            <img :src="require('@/assets/setting_user_center.png')" class="user-center-left-setting-icon">
            <img :src="require('@/assets/find_icon.png')" class="user-center-left-setting-icon">
            <img :src="require('@/assets/message_user_center.png')" class="user-center-left-setting-icon">
          </div>
          <div class="flex-column user-center-left-router">
            <div class="user-center-left-router-item">
              <router-link class="user-center-left-router-item-link" exact :to="{path: '/user/center/team'}">我的球队</router-link>
            </div>
            <div class="user-center-left-router-item">
              <router-link class="user-center-left-router-item-link" :to="{path: '/user/center/message'}">我的动态</router-link>
            </div>
            <div class="user-center-left-router-item">
              <router-link class="user-center-left-router-item-link" :to="{path: '/user/center/history'}">购物记录</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="user-center-right">
        <router-view :key="randomKey"></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
import IconDIY from "@/components/IconDiy.vue"
import UserModel from "@/model/User/User";
@Component({
  components: {
    "icon-diy": IconDIY
  }
})
export default class UserCenter extends Vue {
  public userName: any;
  public userId: string | undefined;
  public token: string | undefined;
  public userInfo = {};
  public sexIcon!: string;
  private randomKey!: number;
  @Getter("getScreenModel")
  private screenModel!: boolean;
  @Watch("$route")
  onRouteChange(newValue: any, oldValue: any) {
    // if (newValue.name == oldValue.name) return
    this.randomKey = Math.random();
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
  width: 100%;
  min-height: 82vh;
  margin-top: -2vh;
  background-color: $shallow_grey_color;
}
.content {
  width: 90%;
  text-align: center;
  height: 100%;
}
.user-center {
  &-left {
    float: left;
    height: auto;
    border: 1px solid $border_color;
    &-title {
      padding: 15px 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
    &-icon {
      width: 8vw;
      height: 8vw;
      border-radius: 50%;
      margin: 2vh auto;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
    &-sex_icon {
      width: 20px;
      height: 20px;
      margin-left: 5px;
    }
    &-nickname {
      color: $base_black_color;
      font-weight: 500;
      padding-bottom: 10px;
      font-family: "Microsoft YaHei";
      border-bottom: 1px solid $border_color;
    }
    &-setting {
      height: 50px;
      border-bottom: 1px solid $border_color;
      &-icon {
        width: 25px;
        height: 25px;
        margin: 0 10px;
        &:hover {
          width: 30px;
          height: 30px;
        }
      }
    }
    &-router {
      &-item {
        padding: 20px 0;
        border-bottom: 1px solid $border_color;
        cursor: pointer;
        &-link {
          text-decoration: none;
          color: $base_black_color;
          font-weight: 500;
        }
      }
    }
    &-friend_ship {
      width: 80%;
      margin: 0 auto;
      padding: 20px 0;
      border-bottom: 1px solid $border_color;
      &-item {
        color: #333333;
        font-size: 16px;
        position: relative;
        width: 40%;
        &:nth-of-type(1)::after {
          position: absolute;
          content: " ";
          width: 2px;
          height: 60%;
          top: 20%;
          right: 0;
          background-color: $border_color;
        }
        div {
          margin-top: 5px;
        }
        span {
          font-size: 26px;
          font-weight: 500;
        }
      }
      
    }
  }
  &-right {
    float: left;
    min-height: 80vh;
  }
}
@media screen and (max-width: 450px) {
  .user-center-left {
  }
}
@media screen and (min-width: 451px) {
  .content {
    padding-top: 2vh;
  }
  .user-center {
    &-left {
      width: 20%;
    }
    &-right {
      width: 70%;
      height: 100%;
      margin-left: 5%;
    }
  }
}
</style>


