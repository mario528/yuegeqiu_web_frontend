<template>
  <div class="home-page">
    <nav-header :navList="navList"></nav-header>
    <side-bar :nav-list="navList" :dom-height="domHeight"></side-bar>
  </div>
</template>

<script>
// @ is an alias to /src
import navHeader from "@/components/Header";
import sideBar from '@/components/Sidebar'

export default {
  name: "Home",
  components: {
    navHeader,
    sideBar
  },
  data() {
    return {
      navList: [
        {
          navTitle: "首页",
          navPath: "/"
        },
        {
          navTitle: "我的球队",
          navPath: "/team"
        },
        {
          navTitle: "商城",
          navPath: "/mall"
        }
      ],
      domHeight: 75
    };
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
.home-page {
  position: relative;
}
.box {
  width: 100px;
  height: 100px;
  background-color: red;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-100%);
  transition: all 0.3s ease;
}
</style>

