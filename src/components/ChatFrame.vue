<!--
 * @Author: majiaao
 * @Date: 2020-06-09 00:01:14
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-09 23:36:26
 * @Description: file content
--> 
<template>
  <div class="chat-frame-container">
    <div>
      <div class="chat-frame-content" v-if="showFrameContent" ref="frameContent">
        <div class="chat-frame-content-title" v-if="title">{{title}}<span v-if="memberNumber">（{{memberNumber}}）</span></div>
        <div class="chat-frame-content-detail">
          <div class="chat-frame-content-detail-tips" v-if="messageList.length == 0">
            暂无聊天记录
          </div>
        </div>
        <div class="flex-row chat-frame-content-publish">
          <textarea class="chat-frame-content-text_area" v-model="publishContext"></textarea>
          <div class="chat-frame-content-send_btn">发送</div>
        </div>
      </div>
      <div class="flex-row-between chat-frame-bar">
        <div>球队聊天室</div>
        <img @click="handleFrameContent" :class="[showFrameContent ? 'down-arrow' : 'down-arrow-up']" :src="downArrow" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { Getter } from 'vuex-class' 
import TeamType from '@/model/Team/Team'
@Component
export default class ChatFrame extends Vue {
  @Prop({ default: '' }) title !: string
  @Prop({ default: 0 }) memberNumber !: number
  @Prop({ default: -1 }) teamId !: number
  @Getter('getUserId') 
  public userId!: string | number;
  private downArrow: string = require('@/assets/user_arrow.png')
  private messageList = []
  public showFrameContent = false;
  private publishContext = ''
  mounted() {
    this.$nextTick(() => {
      this.requestTeamMessage()
    })
  }
  private handleFrameContent () {
    this.showFrameContent = !this.showFrameContent
  }
  private requestTeamMessage () {
    new TeamType().requestTeamChat.call(this, {
      user_id: this.userId || localStorage.getItem('User_ID') as string,
      team_id: this.teamId
    }).then((res: any) => {
      this.messageList = res.message_list
    })
  }
  private publishTeamMessage () {
    new TeamType().requestTeamChat.call(this, {
      user_id: this.userId || localStorage.getItem('User_ID') as string,
      team_id: this.teamId
    }).then((res: any) => {
      this.messageList = res.message_list
    })
  }
}
</script>
<style lang="scss" scoped>
.chat-frame {
  &-container {
    width: 30vw;
    position: fixed;
    right: 0;
    bottom: 0vh;
    z-index: 500;
  }
  &-bar {
    box-sizing: border-box;
    padding: 0 10%;
    background-color: #ff5000;
    height: 50px;
    line-height: 50px;
    color: white;
    font-weight: 500;
    z-index: 600;
  }
  &-content {
    height: 55vh;
    width: 100%;
    background-color: white;
    animation: unfold .2s linear forwards;
    box-shadow: $basic_shadow;
    &-title {
      padding: 0px 20px;
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #eeeeee;
    }
    &-detail {
      width: 100%;
      height: calc(50vh - 45px);
      background-color: rgba(#FFFAF0, .6);
      position: relative;
      &-tips {
        width: 100%;
        text-align: center;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #a9a9a9;
        font-weight: 500;
      }
    }
    &-publish {
      width: 100%;
      height: 5vh;
      border-top: 1px solid #eeeeee;
    }
    &-text_area {
      width: 80%;
      height: 5vh;
      resize: none;
      outline: none;
      border: 1px solid transparent;
      box-sizing: border-box;
      margin: 0;
      box-shadow: none;
      padding: 10px;
      font-size: 20px;
    }
    &-send_btn {
      width: 20%;
      text-align: center;
      height: 5vh;
      line-height: 5vh;
      background-color: $base_color;
      color: white;
      font-weight: 500;
      cursor: pointer;
    }
  }
}
.down-arrow {
    width: 25px;
    height: 25px;
    transition: all 0.3s ease;
    color: white;
    &-up {
        @extend .down-arrow;
        transform: rotate(180deg);
    }
}
@keyframes unfold {
  0% {
    opacity: 0;
    height: 0;
  }
  100% {
    opacity: 1;
    height: 55vh;
  }
}
@keyframes hide {
  0% {
    opacity: 1;
    height: 55vh;
  }
  100% {
    opacity: 0;
    height: 0vh;
  }
}
</style>
