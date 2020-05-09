<!--
 * @Author: majiaao
 * @Date: 2020-05-07 21:25:40
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-10 01:17:50
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
            <div class="calendar-area-item"></div>
            <div class="calendar-area-item" v-for="(item, index) in calendarList" :key="index" 
            @mouseover="showCalendarDialog(item.activity_id)">
                <mario-popover :showPopover="index == 1">
                    <div slot="content">1111</div>
                </mario-popover>
                <span :class="[item.is_pass ? 'calendar-area-item-strong-disable' : item.is_today ? 'calendar-area-item-strong-today' : 'calendar-area-item-strong']">{{item.date.substring(8)[0] == '0' ? item.date.substring(9) : item.date.substring(8)}}</span>
                <img class="calendar-area-item-icon" :src="activityIcon" v-if="item.activity_id">
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
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
  mounted() {
    this.calendarList.forEach(item => item.showDialogContent = false)
  }
  private showCalendarDialog (activityId: string | null) {
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
            background-color: red;
        }
    }
}
</style>


 
