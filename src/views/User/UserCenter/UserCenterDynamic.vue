<!--
 * @Author: majiaao
 * @Date: 2020-04-28 21:06:48
 * @LastEditors: majiaao
 * @LastEditTime: 2020-07-07 23:47:29
 * @Description: file content
 -->
<template>
    <div>
        <yueqiu-dialog :showDialog="pageConfig._showDialog" @closeDialog="handleCloseDialog">
            <div class="dialog-header" slot="dialog-header">
                {{ informDetail.inform_type == 1 ? '约球' : '' }}
            </div>
            <div class="dialog-content-container" slot="dialog-content">
                <div class="team-inform-content">{{informDetail.inform_content}}</div>
                <div class="flex-row-center">
                    <div v-for="(item, index) in informTeamDetail" :key="index" class="flex-column-x-center team-item">
                        <img :src="item.team_icon" class="team-icon">
                        <div class="team-name">{{item.team_name}}</div>
                    </div>
                </div>
            </div>
            <div class="dialog-footer-content" slot="dialog-footer">
                <span class="footer-btn-grey">拒绝</span>
                <span class="footer-btn">接受</span>
            </div>
        </yueqiu-dialog>
        <div class="flex-row-between title">
            <div>我的消息 ({{pageConfig._pageTotal}})</div>
            <div class="one_key_read" v-if="messageList.length != 0">一键已读</div>
        </div>
        <div class="flex-column-x-center" v-if="messageList.length == 0">
            <img class="empty-icon" :src="require('@/assets/inform_empty_icon.png')" />
            <div class="empty_tips">暂无消息</div>
        </div>
        <div class="width-100 inform-container" v-for="(item, index) in messageList" :key="index">
            <div :class="[item.is_read == 0 ? 'flex-row inform-content' : 'flex-row inform-content-grey']">
                <div class="width-92">
                    {{item.inform_content}}
                </div>
                <div class="inform-btn" @click="handleInformDetail(item.id, index)">详情>></div>
            </div>
        </div>
        <div class="flex-row-end width-100 pagination" v-if="messageList.length != 0">
            <el-pagination
                background=""
                :current-page="pageConfig._pageIndex"
                :page-size="pageConfig._pageSize"
                layout="prev, pager, next"
                :total="pageConfig._pageTotal"
                @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import Dialog from '@/components/Dialog/DialogComponent.vue'
import UserType from '@/model/User/User'
@Component({
    components: {
        'yueqiu-dialog': Dialog
    }
})
export default class UserCenterDynamic extends Vue {
    @Getter('getUserId')
    private userId: string | undefined
    private messageList: any[] = []
    private pageConfig = {
        _pageSize: 10,
        _pageTotal: 0,
        _pageIndex: 0,
        _showDialog: false
    }
    private informDetail: any = {}
    private informTeamDetail = []
    mounted() {
        this.requestUserMessage()
    }
    private requestUserMessage () {
        new UserType().getUserMessage.call(this, {
            user_id: this.userId,
            page: this.pageConfig._pageIndex
        }).then((res: any) => {
            const { inform_count, inform, next_page } = res
            this.pageConfig._pageIndex = next_page
            this.pageConfig._pageTotal = inform_count
            this.messageList = inform
        })
    }
    private handleInformDetail (informId: number, index: number) {
        new UserType().getInformDetail.call(this, {
            user_id: this.userId,
            inform_id: informId
        }).then((res: any) => {
            this.$event.emit('reflashUserInfo')
            if (this.messageList[index].is_read == 0) {
                this.messageList[index].is_read = 1
            }
            const { inform_detail, team_info } = res
            if (inform_detail.inform_type == 1) {
                // 约球
                this.pageConfig._showDialog = true
                this.informDetail = inform_detail
                this.informTeamDetail = team_info
            }
        })
    }
    private handleCloseDialog () {
        this.pageConfig._showDialog = false
    }
}
</script>
<style lang="scss" scoped>
.title {
    font-size: 18px;
    font-weight: 500;
    text-align: start;
    padding: 10px 0;
    border-bottom: 1px solid #a9a9a9;
    margin-bottom: 20px;
}
.one_key_read {
    font-size: 12px;
    background-color: $base_color;
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
}
.empty-icon {
    width: 50px;
    height: 40px;
    margin-top: 20vh;
}
.empty_tips {
    font-size: 16px;
    font-weight: 500;
    margin-top: 30px;
}
.inform-container {
    width: 100%;
    height: 55vh;
}
.inform-content {
    font-size: 16px;
    font-weight: 500;
    box-sizing: border-box;
    background-color: rgba(#FFFFF0, .2);
    text-align: start;
    padding: 10px 5px;
    border-bottom: 1px solid #eeeeee;
    user-select: none;
    &-grey {
        @extend .inform-content;
        color: #a9a9a9;
    }
}
.inform-btn {
    width: 10%;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
}
.dialog {
    &-header {
        text-align: start;
    }
    &-footer-content {
        margin-right: -10%;
    }
}
.footer-btn {
    padding: 5px 10px;
    margin-left: 10px;
    border-radius: 5px;
    cursor: pointer;
    background-color: $base_color;
    color: white;
    &-grey {
        @extend .footer-btn;
        background-color: #a9a9a9;
        color: white;
    }
}
.team {
    &-item {
        margin-top: 40px;
        position: relative;
        &:nth-of-type(2n) {
            margin-left: 10vw;
            &::before {
                content: 'VS';
                position: absolute;
                left: -7vw;
                top: 50%;
                transform: translateY(-50%);
                font-size: 22px;
                font-weight: 700;
                letter-spacing: 3px;
                font-family: fantasy;
                color: seagreen;
            }
        }
    }
    &-icon {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    &-name {
        font-weight: 500;
        font-size: 16px;
        margin-top: 10%;    
    }
    &-inform-content {
        text-align: start;
        font-size: 14px;
        margin-top: 15px;
    }
}
.pagination ::v-deep .el-pagination {
    text-align: end;
}
.pagination ::v-deep .el-pager .active {
    background-color: $base_color !important;
}
</style>