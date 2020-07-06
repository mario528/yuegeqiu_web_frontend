<!--
 * @Author: majiaao
 * @Date: 2020-04-28 21:06:48
 * @LastEditors: majiaao
 * @LastEditTime: 2020-07-06 20:32:15
 * @Description: file content
 -->
<template>
    <div>
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
                <div class="inform-btn">详细>></div>
            </div>
        </div>
        <div class="flex-row-end width-100 pagination">
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
import UserType from '@/model/User/User'
@Component
export default class UserCenterDynamic extends Vue {
    @Getter('getUserId')
    private userId: string | undefined
    private messageList: any[] = []
    private pageConfig = {
        _pageSize: 10,
        _pageTotal: 0,
        _pageIndex: 0
    }
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
.pagination ::v-deep .el-pagination {
    text-align: end;
}
.pagination ::v-deep .el-pager .active {
    background-color: $base_color !important;
}
</style>