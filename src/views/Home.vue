<template>
  <div class="page">
    <div>
      <nav-header :navList="navList"></nav-header>
      <side-bar :nav-list="navList" :dom-height="domHeight"></side-bar>
      <div :class="[ smallScreenModel ? 'flex-row-x-between swiper-container-small' : 'flex-row-x-between swiper-container' ]">
        <!-- swiper container -->
        <div
          :class="[ smallScreenModel ? 'flex-row carousel-container-small' : 'flex-row carousel-container' ]"
        >
          <el-carousel class="carousel-box" :interval="5000" arrow="always" height="100%">
            <el-carousel-item v-for="(item, index) in bannerList" :key="index">
              <img class="carousel-box-img" :src="item.url" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="news-list" v-if="!smallScreenModel">
          <div class="flex-row-y-center news-list-line" v-for="(item, index) in 6" :key="index">
            ❤️马加奥❤️
          </div>
        </div>
      </div>
    </div>
    <up-arrow></up-arrow>
    <footer-area></footer-area>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import { router } from "../config/index";
import url from '../utils/url';
@Component({
  components: {}
})
export default class Home extends Vue {
  public navList: any[] = router;
  public domHeight = 75;
  private bannerList!: any[]
  data() {
    return {
      bannerList: []
    }
  }
  @Getter("getScreenModel")
  public smallScreenModel!: boolean;
  mounted() {
  }
  created() {
    this.requestBannerData()
  }
  private requestBannerData () {
    this.$http.get(url.HOME_BANNER).then((res: any) => {
      this.bannerList = res.banner
    })
  }
}
</script>
<style lang="scss" scoped>
.page {
  position: relative;
}
.swiper-container {
  width: 90vw;
  height: 40vh;
  margin: 2vh 5vw;
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
    border-radius: 10px;
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
    border-radius: 10px;
  }
  &-img {
    width: auto;
    height: 100%;
  }
}

.news-list {
  width: 30%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  &-line {
    cursor: pointer;
    background-color: #bbdefb;
    height: calc( 100% / 6);
    box-sizing: border-box;
    padding: 0 20px;
    position: relative;
    &:hover {
      background-color: #1e88e5;
      color: white;
    }
    &::after {
      content: ' ';
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
  background-color: rebeccapurple;
  height: 100%;
}
</style>

