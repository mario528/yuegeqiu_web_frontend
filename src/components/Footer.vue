<template>
    <div class="flex-column-center footer-page">
        开发者: 马加奥
    </div >
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
@Component({})
export default class Footer extends Vue {
    mounted() {
        
    }
}
</script>
<style lang="scss" scoped>
.footer-page {
  box-sizing: border-box;
  width: 100%;
  height: 8vh;
  padding: 0 5vw;
  background-color: $base_color;
  color: $base_font_color;
}
</style>

