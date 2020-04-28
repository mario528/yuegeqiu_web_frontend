<template>
  <div class="page">
    <div>
      <div :class="[ smallScreenModel ? 'flex-row-x-between swiper-container-small' : 'flex-row-x-between swiper-container' ]">
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
          <div class="flex-row-y-center news-list-line" v-for="(item, index) in newsList" :key="index">
            {{item.article_title}}
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
import url from '@/utils/url';
@Component({
  components: {}
})
export default class Home extends Vue {
  private bannerList!: any[]
  private newsList!: any[]
  data() {
    return {
      bannerList: [],
      newsList: []
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
      this.newsList = res.news_list
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
    color: #FFFFFF;
    height: calc( 100% / 4);
    box-sizing: border-box;
    padding: 0 20px 0 20px;
    position: relative;
    &:hover {
      background-color: $base_color;
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
  height: 100%;
}
.carousel-box ::v-deep .el-carousel__arrow {
  background: rgba(48,63,159, .5)
}
</style>
