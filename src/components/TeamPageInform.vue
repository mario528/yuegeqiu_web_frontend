<!--
 * @Author: majiaao
 * @Date: 2020-05-07 13:52:27
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-07 16:12:12
 * @Description: file content
 -->
<template>
    <div class="team-inform">
        <div class="team-inform-title">球队通知</div>
        <div class="team-inform-content" v-show="!isEdit">暂无通告</div>
        <div class="team-inform-edit-container">
            <textarea class="team-inform-edit" v-show="isEdit" v-model="emitValue" ref="focusTextarea"/>
            <div :class="[emitLen == maxLen ? 'number-count-down number-count-down-warn' : 'number-count-down']" v-if="isEdit">{{emitLen}}/{{maxLen}}</div>
        </div>
        <div class="width-100 button-area">
            <div class="button" v-show="!isEdit" @click="showEdit">编辑</div>
            <div class="button" v-show="isEdit" @click="closeEdit">取消</div>
            <div class="button" v-show="isEdit" @click="saveEditData">保存</div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
enum Role {
    
}
@Component({
})
export default class TeamCenterInform extends Vue {
    private isEdit = false
    private maxLen = 200
    private emitLen = 0
    private emitValue = ''
    @Prop({ default: 0 })
    @Watch('emitValue')
    computedEmitValueLen () {
        if (this.emitValue.length >= this.maxLen) this.emitValue = this.emitValue.substring(0, this.maxLen)
        this.emitLen = this.emitValue.length
    }
    private showEdit (): void {
        this.isEdit = true
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.$refs.focusTextarea.focus()
    }
    private closeEdit () {
        this.emitLen = 0;
        this.emitValue = ""
        this.isEdit = false
    }
    private saveEditData () {
        this.$emit('editEnd', this.emitValue)
        this.closeEdit()
    }

}
</script>
<style lang="scss" scoped>
.team-inform {
    width: 100%;
    &-title {
        width: 100%;
        margin: 20px 0;
        text-align: start;
    }
    &-content {
        width: 100%;
        height: 100px;
        background-color: white;
        box-sizing: border-box;
        padding: 10px;
        text-align: start;
        color: $header_font_color_common;
        border-radius: 5px;
        line-height: 18px;
    }
    &-edit-container {
        position: relative;
    }
    &-edit {
        width: 100%;
        height: 100px;
        background-color: white;
        text-align: start;
        outline: none;
        resize: none;
        border: none;
        padding: 10px;
        font-size: 16px;
        box-sizing: border-box;
        line-height: 18px;
    }
}
.button-area {
    text-align: end;
}
.button {
    display: inline-block;
    background-color: $side-color;
    color: white;
    font-weight: 500;
    padding: 5px 20px;
    border-radius: 5px;
    margin: 30px 0px 30px 10px;
    cursor: pointer;
}
.number-count-down {
    position: absolute;
    bottom: 5px;
    right: 10px;
    font-size: 12px;
    color: $header_font_color_common;
    &-warn {
        color: red;
    }
}
</style>


