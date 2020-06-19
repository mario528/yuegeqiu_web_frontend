<!--
 * @Author: majiaao
 * @Date: 2020-05-07 21:25:40
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-19 23:14:38
 * @Description: file content
 -->
 <template>
    <div class="width-100">
        <mario-dialog :showDialog="showDialog">
            <div slot="dialog-content">
                <div class="dialog-content-title">发起活动</div>
                <div class="dialog-content-line">
                    <div class="dialog-content-line-left">活动</div>
                    <div class="dialog-content-line-right">
                        <input placeholder="活动"  v-model="dialogInfo.title" class="dialog-content-line-right-input" />
                    </div>
                </div>
                <div class="dialog-content-line">
                    <div class="dialog-content-line-left">活动日期</div>
                    <div class="dialog-content-line-right">{{dialogInfo.showDate}}</div>
                </div>
                <div class="dialog-content-line">
                    <div class="dialog-content-line-left">具体时间</div>
                    <div class="dialog-content-line-right">
                        <el-time-select
                            class="dialog-content-line-right-time"
                            placeholder="起始时间"
                            v-model="dialogInfo.datetime.startTime"
                            @change="changeDateTime"
                            :picker-options="{
                            start: '08:00',
                            step: '00:30',
                            end: '24:00'
                            }">
                        </el-time-select>
                    </div>
                </div>
                <div class="dialog-content-line">
                    <div class="dialog-content-line-left">详情</div>
                    <div class="dialog-content-line-right">
                        <textarea placeholder="活动" v-model="dialogInfo.detail" class="dialog-content-line-right-textarea" />
                    </div>
                </div>
            </div>
            <div slot="dialog-footer">
                <span class="dialog-footer-btn" @click="handlePublishAvtivity">发布</span>
            </div>
        </mario-dialog>
        <div class="flex-row-between caleder-title" @click="handleContentVisible">
            近期活动
            <img v-if="showHideModel" :class="[hideContent ? 'down-arrow' : 'down-arrow-up']" :src="downArrow" />
        </div>
        <div class="calendar-week-title" v-if="!isMobile && (showHideModel && !hideContent) || !showHideModel">
            <div class="calendar-week-title-item" v-for="(item, index) in weekList" :key="index">
                {{item}}
            </div>
        </div>
        <div class="width-100 calendar-area" v-if="!isMobile && (showHideModel && !hideContent) || !showHideModel">
            <div class="calendar-area-item-weekend"></div>
            <div class="relativity" v-for="(item, index) in calendarList" :key="index" @mouseover="showCalendarDialog(index)" @mouseleave="hideCalendarDialog(index)">
                <div :class="[activityIndex == index ? 'calendar-area-item-hover' : item.is_weekend ? 'calendar-area-item-weekend' : 'calendar-area-item']">
                    <span :class="[item.is_pass ? 'calendar-area-item-strong-disable' : item.is_today ? 'calendar-area-item-strong-today' : 'calendar-area-item-strong']">{{item.date.substring(8)[0] == '0' ? item.date.substring(9) : item.date.substring(8)}}</span>
                    <img class="calendar-area-item-icon" :src="activityIcon" v-if="item.activity_id">
                </div>
                <mario-popover :showPopover="item.showDialogContent" @mouseover="showCalendarDialog(index)" @mouseleave="hideCalendarDialog(index)">
                    <div class="flex-column-center loading" slot="loading" v-if="item.loading">
                        <i class="el-icon-loading"></i>
                    </div>
                    <div slot="content" class="popover-box">
                        <div class="popover-title">活动详情</div>
                        <div class="flex-row-y-center popover-line">
                            <img :src="require('@/assets/activity_content_icon.png')" class="popover-icon">
                            <div class="popover-content">{{item.activity || '-'}}</div>
                        </div>
                        <div class="flex-row-y-center popover-line">
                            <img :src="require('@/assets/time.png')" class="popover-icon">
                            <div class="popover-content">{{item.date}}</div>
                        </div>
                    </div>
                    <div slot="footer" class="popover-footer">
                        <span class="popover-join-btn" v-if="item.activity_id && joinState == -1">参与</span>
                        <span class="popover-join-btn" v-if="!item.activity_id" @click="handleCreateActivity">发起活动</span>
                        <span class="popover-join-btn" v-if="item.activity_id && joinState != -1" @click="cancelJoin">取消参与</span>
                    </div>
                </mario-popover>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Inject } from "vue-property-decorator";
