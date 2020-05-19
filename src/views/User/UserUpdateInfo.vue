<!--
 * @Author: majiaao
 * @Date: 2020-05-19 16:51:51
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-20 02:42:19
 * @Description: file content
--> 
<template>
    <div class="flex-column-x-center update-info-container">
        <div class="content">
            <div class="content-header">
                <div class="content-header-back" @click="handleRouterBack">
                    <i class="el-icon-back"></i>
                    <span class="back-text">返回</span>
                    <span>个人信息</span>
                </div>
            </div>
        </div>
        <div class="flex-column-center user-info-main">
            <div class="flex-row-y-center user-info-line">
                <div class="user-info-line-title">头像</div>
                <div class="user-info-icon">
                    <icon-diy :iconPath="userInfo.head_url" :hoverModel="true"></icon-diy>
                </div>
            </div>
            <div class="flex-row-y-center user-info-line">
                <div class="user-info-line-title">用户名</div>
                <div class="user-info-line-content">
                    <div v-show="showStateArr[0]">{{userInfo.nick_name}}</div>
                    <div v-show="!showStateArr[0]">
                        <input
                            type="text"
                            class="nick-name-input"
                            v-model="updateUserInfo.nickName"
                            :placeholder="userInfo.nick_name"
                        >
                    </div>
                    <div
                        class="update-text"
                        v-show="editState != 1"
                        @click="showStateArr[0] ? handleEdit(0) : handleSave(0, updateUserInfo.nickName)"
                    >{{showStateArr[0] ? '修改' : '保存'}}</div>
                </div>
            </div>
            <div class="flex-row-y-center user-info-line">
                <div class="user-info-line-title">性别</div>
                <div class="user-info-line-content">
                    <div v-show="showStateArr[1]">{{userInfo.sex == 1 ? '男' : '女'}}</div>
                    <div v-show="!showStateArr[1]">
                        <el-radio-group v-model="updateUserInfo.sex" class="radio-group">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="0">女</el-radio>
                        </el-radio-group>
                    </div>
                    <div
                        class="update-text"
                        v-show="editState != 1"
                        @click="showStateArr[1] ? handleEdit(1) : handleSave(1, updateUserInfo.sex)"
                    >{{showStateArr[1] ? '修改' : '保存'}}</div>
                </div>
            </div>
            <div class="flex-row-y-center user-info-line">
                <div class="user-info-line-title">活动位置</div>
                <div class="user-info-line-content">
                    <div class="position-item" v-show="showStateArr[2]">{{userInfo.province}}</div>
                    <div
                        v-show="userInfo.province != userInfo.city && showStateArr[2]"
                        class="position-item"
                    >{{userInfo.city}}</div>
                    <div class="position-item" v-show="showStateArr[2]">{{userInfo.district}}</div>
                    <div v-show="!showStateArr[2]">
                        <location-select @selectComplete="selectComplete"></location-select>
                    </div>
                    <div
                        class="update-text"
                        v-show="editState != 1"
                        @click="showStateArr[2] ? handleEdit(2) : handleSave(2, updateUserInfo.location)"
                    >{{showStateArr[2] ? '修改' : '保存'}}</div>
                </div>
            </div>
        </div>
        <div class="btn-area">
            <div class="btn" @click="handleBtn">{{editState == 1 ? '修改个人信息' : '放弃修改'}}</div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter } from "vuex-class";
