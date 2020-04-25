<template>
    <div class="container">
        <div class="flex-row-x-between title">
            <div class="title-text">完善信息</div>
            <div class="progress-area">
                <ma-progress v-if="smallScreenModel" bgColor='#303F9F' backgroundColor='#63c565' activityColor='#63c565' :progressState="progressState"></ma-progress>
                <el-steps class="steps" :active="pageIndex" finish-status="success" simple v-if="!smallScreenModel">
                    <el-step class="setps-item" :title="item" v-for="(item, index) in stepsList" :key="index"></el-step>
                </el-steps>
            </div>
        </div>
        <div class="flex-column-center register-info-container">
            <div class="flex-column-center register-info-item" v-show="pageIndex == 0">
                <div class="flex-row-y-center register-info-item-line">
                    <span class="register-info-item-line-text">用户名</span>
                    <input class="register-info-item-line-input" v-model="nickName" type="text" placeholder="请输入注册用户名"/>
                </div>
                <div class="flex-row-y-center register-info-item-line">
                    <span class="register-info-item-line-text">性别</span>
                    <el-radio-group v-model="sexRadio" class="radio-group">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                </div>
                <div class="flex-row-y-center register-info-item-line">
                    <span class="register-info-item-line-text">活动位置</span>
                    <location-selecter @selectComplete="selectComplete"></location-selecter>
                </div>
            </div>
            <div class="register-info-item" v-show="pageIndex == 1">

            </div>
            <div class="register-info-item" v-show="pageIndex == 2"></div>
            <div class="flex-row-around button-area">
                <button class="button-area-btn" v-if="pageIndex != 0" @click="gotoPrePage">上一页</button>
                <button :class="[nextBtnAvaiable ? 'button-area-btn' : 'button-area-btn-disable']" @click="next">{{pageIndex == 2 ? '提交' : '下一步' }}</button>
            </div>  
        </div>
    </div>    
</template>
<script lang="ts">
import MaProgress from '@/components/Progress.vue'
import LocationSelect from '@/components/LocationSelect.vue'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class' 
@Component({
    components: {
        'ma-progress': MaProgress,
        'location-selecter': LocationSelect 
    }
})
export default class UserRegisterInfo extends Vue {
    private pageIndex = 0
    private progressState = 0
    private sexRadio = -1
    private nickName = ''
    private nextBtnAvaiable = false
    private stepsList = ['个人信息','头像']
    private locationInfo = {}

    @Watch('pageIndex')
    watchPageIndex (newValue: number, oldValue: number) {
        this.progressState = (newValue / this.stepsList.length) * 100
    }

    @Getter('getScreenModel')
    private smallScreenModel!: boolean

    private handleRequest () {

    }
    private gotoPrePage() {
        this.pageIndex = this.pageIndex - 1
    }
    private next () {
        if (this.pageIndex < this.stepsList.length - 1) {
            this.pageIndex = this.pageIndex + 1
        }else {
            this.handleRequest()
        }
    }
    private selectComplete (data: any) {
        this.locationInfo = data
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 90%;
    margin: 0 auto;
}
.title {
    box-sizing: border-box;
    width: 100%;
    padding: 6px 3%;
    color: $high_light_color;
    font-weight: 600;
    font-size: 20px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background: linear-gradient(to left, transparent calc(98%), $base_color 20px);
    &-text {
        margin: auto 0;
    } 
}
.progress-area {
    margin-right: 5%;
    width: 50%;
}
.register-info-container {
    min-width: 300px;
    padding-top: 10vh;
}
.register-info-item {
    box-sizing: border-box;
    min-width: 300px;
    width: 80%;
    padding: 0 5%;
    &-line {
        min-width: 300px;
        width: 60%;
        padding: 20px 0;
        border-bottom: 1px dashed #a9a9a9;
        &-text {
            font-size: 18px;
            font-weight: 500;
            color: #000000;
            margin-right: 5%;
            width: 15%;
            min-width: 60px;
        }
        &-input {
            box-sizing: border-box;
            outline: none;
            width: 60%;
            height: 50px;
            border-radius: 5px;
            padding: 5px;
            font-size: 15px;
            border:1px solid $header_font_color_common;
        }
    }
}
.button-area {
    width: 40%;
    padding: 10vh 5%;
    text-align: center;
    &-btn {
        width: 10vw;
        height: 40px;
        background-color: transparent;
        outline: none;
        background-color: #409EFF;
        color: #ffffff;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        min-width: 100px;
        &-disable {
            @extend .button-area-btn ;
            background-color: $disable_color;
            color: #ffffff;
        }
    }
}
.radio-group ::v-deep .is-checked .el-radio__label {
    color: $base_color;
}
.radio-group ::v-deep .is-checked .el-radio__inner {
    border-color: $base_color;
    background-color: $base_color;
}
</style>

