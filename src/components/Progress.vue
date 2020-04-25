<template>
    <div class="flex-row-y-center progress-container">
        <div class="progress-container-bg" :style="{ width: progressWidth + '%', backgroundColor: bgColor  }">
            <div class="progress-container-tag">{{progressState}}%</div>
            <div :style="{ width: progressState + '%' }">
                <div class="progress-container-activity" :style="{ backgroundColor: activityColor }"></div>
            </div>
        </div>
    </div> 
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class Pregress extends Vue {
    @Prop({ default: '100' }) progressWidth!: string
    @Prop({ default: '0' }) progressState!: string
    @Prop({ default: '#303F9F' }) bgColor!: string
    @Prop({ default: '#63c565' }) activityColor!: string
}
</script>
<style lang="scss" scoped>
.progress-container {
    position: relative;
    line-height: 20px;
    &-tag {
        position: absolute;
        right: 5%;
        font-size: 12px;
        color: #ffffff;
        font-weight: 600;
    }
    &-bg {
        height: 20px;
        border-radius: 10px;
    }
    &-activity {
        width: 100%;
        border-radius: 10px;
        height: 20px;
        animation: growth 1s ease;
    }
}
@keyframes growth {
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
}
</style>


