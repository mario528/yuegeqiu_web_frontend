<!--
 * @Author: majiaao
 * @Date: 2020-05-07 13:52:27
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-08 14:41:07
 * @Description: file content
 -->
<template>
    <div class="team-inform">
        <div class="flex-row-between team-inform-title" @click="handleContentVisible">
            球队通告
            <img v-if="showHideModel" :class="[hideContent ? 'down-arrow' : 'down-arrow-up']" :src="downArrow" />
        </div>
        <div v-if="(showHideModel && !hideContent) || !showHideModel">
            <div class="team-inform-content" v-show="!isEdit">{{showInfromValue ? showInfromValue : '暂无通告'}}</div>
            <div class="team-inform-edit-container" v-show="isEdit">
                <textarea :style="{'border': '1px solid ' + baseColor }" class="team-inform-edit" :placeholder="showInfromValue ? showInfromValue : ''"  v-model="emitValue" ref="focusTextarea"/>
                <div :class="[emitLen == maxLen ? 'number-count-down number-count-down-warn' : 'number-count-down']">{{emitLen}}/{{maxLen}}</div>
            </div>
            <div class="width-100 button-area" v-show="canEdit">
                <div :style="{'background-color': baseColor}" class="button" v-show="!isEdit" @click="showEdit">编辑</div>
                <div :style="{'background-color': baseColor}" class="button" v-show="isEdit" @click="closeEdit">取消</div>
                <div :style="{'background-color': baseColor}" class="button" v-show="isEdit" @click="saveEditData">保存</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import Team from '@/model/Team/Team'
@Component({
})
export default class TeamCenterInform extends Vue {
    private isEdit = false
    private maxLen = 200
    private emitLen = 0
    private emitValue = ''
    private downArrow: string = require('@/assets/user_arrow_black.png')
    @Getter('getUserId')
    private userId !: string
    @Prop({ default: '' }) showInfromValue !: string
    @Prop({ default: -1 }) teamId !: string
    @Prop({ default: false }) canEdit !: boolean 
    @Prop({ default: '' }) contentStyle !: string
    @Prop({ default: false }) showHideModel !: boolean
    @Prop({ default: false }) hideContent !: boolean
    @Prop({ default: '#16b13a'}) baseColor !: string
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
        const params = {
            team_id: this.teamId,
            user_id: localStorage.getItem('User_ID') || this.userId,
            inform_detail: this.emitValue
        }
        new Team().updateTeamInfo.call(this, params).then((res: any) => {
            this.$emit('editEnd', this.emitValue)
            this.showInfromValue = this.emitValue
            this.closeEdit()
        })
    }
    private handleContentVisible () {
        if (!this.showHideModel) return
        this.hideContent = !this.hideContent
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
        font-weight: 500;
    }
    &-content {
        width: 100%;
        height: 100px;
        background-color: white;
        box-sizing: border-box;
        padding: 10px;
        text-align: start;
        color: #333333;
        border-radius: 5px;
        line-height: 18px;
        border: 1px solid #eeeeee;
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
        border-radius: 5px;
        font-size: 16px;
        box-sizing: border-box;
        line-height: 18px;
        border: 1px solid rgba($side-color, 0.5);
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
.down-arrow {
    width: 25px;
    height: 25px;
    transition: all 0.3s ease;
    &-up {
        @extend .down-arrow;
        transform: rotate(180deg);
    }
}
</style>


