<template>
    <div class="flex-column-y-center footer-page">
        <div class="flex-row-y-center beian">
            <a href="http://www.beian.miit.gov.cn/" target="_blank">京ICP备 20020980号</a>
            <!-- <img src="https://yuegeqiu-mario.oss-cn-beijing.aliyuncs.com/beian.png"/> -->
        </div>
        <div class="width-100 contact-us">联系: 马加奥<a @click="handleCopy" @dblclick="handleCopy" class="email">mario528@163.com</a></div>
        <!-- textarea 隐藏复制 -->
        <textarea id="copy-container" ref="copy" />

    </div >
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Toast } from '@/utils/index'
@Component({})
export default class Footer extends Vue {
    private handleCopy () {
        const copyContainer = this.$refs.copy
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        copyContainer.value = 'mario528@163.com'
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        copyContainer.select()
        document.execCommand("copy");
        Toast.showToastSuccess.call(this, '复制成功')
    }
}
</script>
<style lang="scss" scoped>
.footer-page {
  box-sizing: border-box;
  width: 100%;
  height: 8vh;
  padding: 0 5vw;
  background-color: $base_color;
  color: $base_font_color;
  position: relative;
  overflow: hidden;
}
.beian {
    img {
        width: 20px;
        height: 20px;
    }
    a {
        margin-left: 10px;
        text-decoration: none;
        font-size: 12px;
        color: white;
    }
}
.contact-us {
    font-size: 12px;
    color: white;
    font-weight: 500;
    margin-top: 10px;
}
.email {
    margin-left: 10px;
    color: white;
}
#copy-container {
    position: absolute;
    left: 0;
    bottom: -100vh;   
}
@media screen and (max-width: 450px){
    
}
@media screen and (min-width: 451px){
    .beian {
        margin: 0 auto;
    }
    .contact-us {
        text-align: center;
    }
}
</style>

