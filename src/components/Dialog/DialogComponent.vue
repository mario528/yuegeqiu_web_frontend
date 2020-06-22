<!--
 * @Author: majiaao
 * @Date: 2020-05-11 15:56:06
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-21 23:53:24
 * @Description: file content
 -->
<template>
  <div class="flex-column-center dialog-box" v-if="showDialog" @click="handleDialog(false)">
    <div class="dialog-content" @click.stop="stop">
      <slot name="dialog-header"></slot>
      <slot name="dialog-content"></slot>
      <div class="dialog-footer">
        <slot name="dialog-footer"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class Dialog extends Vue {
  @Prop({default: false}) showDialog !: boolean
  private handleDialog (state: boolean) {
    this.showDialog = state
    if (!state) this.$emit('closeDialog')
  }
  private stop () {}
}
</script>
<style lang="scss" scoped>
.dialog {
  &-box {
    width: 100vw;
    height: 100vh;
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
  &-content {
    padding: 20px;
    width: 30vw;
    min-height: 30vh;
    min-width: 200px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 5px 10px #eeeeee;
  }
  &-footer {
    text-align: end;
    box-sizing: border-box;
    width: 100%;
    margin: 50px 0 10px 0;
    padding-right: 10%;
  }
}
</style>
 
 
 
