<template>
    <div class="chat-container">
        <div class="flex-column-center no-open" v-if="!isOpen">
            <img class="no-open-icon" :src="require('@/assets/no_open.png')">
            <div>功能开发中 敬请期待～</div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class ChatHome extends Vue {
    private isOpen = false
}
</script>
<style lang="scss" scoped>
.page {
  position: relative;
}
.chat-container {
  width: 100vw;
  min-height: $basic_height;
}
.no-open {
  width: 100vw;
  height: $basic_height;
  margin-top: -2vh;
  background-color: $base_color;
  color: $high_light_color;
  font-weight: 600;
  font-size: 18px;
  &-icon {
    width: 10vw;
    height: 10vw;
    min-width: 80px;
    min-height: 80px;
    margin-bottom: 5vh;
  }
}
</style>