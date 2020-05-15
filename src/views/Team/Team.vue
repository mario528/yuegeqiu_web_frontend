<template>
  <div class="flex-column-center page">
    <div class="width-92 container">
      <!-- 我的球队 -->
      <!-- 近期活动 -->
      <!-- 新的通知/活动-->
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class"
@Component({
  components: {}
})
export default class Team extends Vue {
  @Getter('getUserId') private userId !: string | number | null
}
</script>
<style lang="scss" scoped>
.page {
  position: relative;
}
.container {
  margin-top: -2vh;
  min-height: 82vh;
}
@media screen and (max-width: 450px){
  
}
@media screen and (min-width: 451px){

}
</style>