<!--
 * @Author: majiaao
 * @Date: 2020-06-25 00:39:46
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-30 01:36:22
 * @Description: file content
--> 
<template>
    <div class="team-formation-container">
         <div class="team-info">
            <div class="flex-row-y-center" style="align-items: center;">
                <img class="team-icon" :src="teamInfo.team_icon" alt="">
                <div class="team-name">{{teamInfo.team_name}}</div>
            </div>
        </div>
        <div class="flex-row container">
            <canvas id="team-formation" ref="teamFormation">
                <div>您的浏览器暂不支持该功能</div>
            </canvas>
            <canvas id="team-formation-hide" ref="teamFormationHide"></canvas>
            <!-- setting -->
            <div class="setting-area">
                <div class="setting-title">设置阵容</div>
                <el-cascader
                    class="cascader"
                    v-model="value"
                    :options="options"
                    @change="handleChange">
                </el-cascader>
            </div>
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
import { Toast } from '@/utils/index'
import FormationOptions from './formationConf'
@Component
export default class TeamFormation extends Vue {  
    private teamId = -1
    private canvasWidth = 0
    private canvasHeight = 0
    private context: any = undefined
    private contextByHide: any = undefined
    private teamInfo = {}
    private teamMemberList = []
    private isTeamMember = false
    private activityMateIndex = -1
    private canvasTeamList: any[] = []
    private coordinate = {
        x: 0,
        y: 0
    }
    private canvasDown = false
    private options = []
    private formationOptions = {
        width: 50,
        height: 50
    }
    @Getter('getUserId')
    public userId: string | undefined
    mounted() {
        this.teamId = +this.$route.query.td;   
        this.requestTeamDetail()
        const canvasElement = this.$refs.teamFormation as any
        canvasElement.onmousedown = (event: any) => {
            if (!this.isTeamMember) {
                Toast.showToastError.call(this, '您不是该球队成员', '操作失败')
                return
            }
            const x = event.offsetX
            const y = event.offsetY
            this.canvasTeamList.forEach((item: any, index: number) => {
                const itemX = [item.left, item.left +  item.width]
                const itemY = [item.top, item.top + item.height]
                if (x >= itemX[0] && x <= itemX[1] && y >= itemY[0] && y <= itemY[1] ) {
                    this.canvasDown = true
                    this.activityMateIndex = index
                }
            })
        }
        canvasElement.onmousemove = (event: any) => {
            if (!this.canvasDown) return 
            const x = event.offsetX
            const y = event.offsetY
            this.coordinate = {
                x: x,
                y: y
            }
            this._movementCanvas()
        }
        canvasElement.onmouseup = () => {
            this.canvasDown = false
            this.coordinate = {
                x: 0,
                y: 0
            }
        }
    }
    // init canvas context
    _initCanvas () {
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        this.canvasWidth = Math.floor(clientWidth / 3)
        this.canvasHeight = Math.floor(clientHeight * 0.82 * 0.9)
        const canvasElement = this.$refs.teamFormation as any
        const canvasHideElement = this.$refs.teamFormationHide as any
        canvasElement.width = this.canvasWidth + 150
        canvasElement.height = this.canvasHeight
        canvasHideElement.width = this.canvasWidth + 150
        canvasHideElement.height = this.canvasHeight
        this.context = canvasElement.getContext('2d')
        this.contextByHide = canvasHideElement.getContext('2d')
    }
    // 拖动函数
    private _movementCanvas () {
        const img = new Image()
        img.src = 'https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/assets/football_bg.png'
        img.onload = () => {
            this.contextByHide.clearRect(0,0,this.canvasWidth + 150, this.canvasHeight)
            this.context.clearRect(this.canvasWidth,0, 150, this.canvasHeight)
            this.contextByHide.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight)
            this.canvasTeamList.forEach((item: any, index: number) => {
                const image = new Image
                image.src = item.src
                image.onload = () => {
                    if (index == this.activityMateIndex) {
                        const leftExcursion = this.coordinate.x
                        const topExcursion = this.coordinate.y
                        this.contextByHide.save()
                        this.contextByHide.beginPath()
                        this.contextByHide.arc(leftExcursion, topExcursion, 30, 0, Math.PI * 2)
                        this.contextByHide.clip()
                        this.contextByHide.drawImage(image, leftExcursion - 30, topExcursion - 30 , 60, 60)
                        this.contextByHide.restore()
                    }else {
                        const leftExcursion = item.left + 30
                        const topExcursion = item.top + 30
                        this.contextByHide.save()
                        this.contextByHide.beginPath()
                        this.contextByHide.arc(leftExcursion, topExcursion, 30, 0, Math.PI * 2)
                        this.contextByHide.clip()
                        this.contextByHide.drawImage(image, leftExcursion - 30, topExcursion - 30 , 60, 60)
                        this.contextByHide.restore()
                        this.contextByHide.save()
                    }
                    this.copyHideCanvas()
                }
            })
        }
    }
    // 复制离屏canvas至屏幕显示canvas
    copyHideCanvas () {
        const canvasHideElement = this.$refs.teamFormationHide as any
        this.context.drawImage(canvasHideElement, 0, 0, this.canvasWidth + 150, this.canvasHeight)
    }
    // 请求球队数据
    requestTeamDetail () {
        new TeamType().getTeamFormationInfo.call(this, {
            user_id: this.userId || localStorage.getItem('User_ID'),
            team_id: this.teamId
        }).then((res: any) => {
            const { team_info, team_list, is_member, team_formation_setting } = res
            this.teamInfo = team_info
            this.teamMemberList = team_list
            this.isTeamMember = is_member
            this.options = team_formation_setting
            this._initCanvas()
            this.initTeamMate()
            this.drawCanvasBg()
        })
    }
    drawTeamMateLine () {
        this.contextByHide.strokeStyle = '#63c565'
        this.contextByHide.moveTo(this.canvasWidth + 10, 0)
        this.contextByHide.lineTo(this.canvasWidth + 10, this.canvasHeight)
        this.contextByHide.stroke()
        this.contextByHide.moveTo(this.canvasWidth + 150, 0)
        this.contextByHide.lineTo(this.canvasWidth + 150, this.canvasHeight)
        this.contextByHide.stroke()
        this.contextByHide.moveTo(this.canvasWidth + 10, this.canvasHeight)
        this.contextByHide.lineTo(this.canvasWidth + 150, this.canvasHeight)
        this.contextByHide.stroke()
        this.contextByHide.moveTo(this.canvasWidth + 10, 0)
        this.contextByHide.lineTo(this.canvasWidth + 150, 0)
        this.contextByHide.stroke()
    }
    drawCanvasBg () {
        const img = new Image()
        img.src = 'https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/assets/football_bg.png'
        img.onload = () => {
            this.contextByHide.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight)
            this.drawTeamMateLine()
            this.copyHideCanvas()
        }
    }
    initTeamMate () {
        this.teamMemberList.forEach((item: any, index: number) => {
            // 当前拖拽不进行渲染
            if (this.activityMateIndex == index) return
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
                this.contextByHide.save()
                this.contextByHide.beginPath()
                this.contextByHide.arc(leftExcursion, topExcursion, 30, 0, Math.PI * 2)
                this.contextByHide.clip()
                this.contextByHide.drawImage(image, leftExcursion - 30, topExcursion - 30 , 60, 60)
                this.contextByHide.restore()
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
    private handleChange (detail: any) {
        const obj = {
            mode: '',
            type: ''
        }
        this.options.forEach((item: any) => {
            if (item.value == detail[0]) {
                obj.mode = item.label
                item.children.forEach((elItem: any) => {
                    if (elItem.value == detail[1]) {
                        obj.type = elItem.label
                    }
                })
            }            
        })
        this.context.clearRect(0,0, 150,this.canvasWidth, this.canvasHeight)
        const img = new Image()
        img.src = 'https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/assets/football_bg.png'
        img.onload = () => {
            this.contextByHide.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight)
            this._drawTeamFormation(obj.mode, obj.type)
        }
    }
    _drawTeamFormation (mode: any, type: any) {
        const optionsList = new FormationOptions(this.canvasWidth, this.canvasHeight).getFormationOptions(mode, type)
        optionsList.forEach((item: any) => {
            this.contextByHide.strokeStyle = '#ffffff'
            this.contextByHide.fillStyle = 'rgba(99,197,101, .5)'
            this.contextByHide.beginPath();
            this.contextByHide.arc(item.left, item.top, 30, 0, Math.PI * 2)
            this.contextByHide.stroke();
            this.contextByHide.fill()
        })
        this.copyHideCanvas()
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
#team-formation-hide {
    display: none;
    position: absolute;
    bottom: -1000px;
    left: -1000px;
}
.team {
    &-info {
        margin: 0 10vw;
        border-bottom: 1px solid $high_light_color;
        padding-bottom: 5px;
    }
    &-icon {
        float: right;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 3px solid white;       
    }
    &-name {
        font-weight: 500;
        color: white;
        font-size: 16px;
        margin-left: 2vw;
    }
}
.setting {
    &-area {
        margin-left: 5vw;
    }
    &-title {
        font-weight: 500;
        font-size: 18px;
        color: white;
    }
}
.setting-area ::v-deep .cascader {
    margin-top: 30px;
}
</style>



