<!--
 * @Author: majiaao
 * @Date: 2020-06-25 00:39:46
 * @LastEditors: majiaao
 * @LastEditTime: 2020-07-04 01:17:16
 * @Description: file content
--> 
<template>
    <div class="team-formation-container">
         <div class="team-info">
            <div class="flex-row-y-center" style="align-items: center;">
                <img class="team-icon" :src="teamInfo.team_icon" alt="">
                <div class="flex-column">
                    <div class="team-name">{{teamInfo.team_name}}</div>
                    <div class="team-setting" v-if="formationModeType.mode && formationModeType.type">
                        <span>{{formationModeType.mode}}</span>
                        <span>{{formationModeType.type}}</span>
                    </div>
                </div>
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
                    ref="cascader"
                    v-model="value"
                    :options="options"
                    @change="handleChange">
                </el-cascader>
                <div class="setting-btn" v-if="formationModeType.mode && formationModeType.type">设置</div>
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
    private teamInfo = {}                           // 球队信息
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
    private optionsList: any = []
    private selectUserIdList: any = []
    private formationOptions = {
        width: 50,
        height: 50
    }
    private formationModeType = {
        mode: '',
        type: ''
    }
    private isChoosedTeamMember: any = []
    @Getter('getUserId')
    public userId: string | undefined
    mounted() {
        this.teamId = +this.$route.query.td;   
        this.requestTeamDetail()
        const canvasElement = this.$refs.teamFormation as any
        // 鼠标按下
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
                // 判断鼠标按下位置是否在球员
                if (x >= itemX[0] && x <= itemX[1] && y >= itemY[0] && y <= itemY[1] ) {
                    const idx = this.canvasTeamList.findIndex((elItem: any) => elItem.user_id == item.user_id)
                    if (this.formationModeType.mode == '' || this.formationModeType.type == '') {
                        Toast.showToastError.call(this, '请选择球队阵型', '操作失败')
                        return
                    }
                    this.canvasDown = true
                    this.activityMateIndex = idx
                }
            })
        }
        // 拖拽事件
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
        // 鼠标释放
        canvasElement.onmouseup = async () => {
            if (this.canvasDown) {
                // 鼠标抬起后判断是否在阵容范围内
                const isAvailable = this._checkIsInFormationItem()
                if (isAvailable) {
                    await this._repaintFormation()
                    setTimeout(()=> {
                        this.activityMateIndex = -1
                    })
                }else {
                    this.context.clearRect(0,0,this.canvasWidth + 150, this.canvasHeight)
                    const img = new Image()
                    img.src = 'https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/assets/football_bg.png'
                    img.onload = () => {
                        this.contextByHide.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight)
                        this._drawTeamFormation(this.formationModeType.mode, this.formationModeType.type)
                        this.initTeamMate()
                        this.copyHideCanvas()
                        this.activityMateIndex = -1
                    }       
                }
                this.canvasDown = false
                this.coordinate = {
                    x: 0,
                    y: 0
                }   
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
            this._drawTeamFormation(this.formationModeType.mode, this.formationModeType.type, true)
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
    // 绘制球员线
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
            this._addArrow()
            this.copyHideCanvas()
        }
    }
    initTeamMate () {
        this.canvasTeamList = []
        this.teamMemberList.forEach((item: any, index: number) => {
            // 当前拖拽不进行渲染
            // if (this.activityMateIndex == index) {
            //     return
            // }
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
                    height: 60,
                    user_id: item.id,
                    user_name: item.nick_name
                })
            }

        })
        this.canvasTeamList = this.canvasTeamList.reverse()
    }
    private handleChange (detail: any) {
        this.options.forEach((item: any) => {
            if (item.value == detail[0]) {
                this.formationModeType.mode = item.label
                item.children.forEach((elItem: any) => {
                    if (elItem.value == detail[1]) {
                        this.formationModeType.type = elItem.label
                    }
                })
            }            
        })
        this.context.clearRect(0,0, 150,this.canvasWidth, this.canvasHeight)
        const img = new Image()
        img.src = 'https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/assets/football_bg.png'
        img.onload = () => {
            this.contextByHide.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight)
            this._drawTeamFormation(this.formationModeType.mode, this.formationModeType.type)
        }
    }
    _drawTeamFormation (mode: any, type: any, flag = false) {
        if (mode == '' || type == '') return
        if (!flag) {
            this.optionsList = new FormationOptions(this.canvasWidth, this.canvasHeight).getFormationOptions(mode, type)
        }
        this.optionsList.forEach((item: any) => {
            if (!item.head_url) {
                this.contextByHide.strokeStyle = '#ffffff'
                this.contextByHide.fillStyle = 'rgba(99,197,101, .5)'
                this.contextByHide.beginPath();
                this.contextByHide.arc(item.left, item.top, 30, 0, Math.PI * 2)
                this.contextByHide.stroke();
                this.contextByHide.fill()
            }else {
                const image = new Image()
                image.src = item.head_url
                image.onload = () => {
                    this.contextByHide.fillStyle = 'transparent'
                    this.contextByHide.beginPath()
                    this.contextByHide.arc(item.left, item.top, 30, 0, Math.PI * 2)
                    this.contextByHide.clip()
                    this.contextByHide.drawImage(image, item.left - 30, item.top - 30 , 60, 60)
                    this.contextByHide.restore()
                    this.contextByHide.save()
                    this.copyHideCanvas()   
                }
            }
        })
        this.copyHideCanvas()   
    }
    _checkIsInFormationItem (): boolean {
        const { x, y } = this.coordinate
        let flag = false
        this.optionsList.forEach((item: any, index: number) => {
            const areaX = [item.left - 30, item.left + 30]
            const areaY = [item.top - 30, item.top + 30]
            if ( (x >= areaX[0] && x <= areaX[1]) && (y >= areaY[0] && y <= areaY[1]) ) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                this.optionsList[index].id = this.teamMemberList[this.activityMateIndex].id
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                this.optionsList[index].head_url = this.teamMemberList[this.activityMateIndex].head_url
                flag = true
            } 
        })
        return flag
    }
    private _repaintFormation () {
        const img = new Image()
        img.src = 'https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/assets/football_bg.png'
        img.onload = () => {
            this.contextByHide.clearRect(0,0,this.canvasWidth + 150, this.canvasHeight)
            this.contextByHide.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight)
            this.initTeamMate()
            this._drawTeamFormation(this.formationModeType.mode, this.formationModeType.type, true)
        }
    }
    // 进攻箭头
    private _addArrow () {
        this.contextByHide.strokeStyle = '#ffffff'
        this.contextByHide.fillStyle = 'rgba(255,255,255, .3)'
        this.contextByHide.moveTo(this.canvasWidth / 2 + 50, this.canvasHeight * 0.7)
        this.contextByHide.lineTo(this.canvasWidth / 2 - 50, this.canvasHeight * 0.7)
        this.contextByHide.lineTo(this.canvasWidth / 2 - 50, this.canvasHeight * 0.4)
        this.contextByHide.lineTo(this.canvasWidth / 2 - 90, this.canvasHeight * 0.4)
        this.contextByHide.lineTo(this.canvasWidth / 2, this.canvasHeight * 0.25)
        this.contextByHide.moveTo(this.canvasWidth / 2 + 50, this.canvasHeight * 0.7)
        this.contextByHide.lineTo(this.canvasWidth / 2 + 50, this.canvasHeight * 0.4)
        this.contextByHide.lineTo(this.canvasWidth / 2 + 90, this.canvasHeight * 0.4)
        this.contextByHide.lineTo(this.canvasWidth / 2, this.canvasHeight * 0.25)
        this.contextByHide.stroke();
        this.contextByHide.fill()
    }
}
</script>
<style lang="scss" scoped>
.team-formation-container {
    width: 100%;
    min-height: $basic_height;
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
        user-select: none;
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
        user-select: none;
    }
    &-setting {
        font-weight: 500;
        color: white;
        font-size: 14px;
        margin-left: 2vw;
        user-select: none;
        margin-top: 15px;
        span {
            margin-right: 20px;
        }
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
        user-select: none;
    }
}
.setting-area ::v-deep .cascader {
    margin-top: 30px;
}
.setting-btn {
    width: 8vw;
    text-align: center;
    margin: 10vh 0 5vh 3vw;
    background-color: $high_light_color;
    color: white;
    font-weight: 500;
    font-size: 14px;
    padding: 10px 0px;
    border-radius: 5px;
    box-shadow: $basic_shadow;
    cursor: pointer;
}
</style>