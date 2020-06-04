<template>
  <div class="page">
    <div class="flex-column-x-center">
      <div
        :class="[ smallScreenModel ? 'flex-row-x-between swiper-container-small' : 'flex-row-x-between swiper-container' ]"
      >
        <!-- swiper container -->
        <div
          :class="[ smallScreenModel ? 'flex-row carousel-container-small' : 'flex-row carousel-container' ]"
        >
          <el-carousel class="carousel-box" :interval="4000" arrow="always" direction="vertical" height="100%">
            <el-carousel-item v-for="(item, index) in bannerList" :key="index">
              <el-image class="carousel-box-img" :src="item.url" fit="cover" style="width: 100%;">
                <div slot="error" class="flex-row-center image-slot" style="height: 100%;">
                  <i class="el-icon-picture-outline" style="font-size: 50px;"></i>
                </div>
              </el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="news-list" v-if="!smallScreenModel">
          <div
            class="flex-row-y-center news-list-line"
            v-for="(item, index) in newsList"
            :key="index"
          >{{item.article_title}}</div>
          <div v-if="newsList.length == 0" class="news-list-empty_tips">
            暂无热点新闻
          </div>
        </div>
      </div>
      <div class="width-90 bfc-box">
        <!-- 推荐球队 -->
        <div class="team-suggest">
          <div class="flex-row-between team-suggest-title">
            <div class="flex-row-y-center">
              <img :src="require('@/assets/home_recommend_icon.png')" class="recommend-icon">
              球队推荐
            </div>
            <div class="flex-row-y-center">
              <img :src="require('@/assets/map_location.png')" class="recommend-icon-small">
              <span class="map-text" @click="routerBus('map')">球队地图</span>
            </div>
          </div>
          <div class="width-100 team-suggest-content">
            <div
              class="width-100 team-suggest-content-tips"
              v-if="suggestTeamList.length == 0"
            >暂无推荐球队</div>
            <div
              class="team-suggest-content-item"
              v-for="(item, index) in suggestTeamList"
              :key="index"
            >
              <div
                class="flex-row-y-center"
                @click="routerBus('teamDetail',{
                teamId: item.id
              })"
              >
                <img :src="item.team_icon" class="team-suggest-content-item-icon">
                <div class="flex-column">
                  <div class="team-suggest-content-item-name">{{item.team_name}}</div>
                  <div class="team-suggest-content-item-description">{{item.description}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 近期赛事 -->
        <div class="recent-competition-container">
          <div class="width-100 recent-competition-container-title">
            <div class="flex-row-y-center">
              <img :src="require('@/assets/recent.png')" class="recommend-icon">
              近期赛事
            </div>
          </div>
          <div class="width-100 recent-competition-container-content">
            <div class="empty-tips" v-if="suggestMatchList.length == 0">暂无推荐赛事</div>
            <div
              class="flex-row-y-center recent-competition-container-content-item"
              v-for="(item, index) in suggestMatchList"
              :key="index"
              v-else
            >
              <span class="name">{{item.match_name}}</span>
              <span class="property">{{item.match_property == 0 ? '友谊赛' : '正式比赛'}}</span>
              <span
                class="type"
              >{{item.match_type == 0 ? '五人制' : item.match_type == 1 ? '七人制' : '十一人制'}}</span>
              <span class="city">{{item.match_city}}</span>
              <span class="district">{{item.match_district}}</span>
            </div>
          </div>
        </div>
        <!-- 球队搜索入口 -->
        <div class="team-search-container">
          <div v-if="smallScreenModel" class="team-search-container-mobile">
            <div class="flex-column-center team-search-container-mobile-content">
              <div class="team-search-container-mobile-btn" @click="routerBus('teamSearch')">搜索球队</div>
              <div class="team-search-container-mobile-btn" @click="routerBus('chat')">球迷论坛</div>
            </div>
            <img
              class="team-search-container-mobile-bg"
              src="https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/football_search_2_bg.jpg"
            >
          </div>
          <div v-else>
            <div class="width-100 team-search-container-title">
              <div class="flex-row-y-center">
                <img :src="require('@/assets/more.png')" class="recommend-icon">
                更多
              </div>
            </div>
            <div class="flex-column-center width-100 team-search-container-content">
              <img
                class="team-search-container-mobile-bg"
                style="border-radius: 0;"
                src="https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/football_search_2_bg.jpg"
              >
              <div class="team-search-container-content-btn" @click="routerBus('teamSearch')">搜索球队</div>
              <div class="team-search-container-content-btn" @click="routerBus('chat')">球迷论坛</div>
            </div>
          </div>
        </div>
      </div>
      <div class="width-90 flex-row-between web-detail">
        <transition name="fade">
          <div class="flex-column-x-center web-detail-item">
            <div class="web-detail-item-title">当前在线人数</div>
            <div class="web-detail-item-date">{{onlineNumbers | unitStandard}}</div>
          </div>
        </transition>
        <transition name="fade">
          <div class="flex-column-x-center web-detail-item">
            <div class="web-detail-item-title">当前注册用户数</div>
            <div class="web-detail-item-date">{{registerUserNumber | unitStandard}}</div>
          </div>
        </transition>
        <transition name="fade">
          <div class="flex-column-x-center web-detail-item">
            <div class="web-detail-item-title">当前注册球队数</div>
            <div class="web-detail-item-date">{{registerTeamNumber | unitStandard}}</div>
          </div>
        </transition>
      </div>
    </div>
    <up-arrow></up-arrow>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import url from "@/utils/url";
import Team from "@/model/Team/Team";
@Component({
  components: {}
})
export default class Home extends Vue {
  private bannerList = [];
  private newsList = [];
  private suggestTeamList = [];
  private suggestMatchList = [];
  @Getter("getOnlineNumbers")
  private onlineNumbers!: number;
  @Getter("getRegisterTeamNumber")
  private registerTeamNumber!: number;
  @Getter("getRegisterUserNumber")
  private registerUserNumber!: number;
  @Getter("getScreenModel")
  public smallScreenModel!: boolean;
  @Getter("getUserId")
  public userId!: string | number | null;
  @Action("handleChangeOnlineNumber")
  public handleChangeOnlineNumber!: (onlineNumbers: number) => void;
  @Action("handleAddUserRegisterNumber")
  public handleAddUserRegisterNumber!: (userNumber: number) => void;
  @Action("handleAddTeamRegisterNumber")
  public handleAddTeamRegisterNumber!: (teamNumber: number) => void;
  mounted() {}
  created() {
    this.requestHomeData();
    this.requestTeamSuggest();
  }
  private requestHomeData() {
    this.$http
      .post(url.HOME, {
        user_id: this.userId || localStorage.getItem("User_ID") || null
      })
      .then((res: any) => {
        this.bannerList = res.banner;
        this.newsList = res.news_list;
        this.suggestMatchList = res.match_list;
        this.handleChangeOnlineNumber(res.project_detail.online_number);
        this.handleAddUserRegisterNumber(res.project_detail.user_count);
        this.handleAddTeamRegisterNumber(res.project_detail.team_count);
      });
  }
  private requestTeamSuggest() {
    new Team().teamSuggest
      .call(this, {
        user_id:
          this.userId || (localStorage.getItem("User_ID") as string) || null
      })
      .then((res: any) => {
        this.suggestTeamList = res.suggest_team_list;
      });
  }
  private routerBus(to: string, params?: any) {
    switch (to) {
      case "teamSearch":
        this.$router.push({
          path: "/team/search",
          name: "teamSearch"
        });
      break;
      case "teamDetail":
        this.$router.push({
          path: "/team/detail",
          query: {
            td: params.teamId
          }
        });
      break;
      case "chat":
        this.$router.push({
          path: "/chat",
          name: "chatHome"
        });
      break;
      case "map":
        this.$router.push({
          path: "/team/map",
          name: "teamMap"
        });
      break;
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.page {
  position: relative;
}
.bfc-box {
  // overflow: hidden;
  margin-top: 3vh;
}
.swiper-container {
  width: 90vw;
  height: 40vh;
  margin: 0vh 5vw;
  border-radius: 10px;
  &-small {
    width: 100vw;
    height: 30vh;
    margin: 0 0 2vh 0;
    border-radius: 10px;
  }
}

.carousel {
  &-container {
    width: 70%;
    height: 100%;
    box-sizing: border-box;
    &-small {
      width: 100%;
      margin: 0vh 0%;
      box-sizing: border-box;
      border-radius: 10px;
    }
  }
  &-box {
    width: 100%;
    height: 100%;
  }
  &-img {
    width: 100%;
    height: 100%;
  }
}
.image-slot {
  width: 100%;
  height: 100%;
}
.news-list {
  width: 30%;
  height: 100%;
  overflow: hidden;
  border-radius: 0px 10px 10px 0px;
  z-index: 1;
  background-color: #536dfe;
  position: relative;
  &-line {
    cursor: pointer;
    color: #ffffff;
    height: calc(100% / 4);
    box-sizing: border-box;
    padding: 0 20px 0 20px;
    position: relative;
    &:hover {
      background-color: $base_color;
      color: white;
    }
    &::after {
      content: " ";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: white;
      transform: scaleY(0.5);
    }
  }
  &-empty_tips {
    width: 100%;
    color: #ffffff;
    font-weight: 600;
    letter-spacing: 5px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: auto;
  }
}
.el-carousel__container {
  height: 100%;
  max-height: 100%;
}
.el-carousel__item {
  height: 100%;
}
.el-carousel__item div {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  height: 100%;
}
.carousel-box ::v-deep .el-carousel__arrow {
  background: rgba(48, 63, 159, 0.5);
}
.recommend-icon {
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-right: 5px;
  &-small {
    @extend .recommend-icon;
    width: 15px;
    height: 15px;
    margin-right: 0;
  }
}
.team-suggest {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  &-title {
    width: 100%;
    height: 40px;
    padding: 10px 30px;
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    font-weight: 600;
    font-size: 18px;
    &::before {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background-color: $base_color;
    }
  }
  &-content {
    min-height: 20vh;
    padding: 0 10px;
    // background-color: $border_color;
    position: relative;

    &-tips {
      text-align: center;
      position: absolute;
      font-weight: 500;
      color: $disable_color;
      font-size: 16px;
      top: 50%;
      left: 0%;
      transform: translateY(-50%);
    }
    &-item {
      padding: 10px 0;
      border-bottom: 1px solid #eeeeee;
      &-icon {
        width: 15%;
        height: 15%;
        border-radius: 50%;
        margin: 0 10px;
        border: 1px solid #eeeeee;
      }
      &-name {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 10px;
      }
      &-description {
        font-size: 12px;
      }
    }
  }
}
.map-text {
  font-size: 12px;
  color: #a9a9a9;
  font-weight: 400;
  cursor: pointer;
}
.recent-competition-container {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  &-title {
    @extend .team-suggest-title;
    border-bottom: 1px solid #eeeeee;
    &::before {
      background-color: $side_color;
    }
  }
  &-content {
    @extend .team-suggest-content;
    background-color: white;
    &-item {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 10px;
      border-bottom: 1px solid $border_color;
      span {
        margin-right: 2%;
      }
      .name {
        font-size: 14px;
        font-weight: 500;
        width: 20%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
      .property {
        background-color: $side_color;
        color: white;
        font-size: 8px;
        padding: 2px 4px;
        border-radius: 2px;
      }
      .type {
        @extend .property;
        background-color: #6495ed;
        color: white;
      }
      .city {
        @extend .property;
        color: #483d8b;
        background-color: #e6e6fa;
      }
      .district {
        @extend .property;
        color: #f8f8ff;
        background-color: #6a5acd;
      }
    }
  }
}
.team-search-container {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  &-title {
    @extend .team-suggest-title;
    border-bottom: 1px solid #eeeeee;
    &::before {
      background-color: $light_green;
    }
  }
  &-content {
    @extend .team-suggest-content;
    background-color: white;
    &-btn {
      position: relative;
      color: white;
      font-weight: 600;
      width: 40%;
      padding: 10px 0;
      background-color: rgba(48, 63, 159, 0.8);
      text-align: center;
      border-radius: 10px;
      &:nth-of-type(2) {
        margin-top: 20px;
      }
    }
  }
}
.team-search-container-mobile {
  position: relative;
  height: 30vh;
  margin: 2vh 0;
  // margin: 0vh 0;
  border-radius: 5px;
  &-bg {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 0;
  }
  &-content {
    width: 100%;
    height: 100%;
    z-index: 10;
    position: relative;
  }
  &-btn {
    background-color: rgba(48, 63, 159, 0.8);
    width: 40%;
    padding: 10px 0;
    text-align: center;
    color: white;
    font-weight: 600;
    margin-top: 20px;
    border-radius: 10px;
  }
}
.web-detail {
  margin: 3vh 0;
  box-shadow: $basic_shadow;
  padding: 30px 10%;
  z-index: -1;
  background-image: url("https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/project_detail_bg.jpg");
  background-size: cover;
  background-position: center 0;
  background-repeat: no-repeat;
  &-item {
    padding: 20px 60px;
    text-align: center;
    // background-color: rgba(255,255,255,.4);
    background-color: rgba(48, 63, 159, 0.6);
    border-radius: 10px;
    color: white;
    &-title {
      margin-bottom: 20px;
      font-size: 14px;
      font-weight: 600;
    }
    &-date {
      font-weight: 600;
      font-size: 30px;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
@media screen and (max-width: 450px) {
  .page {
    margin-top: -2vh;
  }
  .team-suggest {
    width: 100%;
  }
  .recent-competition-container {
    width: 100%;
    margin-top: 20px;
  }
  .web-detail {
    padding: 30px 2%;
  }
  .web-detail-item {
    padding: 20px 5px;
    text-align: center;
    // background-color: rgba(255,255,255,.4);
    background-color: rgba(48, 63, 159, 0.6);
    border-radius: 5px;
    color: white;
    &-title {
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 600;
    }
    &-date {
      font-weight: 600;
      font-size: 20px;
    }
  }
}
.empty-tips {
  width: 100%;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: $disable_color;
  font-weight: 500;
}
@media screen and (min-width: 451px) {
  .team-suggest {
    width: 30%;
    float: left;
  }
  .recent-competition-container {
    width: 40%;
    margin: 0 5%;
    float: left;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    &-content {
      position: relative;
    }
    &-content-item {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 10px;
      border-bottom: 1px solid $border_color;
      span {
        margin-right: 2%;
      }
      .name {
        font-size: 18px;
        font-weight: 500;        
      }
      .property {
        background-color: $side_color;
        color: white;
        font-size: 8px;
        padding: 2px 4px;
        border-radius: 2px;
      }
      .type {
        @extend .property;
        background-color: #6495ed;
        color: white;
      }
      .city {
        @extend .property;
        color: #483d8b;
        background-color: #e6e6fa;
      }
      .district {
        @extend .property;
        color: #f8f8ff;
        background-color: #6a5acd;
      }
    }
  }
  .team-search-container {
    width: 20%;
    height: 100%;
    float: left;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}
</style>
