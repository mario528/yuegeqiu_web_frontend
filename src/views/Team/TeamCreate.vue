<template>
    <div class="flex-column-center container">
        <div>创建球队</div>
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

    private selectComplete (location: any) {
        this.locationInfo = location
    }
    private handleTeamNameInput (value: string) {
        value = value.replace(/\s+/g, '')
        this.teamName = value
    }
    private handleCreateTeam () {
        debugger
        if (!this.teamName || !Utils.isObjectValueAvaiable(this.locationInfo) || !this.activityDetail || !this.teamDetail) return
        const params = {
            team_name: this.teamName,
            location: this.locationInfo,
            team_description: this.teamDetail,
            team_activity_location_detail: this.activityDetail,
            user_id: this.userId || localStorage.getItem('User_ID') as string
        }
        const teamModel = new Team()
        teamModel.crateTeam.call(this, params).then((res: any) => {
            debugger
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
@media screen and (max-width: 450px){
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

