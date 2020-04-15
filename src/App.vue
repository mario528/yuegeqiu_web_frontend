<template>
  <div id="app">
    <div class="app-content">
      <router-view/>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { State, Action, Getter } from "vuex-class";

@Component({
  components: {
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
@import './stylus/scss/app';
* {
  margin: 0;
  padding: 0;
}
</style>
