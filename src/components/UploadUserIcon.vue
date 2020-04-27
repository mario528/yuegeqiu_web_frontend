<!--
 * @Author: majiaao
 * @Date: 2020-04-26 17:04:16
 * @LastEditors: majiaao
 * @LastEditTime: 2020-04-27 02:31:34
 * @Description: file content
 -->
<template>
    <div class="upload-container">
        <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :data="formData"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
            <div class="flex-column-center tips" v-if="showTips">
                <i class="el-icon-plus tips-icon"></i>
            </div>
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Toast, Url } from '../utils/index'
@Component
export default class UploadUserIcon extends Vue {
  @Prop({default: 2}) 
  public size !: number
  @Prop({ default: () => ['image/jpeg'] })
  public uploadType !: string[]
  @Prop({ default: '/api/v1/user/upload/head' })
  public uploadUrl !: string
  @Prop({default: {}})
  public formData !: {}
  private avatarUrl !: string
  private showTips = true
  private handleAvatarSuccess(res: any, file: any) {
      if (res.status) {
        this.avatarUrl = res.data.avatar_url
        this.imageUrl = this.avatarUrl
        this.showTips = false
        Toast.showToastSuccess.call(this,'上传成功!','成功');
        this.$emit('upLoadSuccessful')
      }
  }
  private beforeAvatarUpload(file: any) {
    const isJPG = this.uploadType.indexOf(file.type) != -1
    const isLitMaxSize = file.size / 1024 / 1024 <= this.size;
    if (!isJPG) {
        Toast.showToastError.call(this,'上传头像图片只能是 JPG 格式!','错误');
        return false;
    }else {
        if (!isLitMaxSize) {
            Toast.showToastError.call(this,`上传图片大小不能超过${this.size}MB!`,'错误');
            return false; 
        }
        return true
    }
  }
  private imageUrl = require("../assets/logo.png");
}
</script>
<style lang="scss" scoped>
.upload-container {
    width: 100%;
    height: 100%;
    min-width: 200px;
    min-height: 200px;
    border: 1px dashed $header_font_color_common;
}
.upload-container ::v-deep .avatar-uploader {
    width: 100%;
    height: 100%;
}
.avatar-uploader {
    position: relative;
}
.avatar-uploader ::v-deep .el-upload--text {
    width: 90%;
    height: 90%;
    margin: 5% 5%;   
}
.avatar {
    width: 100%;
    height: 100%;
}
.tips {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .1);
    z-index: 10;
    &-icon {
        color: $base_font_color;
        font-size: 30px;
    }
}
</style>


