<!--
 * @Author: majiaao
 * @Date: 2020-05-12 19:12:55
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-12 23:40:57
 * @Description: file content
 -->
 <template>
    <div class="mask" v-show="showDialog" @click="hide">
        <transition name="slide-fade">
            <div class="flex-column-x-center side-bar-container" v-show="showDialog">
              <div class="width-100 header">
                <slot name="header"></slot>
              </div>
              <div class="width-100 content">
                <slot name="content"></slot>
              </div>
              <div class="width-100 footer">
                <slot name="footer"></slot>
              </div>
            </div>
        </transition>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class SideDialogByCommon extends Vue {
  @Prop({ default: false }) showDialog!: boolean;
  private hide () {
    this.$emit('closeShowDialog')
  }
}
</script>
<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
}
.side-bar-container {
  width: 30vw;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
  transition: all .5s ease;
}
.header, .content, .footer {
  box-sizing: border-box;
  padding: 20px 5%; 
}
</style>


 
 
 