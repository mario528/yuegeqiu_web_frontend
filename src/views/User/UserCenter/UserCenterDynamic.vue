<!--
 * @Author: majiaao
 * @Date: 2020-04-28 21:06:48
 * @LastEditors: majiaao
 * @LastEditTime: 2020-07-04 23:25:33
 * @Description: file content
 -->
<template>
    <div>
        <div>我的消息</div>
        <div v-if="messageList.length == 0">
            1
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
    mounted() {
        this.requestUserMessage()
    }
    private requestUserMessage () {
        new UserType().getUserMessage.call(this, {
            user_id: this.userId
        }).then((res: any) => {
            
        })
    }
}
</script>
<style lang="scss" scoped>

</style>


