<!--
 * @Author: majiaao
 * @Date: 2020-06-25 00:39:46
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-25 23:52:15
 * @Description: file content
--> 
<template>
    <div class=" team-formation-container">
        <div class="container">
            <canvas id="team-formation" ref="teamFormation">
                <div>您的浏览器暂不支持该功能</div>
            </canvas>
        </div>
    </div>    
</template>
<script lang="ts">
interface CanvasByImage {
    img_url: string;
    start_x: number;
    start_y: number;
    end_x: number;
    end_y: number;
}
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
@Component
export default class TeamFormation extends Vue {
    private context = undefined;
    private canvasWidth = 0
    private canvasHeight = 0
    mounted() {
        this._initCanvas()
    }
    private _initCanvas () {
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        this.canvasWidth = Math.floor(clientWidth / 3)
        this.canvasHeight = Math.floor(clientHeight * 0.82 * 0.9)
        const canvasElement = this.$refs.teamFormation
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        canvasElement.width = this.canvasWidth + 50
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        canvasElement.height = this.canvasHeight
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.context = canvasElement.getContext('2d')
        this.drawCanvasUtil('image', {
            img_url: 'https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/assets/football_bg.png',
            start_x: 0,
            start_y: 0,
            end_x: this.canvasWidth,
            end_y: this.canvasHeight
        })
    }
    private drawImageUtil (options: CanvasByImage) {
        const image = new Image()
        image.src = options.img_url
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.context.drawImage(image, options.start_x, options.start_y, options.end_x, options.end_y)
    }
    private drawCanvasUtil (type?: string, options?: any) {
        if (type == 'image') {
            // 绘制图片
            this.drawImageUtil(options)
        }
    }
}
</script>
<style lang="scss" scoped>
.team-formation-container {
    width: 100%;
    min-height: 82vh;
    margin-top: -2vh;
    background-color: $base_color;
}
.container {
    width: 80vw;
    margin: 0vh auto;
    padding: 4vh 0;
}
#team-formation {
}
</style>



