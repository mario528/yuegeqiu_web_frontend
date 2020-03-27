<template>
  <div class="home-page">
    <nav-header :navList="navList"></nav-header>
  </div>
</template>

<script>
// @ is an alias to /src
import navHeader from '@/components/Header'

export default {
  name: 'Home',
  components: {
    navHeader
  },
  data() {
    return {
      navList: [
        {
          navTitle: '首页',
          navPath: '/'
        },{
          navTitle: '我的球队',
          navPath: '/team'
        },{
          navTitle: '商城',
          navPath: '/mall'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .home-page {
    position: relative;
  }
</style>

