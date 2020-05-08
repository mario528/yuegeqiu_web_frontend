<!--
 * @Author: majiaao
 * @Date: 2020-05-07 21:25:40
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-09 03:10:21
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
            <div class="calendar-area-item" v-for="(item, index) in calenderList" :key="index">
                <span class="calendar-area-item-strong">{{item.date.substring(8)[0] == '0' ? item.date.substring(9) : item.date.substring(8)}}</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { TimeFormate } from "../../src/utils/index";
@Component
export default class TeamCaleder extends Vue {
  @Prop({ default: () => [] })
  dateArray!: string[];
  @Prop({default: () => []})
  calenderList!: any[]
  private weekList = ['日','一','二','三','四','五','六']
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
        border-bottom: .5px solid #a9a9a9;
        border-left: .5px solid #a9a9a9;
        &:nth-of-type(7n + 1) {
            border-left: none;
        }
        &:last-of-type {
            border-right: .5px solid #a9a9a9;
        }
        &:nth-of-type(7n + 7) {
            border-right: none;
        }
        &-strong {
            font-size: 18px;
            font-weight: 500;
            padding: 10px 0 0 5px;
        }
    }
}
</style>


 
