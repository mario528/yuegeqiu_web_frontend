<template>
    <div class="flex-column-center dialog-mask" @tap="handleMaskState">
        <div class="dialog-main" v-show="dialogState == 1">
            Login
        </div>
        <div class="dialog-main" v-show="dialogState == 2">
            Register
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Watch,  } from 'vue-property-decorator'
import { State, Getter, Action } from 'vuex-class'
@Component({})
export default class LoginOrRegister extends Vue {
    public showDialog = false;
    public dialogState = 1
    private handleMaskState () {
        this.showDialog = !this.showDialog
    }
    private _initState () {
        
    }
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


