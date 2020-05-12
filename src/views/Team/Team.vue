<template>
  <div class="page">
    <div class="flex-column-x-center container">
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Team extends Vue {
}
</script>
<style lang="scss" scoped>
.page {
  position: relative;
}
.container {
  width: 90vw;
  margin: 0 auto;
}
</style>