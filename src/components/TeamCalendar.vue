<!--
 * @Author: majiaao
 * @Date: 2020-05-07 21:25:40
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-11 01:39:11
 * @Description: file content
 -->
 <template>
    <div class="width-100">
        <div class="caleder-title">近期活动</div>
        <div class="calendar-week-title">
            <div class="calendar-week-title-item" v-for="(item, index) in weekList" :key="index">
                {{item}}
            </div>
        </div>
        <div class="width-100 calendar-area">
            <div class="calendar-area-item-weekend"></div>
            <div class="relativity" v-for="(item, index) in calendarList" :key="index" @mouseover="showCalendarDialog(index, item.activity_id)" @mouseleave="hideCalendarDialog(index, item.activity_id)">
                <div :class="[activityIndex == index ? 'calendar-area-item-hover' : item.is_weekend ? 'calendar-area-item-weekend' : 'calendar-area-item']">
                    <span :class="[item.is_pass ? 'calendar-area-item-strong-disable' : item.is_today ? 'calendar-area-item-strong-today' : 'calendar-area-item-strong']">{{item.date.substring(8)[0] == '0' ? item.date.substring(9) : item.date.substring(8)}}</span>
                    <img class="calendar-area-item-icon" :src="activityIcon" v-if="item.activity_id">
                </div>
                <mario-popover :showPopover="item.showDialogContent" @mouseover="showCalendarDialog(index, item.activity_id)" @mouseleave="hideCalendarDialog(index, item.activity_id)">
                    <div slot="content" class="popover-box">
                        <div class="popover-title">详情</div>
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
                        <span class="popover-join-btn" v-if="item.activity_id">参与</span>
                        <span class="popover-join-btn" v-if="!item.activity_id">发起活动</span>
                    </div>
                </mario-popover>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { TimeFormate } from "@/utils/index";
import Popover from '@/components/Popover.vue'
@Component({
    components: {
        'mario-popover': Popover
    }
})
export default class TeamCaleder extends Vue {
  @Prop({ default: () => [] }) dateArray!: string[];
  @Prop({default: () => []}) calendarList!: any[]
  private weekList = ['日','一','二','三','四','五','六']
  private activityIcon = require('../assets/activity_icon.png')
  private activityIndex = -1
  private flag = true
  private showCalendarDialog (index: number, activityId: string | null) {
       this.$nextTick(()=> {
          if (this.activityIndex != -1 && this.activityIndex != index) {
            this.$set(this.calendarList[this.activityIndex],'showDialogContent', false)
          }
          this.$set(this.calendarList[index],'showDialogContent', true)
          this.activityIndex = index
          // 强制更新
          this.$forceUpdate();
       })
  }
  private hideCalendarDialog (index: number, activityId: string | null) {
      setTimeout(() => {
          this.$set(this.calendarList[index],'showDialogContent', false)
          this.activityIndex = -1
          // 强制更新
          this.$forceUpdate();   
      }, 0);
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
        padding: 20px 0;
        background-color: $side-color;
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
            background-color: rgba(22,177,58,.5);
            color: $header_font_color_activity;
            font-weight: 600;
            cursor: pointer;
        }
        &-hover {
            @extend .calendar-area-item ;
            background-color: rgba(22,177,58,.5);
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
                color: $side-color;
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
            background-color: rgba(99,197,101, .2);
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
        background-color: $side-color;
        color: white;
        font-weight: 500;
        border-radius: 5px;
        margin: 5px;
        cursor: pointer;
    }
}
</style>


 
