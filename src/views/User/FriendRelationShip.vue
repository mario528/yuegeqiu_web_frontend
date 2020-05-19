<!--
 * @Author: majiaao
 * @Date: 2020-05-17 23:38:38
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-19 19:29:03
 * @Description: file content
--> 
<template>
    <div class="container">
        <div class="container-bg"></div>
        <div class="width-100 flex-column-center user-info-container">
            <img
                class="user-info-container-bg"
                src="https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/user_relation_bg.jpg"
            >
            <img :src="userInfo.head_url" class="user-icon">
            <div class="user-name">{{userInfo.nick_name}}</div>
        </div>
        <div class="flex-column friend-list-container" v-if="friendList.length != 0">
            <div class="flex-row friend-item" v-for="(item, index) in friendList" :key="index">
                <img :src="item.head_url" class="friend-icon">
                <div class="width-100 flex-row-between friend-detail">
                    <div class="flex-column-y-between" style="height: 100%;">
                        <div class="flex-row-y-center">
                            <div class="friend-name">{{item.nick_name}}</div>
                            <img :src="item.sex == 0 ? womenIcon : menIcon" class="friend-sex-icon">
                        </div>
                        <div class="friend-tips">您和他在同一个球队</div>
                    </div>
                    <div class="friend-state">{{ md == '1' ? '已关注' : '未关注' }}</div>
                </div>
            </div>
        </div>
        <div class="flex-column-center friend-list-container" v-else>
            <div class="empty-tips">{{ md == '1' ? '您暂无关注' : '您暂无粉丝' }}</div>
        </div>
        <div class="width-100 flex-row-x-end pagination-area">
            <el-pagination
            background
            :current-page="pageConfig._pageCurrent"
            :page-size="pageConfig._pageSize"
            layout="prev, pager, next"
            :total="pageConfig._pageTotal"
            @current-change="handleCurrentChange"
            ></el-pagination>
        </div> 
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Getter } from "vuex-class";
import User from "@/model/User/User";
@Component
export default class FriendRelationShip extends Vue {
  @Getter("getUserId")
  private userId!: string | null;
  private md!: string;
  private vi!: string;
  private userInfo = {};
  private friendList!: any[];
  private menIcon = require("@/assets/men_icon.png");
  private womenIcon = require("@/assets/women_icon.png");
  private pageConfig = {
    _pageCurrent: 1,
    _pageIndex: 0,
    _pageTotal: 0,
    _pageSize: 5
  }
  mounted() {
    if (this.$route.params) {
      this.md = (this.$route.query.md as string) || "1";
      this.vi = this.$route.query.vi as string;
    }
    this.requestUserFriendShipDetail();
  }
  private requestUserFriendShipDetail() {
    const params = {
      user_id: this.userId || localStorage.getItem("User_ID"),
      interview_user_id: this.vi,
      mode: this.md,
      page: this.pageConfig._pageIndex
    };
    new User().getUserFriendShipDetail.call(this, params).then((res: any) => {
      this.userInfo = res.interview_user_info;
      this.friendList = res.friend_list;
      this.pageConfig._pageIndex = res.next_page
      this.pageConfig._pageTotal = res.page_total
    });
  }
  private handleCurrentChange (pageIndex: number) {
      this.pageConfig._pageCurrent = pageIndex
      this.pageConfig._pageIndex = pageIndex - 1
      this.requestUserFriendShipDetail()
  }
}
</script>
<style lang="scss" scoped>
.container {
  min-height: 82vh;
  margin: -2vh auto 0 auto;
}
.user-info-container {
  position: relative;
  height: 25vh;
  padding: 20px 0 10px 0;
  border-bottom: 1px solid $border_color;
  color: white;
  box-sizing: border-box;
  box-shadow: $basic_shadow;
  &-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
}
.friend-list-container {
  min-height: 57vh;
  border: 1px solid $border_color;
  box-sizing: border-box;
}
.user-icon {
  width: 8vw;
  height: 8vw;
  min-width: 80px;
  min-height: 80px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  z-index: 2;
}
.user-name {
  font-size: 18px;
  font-weight: 800;
  margin: 15px 0;
  z-index: 2;
}
.friend-item {
  box-sizing: border-box;
  padding: 20px 5%;
  border-bottom: 1px solid $border_color;
}
.friend-detail {
  margin-left: 5%;
}
.friend-name {
  font-size: 18px;
  font-weight: 500;
}
.friend-icon {
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  min-width: 60px;
  min-height: 60px;
}
.friend-sex-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 5px;
}
.friend-tips {
    font-size: 12px;
    color: #a9a9a9;
}
.friend-state {
  padding: 5px 10px;
  background-color: $base_color;
  border-radius: 10px;
  color: white;
  font-weight: 500;
  font-size: 14px;
}
.empty-tips {
  font-size: 18px;
  color: $disable_color;
  font-weight: 500;
}
.pagination-area {
    box-sizing: border-box;
    padding: 20px 5%;
}
@media screen and (max-width: 450px) {
  .container {
    width: 100%;
    border-radius: 10px;
  }
  .friend-list-container {
    width: 100%;
  }
}
@media screen and (min-width: 451px) {
  .container-bg {
    width: 100%;
    height: 100%;
    background: url("https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/friend_relation_page_bg.jpg");
    background-size: cover;
    background-position: center 0;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(5px);
  }
  .container {
    width: 40%;
    background-color: white;
    border-radius: 10px;
    z-index: 3;
  }
  .friend-list-container {
    width: 100%;
    margin: 0 auto;
  }
}
</style>


