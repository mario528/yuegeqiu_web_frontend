<template>
  <div class="page">
    <nav-header :navList="navList"></nav-header>
    <side-bar :nav-list="navList" :dom-height="domHeight"></side-bar>
    <div class="flex-column-x-center container">
      <!-- swiper container -->
      <div class="flex-row carousel-container">
        <div class="flex-column carousel-left" v-if="!smallScreenModel">
          <el-carousel height="150px">
            <el-carousel-item class="carousel-item" v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
          <el-carousel height="150px">
            <el-carousel-item class="carousel-item" v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="carousel-right">
          <el-carousel height="200px" direction="vertical" :autoplay="false">
            <el-carousel-item class="carousel-item" v-for="item in 3" :key="item">
              <h3 class="medium">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import navHeader from "@/components/Header.vue";
import sideBar from "@/components/Sidebar.vue";

import { router } from "../config/index";
@Component({
  components: {
    navHeader,
    sideBar
  }
})
export default class Home extends Vue {
  public navList: any[] = router;
  public domHeight = 75;
  @Getter('getScreenModel')
  public smallScreenModel!: boolean;
}
</script>
<style lang="scss" scoped>
@import "../stylus/scss/app";
.page {
  position: relative;
}
.container {
  width: 90vw;
  margin: 2vh auto;
}
.carousel {
  &-container {
    width: 100%;
    height: auto;
  }
  &-item {
    background-color: red;
  }
  &-left, &-right {
    width: 50%;
  }
  &-right {
    height: 100%;
  }
}
</style>

