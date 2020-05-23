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
          <el-carousel class="carousel-box" :interval="5000" arrow="always" height="100%">
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
              <span class="map-text">地图</span>
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
          <div class="width-100 recent-competition-container-content"></div>
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
  @Getter("getScreenModel")
  public smallScreenModel!: boolean;
  @Getter("getUserId")
  public userId!: string | number | null;
  mounted() {}
  created() {
    this.requestBannerData();
    this.requestTeamSuggest();
  }
  private requestBannerData() {
    this.$http.post(url.HOME).then((res: any) => {
      this.bannerList = res.banner;
      this.newsList = res.news_list;
    });
  }
  private requestTeamSuggest() {
    new Team().teamSuggest
      .call(this, {
        user_id: this.userId || (localStorage.getItem("User_ID") as string)
      })
      .then((res: any) => {
        this.suggestTeamList = res.suggest_team_list;
      });
  }
  private requestMatchSuggest () {
    
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
  &-line {
    cursor: pointer;
    background-color: #536dfe;
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
    background-color: $border_color;
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
@media screen and (max-width: 450px) {
  .team-suggest {
    width: 100%;
  }
  .recent-competition-container {
    width: 100%;
    margin-top: 20px;
  }
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
  }
  .team-search-container {
    width: 20%;
    height: 100%;
    float: left;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}
</style>