import { Getter } from 'vuex-class'
import { TimeFormate } from "@/utils/index";
import Team from '../model/Team/Team'
import Popover from '@/components/Popover.vue'
import Dialog from '@/components/Dialog/DialogComponent.vue'
@Component({
    components: {
        'mario-popover': Popover,
        'mario-dialog': Dialog
    }
})
export default class TeamCaleder extends Vue {
  @Prop({ default: () => [] }) dateArray!: string[];
  @Prop({default: () => []}) calendarList!: any[]
  @Prop() teamId!: string
  @Prop({ default: false }) isMobile !: boolean
  @Prop({ default: false }) showHideModel !: boolean
  @Prop({ default: false }) hideContent !: boolean
  @Getter('getUserId') private userId !: string
  @Inject('reload') private reload!: () => void
  private weekList = ['日','一','二','三','四','五','六']
  private activityIcon = require('@/assets/activity_icon.png')
  private activityIndex = -1
  private showDialog = false
  private joinState = -1
  private dialogInfo = {
      title: "",
      showDate: "",
      datetime: {
          startTime: ""
      },
      detail: ""
  }
  private downArrow: string = require('@/assets/user_arrow_black.png')
  private showCalendarDialog (index: number) {
       if (this.calendarList[index].is_pass) return
       this.$nextTick(()=> {
          if (this.activityIndex != -1 && this.activityIndex != index) {
            this.$set(this.calendarList[this.activityIndex],'showDialogContent', false)
          }
          this.$set(this.calendarList[index],'showDialogContent', true)
          this.activityIndex = index
          this.showDialog = false
          // 强制更新
          this.$forceUpdate();
          const activityId = this.calendarList[this.activityIndex].activity_id
          if (!activityId) {
              this.$set(this.calendarList[index],'loading', false)
              return
          }
          this.requestActivityRole(activityId as string)
       })
  }
  private hideCalendarDialog (index: number) {
      setTimeout(() => {
          this.$set(this.calendarList[index],'showDialogContent', false)
          this.activityIndex = -1
          // 强制更新
          this.$forceUpdate();   
      }, 0);
  }
  private requestActivityRole (activity_id: string) {
      new Team().getActivityRole.call(this, {
          team_id: this.teamId,
          activity_id: activity_id,
          user_id: this.userId || localStorage.getItem('User_ID') as string
      }).then((res: any) => {
          this.$set(this.calendarList[this.activityIndex],'loading', false)
          const { join_state } = res
          this.joinState = join_state
          // 强制更新
          this.$forceUpdate();   
      })
  }
  private handleCreateActivity () {
    const index = this.activityIndex
    this.$set(this.calendarList[index],'showDialogContent', false)
    this.activityIndex = -1
    this.dialogInfo.showDate = this.calendarList[index].date
    this.showDialog = true
    this.$forceUpdate(); 
  }
  private changeDateTime (detail: string) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.dialogInfo.startTime = detail
  }
  private handlePublishAvtivity () {
      const { title, showDate, datetime, detail } = this.dialogInfo
      new Team().createTeamActivity.call(this, {
          team_id: this.teamId,
          user_id: this.userId || localStorage.getItem('User_ID') as string,
          activity_title: title,
          activity_date: showDate,
          activity_time: datetime.startTime,
          activity_detail: detail
      }).then((res: any) => {
          this.reload()
      })
  }
  private handleContentVisible () {
    if (!this.showHideModel) return
    this.hideContent = !this.hideContent
  }
}
</script>
<style lang="scss" scoped>
.caleder-title {
    width: 100%;
    margin: 20px 0;
    text-align: start;
    font-weight: 500;
}
.calendar-week-title {
    display: grid;
    grid-template-columns: repeat(auto-fill, calc(100% / 7));
    margin-bottom: 10px;
    &-item {
        padding: 20px 10px;
        background-color: $base_color;
        font-weight: 500;
        color: $base_font_color;
    }
}
.relativity {
    position: relative;
}
.calendar-area {
    display: grid;
    grid-template-columns: repeat(auto-fill, calc(100% / 7));
    background-color: white;
    &-item {
        position: relative;
        text-align: start;
        min-height: 100px;
        background-color: white;
        border-bottom: .5px solid $shallow_grey_color;
        border-left: .5px solid $shallow_grey_color;
        padding: 5px 5px;
        box-sizing: border-box;
        &:hover {
            // background-color: rgba(22,177,58,.5);
            background-color: rgba(0, 0, 0, 0.05); 
            color: $header_font_color_activity;
            font-weight: 600;
            cursor: pointer;
        }
        &-hover {
            @extend .calendar-area-item ;
            // background-color: rgba(22,177,58,.5);
            background-color: rgba(0, 0, 0, 0.1); 
            color: $header_font_color_activity;
            font-weight: 600;
            cursor: pointer;
        }
        &:nth-of-type(7n + 1) {
            border-left: none;
        }
        &:last-of-type {
            border-right: .5px solid $shallow_grey_color;
        }
        &:nth-of-type(7n + 7) {
            border-right: none;
        }
        &-icon {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            position: absolute;
            right: 5px;
            top: 5px;
        }
        &-strong {
            font-size: 18px;
            font-weight: 500;
            padding: 10px 0 0 5px;
            &-disable {
                @extend .calendar-area-item-strong ;
                color: $disable_color;
            }
            &-today {
                @extend .calendar-area-item-strong ;
                font-weight: 700;
                color: $base-color;
            }
        }
        &-pop-dialog {
            position: absolute;
            top: -80%;
            width: 50px;
            height: 50px;
        }
        &-weekend {
            @extend .calendar-area-item ;
            // background-color: rgba(99,197,101, .2);
            background-color: rgba($base_color, .05);
        }
    }
}
.popover {
    color: #333333;
    &:hover {
        color: #333333;
    }
    &-title {
        font-size: 16px;
        text-align: start;
        padding: 5px 0;
        border-bottom: 1px solid #eeeeee;
    }
    &-line {
        padding: 10px 0;
    }
    &-box {
        box-sizing: border-box;
        padding: 5px 10px;
    }
    &-icon {
        width: 15px;
        height: 15px;
        margin-right: 10px;
    }
    &-content {
        font-size: 14px;
    }
    &-footer {
        text-align: end;
        padding: 10px;
    }
    &-join-btn {
        font-size: 14px;
        width: auto;
        padding: 2px 6px;
        background-color: $base-color;
        color: white;
        font-weight: 500;
        border-radius: 5px;
        margin: 5px;
        cursor: pointer;
    }
}
.loading {
    position: absolute;
    bottom: 0;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: 999;
    border-radius: 5px;
    background-color: hsla(0,0%,100%,.9);
}
.dialog-content {
    &-title {
        position: relative;
        text-align: start;
        padding-left: 20px;
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 20px;
        &::after {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 5px;
            height: 100%;
            background-color: $side-color;
        }
    }
    &-line {
        width: 100%;
        text-align: start;
        padding: 10px 5px;
        &-left {
            width: 30%;
            display: inline-block;
        }
        &-right {
            width: 70%;
            display: inline-block;
            &-time {
                width: 75%;
            }
            &-input {
                box-sizing: border-box;
                width: 75%;
                padding: 10px 5px;
                outline: none;
                border: 1px solid #DCDFE6;
                border-radius: 5px;
            }
            &-textarea {
                box-sizing: border-box;
                resize: none;
                outline: none;
                width: 75%;
                height: 10vh;
                padding: 10px 5px;
                border: 1px solid #DCDFE6;
            }
        }
    }
}
.dialog-footer-btn {
    background-color: $side-color;
    color: white;
    padding: 5px 20px;
    border-radius: 5px;
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


 
