<template>
    <transition name="fadeIn">
        <div class="flex-column-center dialog-mask" @click="handleMaskState" v-if="showDialog">
            <div class="dialog-main" v-show="dialogState == 1">Login</div>
            <div class="dialog-main" v-show="dialogState == 2">Register</div>
        </div>
    </transition>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Getter, Action } from "vuex-class";
@Component({})
export default class LoginOrRegister extends Vue {
  public showDialog = false;
  public dialogState = 1;
  created() {
    // @ts-ignore
    this.$event.on("changeLoginDialogState", () => {
      this.showDialog = !this.showDialog;
    });
  }
  private handleMaskState() {
    this.showDialog = !this.showDialog;
  }
  private _initState() {}
}
</script>
<style lang="scss" scoped>
.dialog-mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 30;
}
.dialog-main {
  background-color: white;
}
</style>


