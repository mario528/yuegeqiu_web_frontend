<!--
 * @Author: majiaao
 * @Date: 2020-05-09 23:51:52
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-10 01:28:30
 * @Description: file content
 -->
<template>
    <div class="popover-container" v-if="showPopover">
        <div class="popover-line">
            <slot name="content"></slot>
        </div>
        <div class="popover-line">
            <slot name="footer"></slot>
        </div>
    </div>    
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
@Component
export default class Popover extends Vue {
    @Prop({ default: false }) showPopover !: boolean
    private _changeVisibel () {
        if (this.showPopover) {
            this.showPopover = false
        }else {
            this.showPopover = true
        }
    }
    private handlePopoverVisible () {
        this.showPopover = !this.showPopover
        if (this.showPopover) {
            document.body.addEventListener('click', this._changeVisibel)
        }else {
            document.removeEventListener('click', this._changeVisibel)
        }
    }
}
</script>
<style lang="scss" scoped>
.popover-container {
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 20px;
    bottom: calc(100% + 10px);
    background-color: red;
    z-index: 100;
}
</style>


