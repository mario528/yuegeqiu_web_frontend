<!--
 * @Author: majiaao
 * @Date: 2020-05-06 02:20:42
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-06 18:00:40
 * @Description: file content
 -->
<template>
    <div>
        <canvas class="canvas" :id="canvasId" :width="canvasWidth" :height="canvasHeight" ref="canvas">
            <div class=""></div>
        </canvas>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
@Component
export default class TeamShirt extends Vue {
    @Prop({default: 'team-shirt'}) canvasId!: string
    @Prop({default: 100}) canvasWidth!: number
    @Prop({default: 100}) canvasHeight!: number
    @Prop({default: '#333333'}) baseColor!: string
    @Prop({default: '#eeeeee'}) another!: string
    mounted() {
        this.initCanvasContext()
    }
    private initCanvasContext () {
        const drawing = <HTMLCanvasElement>document.getElementById(this.canvasId)
        // 抗锯齿
        const width = drawing.offsetWidth
        const height = drawing.offsetHeight
        if (window.devicePixelRatio) {
            drawing.style.width = width + "px";
            drawing.style.height = height + "px";
            drawing.width = width * window.devicePixelRatio
            drawing.height = height * window.devicePixelRatio
        }
        if (drawing.getContext) {
            const ctx = drawing.getContext('2d') as any;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
            ctx.width = width
            ctx.hight = height
            // @ts-ignore
            ctx.fillStyle = <CanvasPattern>this.baseColor
            setTimeout(() => {
                this.drawShirt(ctx) 
            }, 500);
        }
    }
    private drawShirt (ctx: HTMLCanvasElement | any) {
        ctx.fillStyle = this.baseColor
        ctx.lineWidth = 1
        ctx.moveTo(15,10)
        ctx.lineTo(20,10)
        ctx.lineTo(25,15)
        ctx.lineTo(30,10)
        ctx.lineTo(35,10)

        ctx.lineTo(45,15)
        ctx.lineTo(35,25)
        ctx.lineTo(35,45)
        ctx.lineTo(15,45)
        ctx.lineTo(15,25)
        ctx.lineTo(5,15)
        ctx.lineTo(15,10)
        ctx.stroke()
        ctx.fill()
        ctx.font = "13px bold"
        ctx.fillStyle = this.another;
        ctx.textAlign = "center"
        ctx.textBaseline = "middle";
        ctx.fillText("7",25,30)
    }
}
</script>
<style lang="scss" scoped>
.canvas {
}
</style>