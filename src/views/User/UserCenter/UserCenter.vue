<template>
  <div class="container">
    <div class="content">
      <div class="user-center-left">
        <div class="user-center-left-title">用户信息</div>
        <div class="user-center-left-info">
          <div v-if="!screenModel">
            <div class="flex-row-x-center width-100 user-center-left-icon">
              <icon-diy :iconPath="userInfo.head_url" :hoverModel="true"></icon-diy>
            </div>
            <div class="flex-row-center user-center-left-nickname">
              {{userInfo.nick_name}}
              <img :src="sexIcon" class="user-center-left-sex_icon">
            </div>
            <div class="flex-row-center user-center-left-friend_ship" @click="bindUserFriendShip">
              <div class="flex-column-y-center user-center-left-friend_ship-item" data-type="attention">
                <span>{{friendShipDetail.attention_num}}</span>
                <div>关注</div>
              </div>
              <div class="flex-column-y-center user-center-left-friend_ship-item" data-type="follow">
                  <span>{{friendShipDetail.follow_num}}</span>
                  <div>粉丝</div>
              </div>
            </div>
            <div class="flex-row-center user-center-left-setting">
              <img
                :src="require('@/assets/setting_user_center.png')"
                class="user-center-left-setting-icon"
              >
              <img :src="require('@/assets/find_icon.png')" class="user-center-left-setting-icon">
              <img
                :src="require('@/assets/message_user_center.png')"
                class="user-center-left-setting-icon"
              >
            </div>
          </div>
          <div v-else>
            <div class="flex-row-between mobile-line">
              <div class="flex-row-y-center user-info-left-mobile">
                <div class="user-center-left-icon">
                  <icon-diy :iconPath="userInfo.head_url" :hoverModel="true"></icon-diy>
                </div>
                <div class="flex-row-center">
                  <span>{{userInfo.nick_name}}</span>  
                  <img :src="sexIcon" class="user-center-left-sex_icon">
                </div>
              </div>
              <div class="flex-row-y-center user-info-right-mobile" @click="bindUserFriendShip">
                <div class="user-center-left-friend_ship-item" data-type="attention">
                  <span data-type="attention">{{friendShipDetail.attention_num}}</span>
                  <div data-type="attention">关注</div>
                </div>
                <div class="user-center-left-friend_ship-item" data-type="follow">
                  <span data-type="follow">{{friendShipDetail.follow_num}}</span>
                  <div data-type="follow">粉丝</div>
                </div>
              </div>
            </div>
          </div>
          <div class="user-center-left-router">
            <div class="user-center-left-router-item">
              <router-link
                class="user-center-left-router-item-link"
                exact
                :to="{path: '/user/center/team'}"
              >我的球队</router-link>
            </div>
            <div class="user-center-left-router-item">
              <router-link
                class="user-center-left-router-item-link"
                :to="{path: '/user/center/message'}"
              >我的动态</router-link>
            </div>
            <div class="user-center-left-router-item">
              <router-link
                class="user-center-left-router-item-link"
                :to="{path: '/user/center/history'}"
              >购物记录</router-link>
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
import IconDIY from "@/components/IconDiy.vue";
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
  private friendShipDetail = {}
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
    this.getUserFriendShip()
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
  private getUserFriendShip () {
    const userType = new UserModel();
    const params = {
      user_id: this.userId
    };
    userType.getUserFriendShip
      .call(this, params)
      .then((res: any) => {
        this.friendShipDetail = res.friend_ship
      })
      .catch((error: any) => {});
  }
  private bindUserFriendShip (event: any) {
    const type = event.target.dataset.type
    this.$router.push({
      path: '/user/relation',
      name: 'FriendRelationShip',
      query: {
        md: type == 'attention' ? '1' : '2',
        vi: this.userId as string
      }
    })
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
}
.user-center {
  &-left {
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
    min-height: 80vh;
  }
}
@media screen and (max-width: 450px) {
  .content {
    width: 100%;
    text-align: center;
    min-height: 100%;
  }
  .user-center {
    &-left {
      width: 100%;
      &-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      &-router {
        padding: 0 5%;
        &-item {
          width: 30%;
          display: inline-block;
        }
      }
    }
    &-right {
      width: 100%;
    }
  }
  .mobile-line {
    border-bottom: 1px solid $border_color;
  }
  .user-info-left-mobile {
    width: 40%;
    text-align: center;
  }
  .user-info-right-mobile {
    width: 40%;
  }
  .user-center-left-friend_ship-item {
    height: 60%;
  }
}
@media screen and (min-width: 451px) {
  .content {
    width: 90%;
    text-align: center;
    min-height: 100%;
    padding-top: 2vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .user-center {
    &-left {
      width: 20%;
      float: left;
    }
    &-right {
      width: 70%;
      min-height: 80vh;
      margin-left: 5%;
      float: left;
    }
  }
}
</style>


