<template>
    <div class="flex-column-center container">
        <div class="strong-title-line">
            <div class="strong-title">创建球队</div>
        </div>
        <div class="create-line">
            <div class="create-line-title">球队名</div>
            <input class="create-line-input" placeholder="球队名称" @input="handleTeamNameInput($event.target.value)" :value="teamName"/>
        </div>
        <div class="create-line">
            <div class="create-line-title">球队活动区域</div>
            <div class="create-line-location">
                <location-select @selectComplete="selectComplete"></location-select>
            </div>
        </div>
        <div class="create-line">
            <div class="create-line-title">详细活动区域</div>
            <input class="create-line-input" placeholder="详细活动区域" v-model="activityDetail"/>
        </div>

         <div class="create-line">
            <div class="create-line-title">主场颜色</div>
            <el-color-picker
            v-model="homeColor"
            show-alpha
            :predefine="predefineColors">
            </el-color-picker>
        </div>
        <div class="create-line">
            <div class="create-line-title">客场颜色</div>
            <el-color-picker
            v-model="awayColor"
            show-alpha
            :predefine="predefineColors">
            </el-color-picker>
        </div>

        <div class="create-line">
            <div class="create-line-title">球队详细介绍</div>
            <textarea class="create-line-textarea" placeholder="球队详细介绍" v-model="teamDetail"></textarea>
        </div>
        <div class="confirm-btn" @click="handleCreateTeam">创建球队</div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import LocationSelect from '@/components/LocationSelect.vue'
import { Utils, Toast, RegExp } from '@/utils/index'
import Team from '@/model/Team/Team'

@Component({
    components: {
        'location-select': LocationSelect
    }
})
export default class TeamCreate extends Vue {
    @Getter('getUserId')
    private userId !: string

    private teamName!: string
    private locationInfo!: {}
    private activityDetail!: string
    private teamDetail!: string
    private homeColor = '#ff4500'
    private awayColor = '#c71585'
    private predefineColors = [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)'
    ]

    private selectComplete (location: any) {
        this.locationInfo = location
    }
    private handleTeamNameInput (value: string) {
        value = value.replace(/\s+/g, '')
        this.teamName = value
    }
    private handleCreateTeam () {
        if (!this.teamName || !Utils.isObjectValueAvaiable(this.locationInfo) || !this.activityDetail || !this.teamDetail) return
        const params = {
            team_name: this.teamName,
            location: this.locationInfo,
            team_description: this.teamDetail,
            team_activity_location_detail: this.activityDetail,
            user_id: this.userId || localStorage.getItem('User_ID') as string,
            home_court_color: this.homeColor,
            away_court_color: this.awayColor
        }
        const teamModel = new Team()
        teamModel.crateTeam.call(this, params).then((res: any) => {
            const teamId = res.team_id
            this.$router.push({
                path: '/team/detail',
                query: {
                    td: teamId
                }
            })
        })
    }
}
</script>
<style lang="scss" scoped>
.confirm-btn {
    background-color: $base_color;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 30px 0;
}
.strong-title {
    font-weight: 500;
    font-size: 17px;
}
@media screen and (max-width: 450px){
    .strong-title-line {
        width: 80vw;
    }
    .create-line {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 80vw;
        padding: 10px 0;
        &-input {
            width: 100%;
            height: 25px;
            outline: none;
            padding: 10px;
            margin: 15px 0;
            border-radius: 5px;
            border: 1px solid #eeeeee;
        }
        &-textarea {
            width: 100%;
            height: 100px;
            padding: 10px;
            margin: 15px 0;
            resize: none;
            outline: none;
            border-radius: 5px;
            border: 1px solid #eeeeee;
            position: relative;
        }
    }
}
@media screen and (min-width: 451px){
    .strong-title-line {
        width: 40vw;
        padding: 10px;
        border-bottom: 1px solid $shallow_grey_color;
    }
    .create-line {
        width: 40vw;
        padding: 20px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        &-title {
            width: 10vw;
            font-size: 16px;
            font-weight: 500;
        }
        &-input {
            width: 20vw;
            height: 25px;
            outline: none;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #eeeeee;
        }
        &-location {
            width: 30vw;
            margin: 15px 0;
        }
        &-textarea {
            width: 20vw;
            height: 100px;
            padding: 10px;
            resize: none;
            outline: none;
            border-radius: 5px;
            border: 1px solid #eeeeee;
            position: relative;
        }
    }
}
</style>

