<template>
    <div>个人中心</div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
@Component({
  components: {}
})
export default class UserCenter extends Vue {
  public userName: any;
  created() {
    console.log(this.$route.params);
  }
}
</script>
<style lang="scss" scoped>
</style>