import User from "@/model/User/User";
import IconDiy from "@/components/IconDiy.vue";
import LocationSelect from "@/components/LocationSelect.vue";
import { Utils } from '@/utils/index'
@Component({
  components: {
    "icon-diy": IconDiy,
    "location-select": LocationSelect
  }
})
export default class UserUpdateInfo extends Vue {
  @Getter("getUserId")
  userId!: string | undefined;
  private userInfo: any = {};
  private editState = 1; // 1 未操作 2 点击修改 3 点击修改 输入
  private showStateArr = [1, 1, 1];
  private updateUserInfo = {
    nickName: "",
    sex: -1,
    location: {}
  };
  mounted() {
    this.getUserInfo();
  }
  private getUserInfo() {
    new User().getUserInfoByUpdate
      .call(this, {
        user_id: this.userId || localStorage.getItem("User_ID")
      })
      .then((res: any) => {
        this.userInfo = res.user_info;
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.updateUserInfo.sex = res.user_info.sex;
      });
  }
  private handleBtn() {
    if (this.editState == 1) {
      this.editState = 2;
    } else {
      this.editState = 1;
      this._initInfo();
    }
  }
  private handleEdit(idx: number) {
    this.editState = 3;
    this.$set(this.showStateArr, idx, 0);
  }
  private selectComplete(location: any) {
    this.updateUserInfo.location = location;
  }
  private _initInfo() {
    this.updateUserInfo = {
      nickName: "",
      sex: -1,
      location: {}
    };
    this.showStateArr = [1, 1, 1];
  }
  private handleSave(idx: number, value: any) {
    const params: any = {
      user_id: this.userId || localStorage.getItem("User_ID")
    };
    const key = idx == 0 ? "nick_name" : idx == 1 ? "sex" : "location";
    if (key == 'nick_name' && (value == '' || value == this.userInfo.nick_name)) {
        return
    }else if (key == 'sex' && (value == this.userInfo.sex || value == -1)) {
        return
    }else if (key == 'location' && (!Utils.isObjectValueAvaiable(value) || Utils.isObjectValueEquality(value, {
        province: this.userInfo.province,
        city: this.userInfo.city,
        district: this.userInfo.district
    }))) {
        return
    }
    params[key] = value;
    new User().changeUserInfo.call(this, params).then((res: any) => {
      if (key == "location") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const { province, city, district } = this.updateUserInfo.location;
        this.userInfo.province = province;
        this.userInfo.city = city;
        this.userInfo.district = district;
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.userInfo[key] = this.updateUserInfo[key];
      }
      this._initInfo();
    });
  }
  private handleRouterBack () {
      this.$router.go(-1)
  }
}
</script>
<style lang="scss" scoped>
.update-info-container {
  margin-top: -2vh;
  min-height: 82vh;
  background-color: rgba(169, 169, 169, 0.2);
}
.content {
  box-sizing: border-box;
  background-color: white;
  padding: 20px;
  box-shadow: $disable_color;
  &-header {
    text-align: center;
    &-back {
      float: left;
      cursor: pointer;
      span {
        margin-left: 10px;
        font-weight: 500;
      }
    }
  }
}
.back-text {
  position: relative;
  margin-right: 20px;
  &::after {
    position: absolute;
    top: 0;
    right: -15px;
    width: 1px;
    height: 100%;
    content: " ";
    background-color: $disable_color;
  }
}
.user-info {
  &-main {
    margin-top: 20px;
    background-color: white;
  }
  &-icon {
    width: 5vw;
    height: 5vw;
    min-width: 100px;
    min-height: 100px;
    border-radius: 50%;
  }
  &-line {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    div {
      display: inline-block;
    }
    &-title {
      width: 30%;
    }
    &-content {
      width: 70%;
    }
  }
}
.btn-area {
  margin-top: 20px;
  text-align: center;
  padding: 20px 0;
  background-color: white;
}
.position-item {
  background-color: #1e90ff;
  padding: 2px 5px;
  font-size: 14px;
  margin-right: 10px;
  border-radius: 5px;
  color: #f8f8ff;
  font-weight: 500;
}
.btn {
  width: 20%;
  min-width: 150px;
  padding: 10px 0;
  border-radius: 3px;
  margin: 0 auto;
  background-color: $base_color;
  color: white;
  &:last-of-type {
    margin-top: 10px;
  }
}
.update-text {
  float: right;
  margin-right: 15%;
  font-size: 12px;
  text-decoration: underline;
  color: #1e90ff;
  cursor: pointer;
}
.nick-name-input {
  outline: none;
  width: 130%;
  height: 30px;
  padding: 5px 10px;
  font-size: 14px;
}
@media screen and (max-width: 450px) {
  .content {
    width: 100%;
  }
  .user-info {
    &-main {
      width: 92%;
    }
  }
  .btn-area {
    width: 92%;
  }
}
@media screen and (min-width: 451px) {
  .content {
    width: 60%;
  }
  .user-info {
    &-main {
      width: 60%;
    }
  }
  .btn-area {
    width: 60%;
  }
}
</style>


