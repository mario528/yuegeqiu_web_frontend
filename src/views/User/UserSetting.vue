<template>
  <div>个人设置</div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
@Component({
  components: {}
})
export default class UserCenter extends Vue {
  public userName: any;
  created() {}
  beforeRouteEnter(to: any, from: any, next: any) {
    console.log(to.params);
    next();
  }
  beforeRouterUpdate (to: any, from: any, next: any) {

  }
  beforeRouteLeave (to: any, from: any, next: any) {
    
  }
}
</script>
<style lang="scss" scoped>
</style>


