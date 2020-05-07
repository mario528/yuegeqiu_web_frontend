<!--
 * @Author: majiaao
 * @Date: 2020-05-07 21:25:40
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-08 01:25:05
 * @Description: file content
 -->
 <template>
    <div class="width-100">
        <div class="caleder-title">近期活动</div>
        <el-calendar :range="dateArray">
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template slot="dateCell" slot-scope="{date, data}">
                <p
                    :class="data.isSelected ? 'is-selected' : ''"
                >{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}</p>
            </template>
        </el-calendar>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { TimeFormate } from "../../src/utils/index";
@Component
export default class TeamCaleder extends Vue {
  @Prop({ default: () => [] })
  dateArray!: string[];
}
</script>
<style lang="scss" scoped>
.caleder-title {
    width: 100%;
    margin: 20px 0;
    text-align: start;
    font-weight: 500;
}
</style>


 
