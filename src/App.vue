<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'

@Component({
  components: {
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
