<template>
    <div class="page">
       <transition name="">
            <img class="up-arrow" :src="iconUrl" @click="backToTop"/>
       </transition>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Getter, Action, State } from 'vuex-class'
@Component({})
export default class UpArrow extends Vue {
    public iconUrl: string = require('../assets/up_arrow.png');
    private backToTop () {
        console.log(document.documentElement.scrollTop);
    }
}
</script>
<style lang="scss" scoped>
.up-arrow {
    cursor: pointer;
    width: 80px;
    height: 70px;
    position: fixed;
    right: calc(2.5vw - 40px);
    bottom: 20vh;
    &:hover {
        transform: scaleY(1.15);
    }
}
</style>
