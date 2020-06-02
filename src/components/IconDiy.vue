<!--
 * @Author: majiaao
 * @Date: 2020-05-13 23:47:29
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-02 15:07:33
 * @Description: file content
 -->
 <template>
    <div class="icon-container" @mouseenter="handleHoverEvent('mouseover')" @mouseleave="handleHoverEvent('mouseout')">
        <img :src="iconPath" class="icon">
        <div class="hover-content" v-if="showUpLoad || !hoverModel">
            <!-- <form name="upload-image" id="img-form" enctype="multipart/form-data" method="post">
                <input type="file" :accept="acceptFileType" @change="handleSelectImage($event)">
            </form> -->
            <div class="upload-area">
                <div class="flex-row-x-center upload-area-content" @click="handleUpload">上传图片</div>
            </div>
            <input class="image-uploader" id="uploader" type="file" :accept="acceptFileType" @change="handleSelectImage($event)">
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { FileType } from '@/utils/index'
@Component
export default class IconDiy extends Vue {
    @Prop({ default: '' }) iconPath !: string
    @Prop({ default: false }) hoverModel !: boolean
    @Prop({ default: "image/png,image/jpeg,image/jpg" }) acceptFileType !: string
    private showUpLoad = false
    private handleHoverEvent (methodType: string) {
        if (!this.hoverModel) return
        switch (methodType) {
            case 'mouseover':
                this.showUpLoad = true
                break;
            case 'mouseout':
                this.showUpLoad = false
                break;
        }

    }
    /** 
     * 模拟点击 input file
    */
    private handleUpload () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        document.getElementById('uploader').click()
    }
    private handleSelectImage (fileForm: any) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this
        const fileDetail = fileForm.target.files[0]
        const filePathName = FileType.getFilePathName(fileDetail.name)
        if (['jpg','jpeg','png'].includes(filePathName)) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(fileDetail)
            fileReader.onloadend = function () {
                const dataURL = fileReader.result
                const blob = FileType.dataURItoBlob(dataURL)
                that.$emit('uploadRequest', blob)
            }
        }else {
            console.log("error upload")
        }
    }
}
</script>
<style lang="scss" scoped>
.icon-container {
    width: 100%;
    height: 100%;
    position: relative;
    margin: 0 auto;
}
.icon {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.hover-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.image-uploader {
    display: none;
}
.upload-area {
    font-size: 10px;
    color: white;
    font-weight: 500;
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, .2);
    &-content {
        width: 100%;
        position: absolute;
        bottom: 10px;
        z-index: 50;
        font-weight: 500;
        border-radius: 50%;
        cursor: pointer;
    }
}
</style>
