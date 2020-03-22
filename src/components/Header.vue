<template>
  <header class="flex-row-y-center header">
    <span class="flex-row-y-center">
      <img class="brand-icon" :src="brandIcon" alt="约个球">
      <strong class="brand-name fuck-color">约个球</strong>
    </span>
    <div class="flex-row-y-center">
      <nav class="header-nav">
        <router-link to="/">首页</router-link>
      </nav>
      <nav class="header-nav">
        <router-link to="/home">我的球队</router-link>
      </nav>
      <nav class="header-nav">
        <router-link to="/home">商城</router-link>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  @Prop()
  private msg!: string;
  public brandIcon: string = require("../assets/brand_icon.png");
}
</script>
<style scoped lang="scss">
@import "../stylus/scss/app.scss";
.header {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 5%;
  background-color: #17abe3;
  position: relative;
}
.brand {
  &-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: transparent;
    padding: 5px;
  }
  &-name {
    font-size: 24px;
    font-weight: 500;
    margin-right: 15px;
    font-weight: 500;
    color: white;
  }
}
</style>