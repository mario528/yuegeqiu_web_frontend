<!--
 * @Author: majiaao
 * @Date: 2020-05-09 23:51:52
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-11 01:32:01
 * @Description: file content
 -->
<template>
    <div>
        <div class="popover-arrow" v-if="showPopover"></div>
        <transition name="fade">
            <div class="popover-container" v-if="showPopover">
                <div class="popover-line">
                    <slot name="content"></slot>
                </div>
                <div class="popover-line">
                    <slot name="footer"></slot>
                </div>
            </div>
        </transition>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
@Component
export default class Popover extends Vue {
  @Prop({ default: false })
  showPopover!: boolean;
  private _changeVisibel() {
    debugger;
    if (this.showPopover) {
      this.showPopover = false;
    } else {
      this.showPopover = true;
    }
  }
  private handlePopoverVisible() {
    this.showPopover = !this.showPopover;
    if (this.showPopover) {
      document.body.addEventListener("click", this._changeVisibel);
    } else {
      document.removeEventListener("click", this._changeVisibel);
    }
  }
}
</script>
<style lang="scss" scoped>
.popover-container {
  display: inline-block;
  position: absolute;
  width: 160%;
  left: -30%;
  bottom: calc(100% + 10px);
  z-index: 100;
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  box-shadow: 0px 5px 15px #eeeeee;
  border-radius: 10px;
  &:hover {
    color: #333333;
  }
}
.popover-line {
  &:nth-of-type(2) {
    margin: 5px 0;
  }
}
.popover-arrow {
  height: 10px;
  width: 160%;
  left: -30%;
  position: absolute;
  bottom: 100%;
}
</style>


