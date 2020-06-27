<!--
 * @Author: majiaao
 * @Date: 2020-06-25 00:39:46
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-27 23:27:46
 * @Description: file content
--> 
<template>
    <div class=" team-formation-container">
        <div class="container">
            {{teamId}}
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
interface CanvasByCircle {
    x: number;
    y: number;
    r: number;
    start_angle: number;
    end_angle: number;
}
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import TeamType from "@/model/Team/Team";
@Component
export default class TeamFormation extends Vue {
    private context: any = undefined;
    private canvasWidth = 0
    private canvasHeight = 0
    private teamId !: number
    private teamInfo = {}
    private teamMemberList = []
    private canvasTeamList: any[] = []
    private canvasDown = false
    @Getter('getUserId')
    public userId: string | undefined

    mounted() {
        this.teamId = +this.$route.query.td;
        this.requestTeamDetail()
        const canvasElement = this.$refs.teamFormation as any
        canvasElement.onmousedown = (event: any) => {
            this.canvasDown = true
            canvasElement.onmousemove = (event: any) => {
                if (!this.canvasDown) return 
                const x = event.offsetX
                const y = event.offsetY
                this.context.clearRect(0,0,this.canvasWidth + 150, this.canvasHeight)
                this.drawCanvasUtil('image', {
                    img_url: 'https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/assets/football_bg.png',
                    start_x: 0,
                    start_y: 0,
                    end_x: this.canvasWidth,
                    end_y: this.canvasHeight
                })
                this.canvasTeamList.forEach(((item: any) => {
                    const image = new Image
                    image.src = item.src
                    image.onload = () => {
                        this.context.save()
                        this.context.beginPath()
                        this.context.arc(item.left + 30, item.top + 30, 30, 0, Math.PI * 2)
                        this.context.clip()
                        this.context.drawImage(image, item.left, item.top, 60, 60)
                        this.context.restore()   
                    }
                }))
             }   
        }
        canvasElement.onmouseup = () => {
            this.canvasDown = false
        }
    }
    private _initCanvas () {
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        this.canvasWidth = Math.floor(clientWidth / 3)
        this.canvasHeight = Math.floor(clientHeight * 0.82 * 0.9)
        const canvasElement = this.$refs.teamFormation as any
        canvasElement.width = this.canvasWidth + 150
        canvasElement.height = this.canvasHeight
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
        image.onload = () => {
            this.context.drawImage(image, options.start_x, options.start_y, options.end_x, options.end_y)
            this.context.strokeStyle = '#63c565'
            this.context.moveTo(this.canvasWidth + 10, 0)
            this.context.lineTo(this.canvasWidth + 10, this.canvasHeight)
            this.context.stroke()
            this.context.moveTo(this.canvasWidth + 150, 0)
            this.context.lineTo(this.canvasWidth + 150, this.canvasHeight)
            this.context.stroke()
            this.context.moveTo(this.canvasWidth + 10, this.canvasHeight)
            this.context.lineTo(this.canvasWidth + 150, this.canvasHeight)
            this.context.stroke()
            this.context.moveTo(this.canvasWidth + 10, 0)
            this.context.lineTo(this.canvasWidth + 150, 0)
            this.context.stroke()
        }
    }
    private drawCircleUtil (options: CanvasByCircle) {
        this.context.beginPath()
        this.context.arc(options.x, options.y, options.r, options.start_angle, options.end_angle)
        this.context.stroke()
        this.context.save()
    }
    private drawCanvasUtil (type?: string, options?: any) {
        if (type == 'image') {
            // 绘制图片
            this.drawImageUtil(options)
        } else if (type == 'circle') {
            this.drawCircleUtil(options)
        }
    }
    privateDrawTeamMate (teamList: []) {
        teamList.map((item: any, index: number) => {
            const leftExcursion = this.canvasWidth + 10 + (index < 8  ? 30 : 110)
            let topExcursion = 0
            if (index == 0 || index == 8) {
                topExcursion = 30
            }else if (index < 8) {
                topExcursion = (index * 70) + 30
            }else if (index > 8) {
                topExcursion = ((index - 8) * 70) + 30
            }
            const image = new Image()
            image.src = item.head_url
            image.onload = () => {
                this.context.save()
                this.context.beginPath()
                this.context.arc(leftExcursion, topExcursion, 30, 0, Math.PI * 2)
                this.context.clip()
                this.context.drawImage(image, leftExcursion - 30, topExcursion - 30 , 60, 60)
                this.context.restore()
                this.canvasTeamList.push({
                    top: topExcursion - 30,
                    left: leftExcursion - 30,
                    src: item.head_url,
                    width: 60,
                    height: 60
                })
            }
        })
    }
    private drawFormation(formationType: string) {

    }
    private requestTeamDetail () {
        new TeamType().getTeamFormationInfo.call(this, {
            user_id: this.userId || localStorage.getItem('User_ID'),
            team_id: this.teamId
        }).then((res: any) => {
            const { team_info, team_list } = res
            this.teamInfo = team_info
            this.teamMemberList = team_list
            this._initCanvas()
            this.privateDrawTeamMate(team_list)
        })
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



