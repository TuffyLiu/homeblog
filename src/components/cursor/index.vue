<template>
<div class="cursor" ref="cursor">
    <div class="cursor-inner">

    </div>
</div>
</template>
<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
import {
    TweenMax
} from 'gsap';
interface PosConfig {
    x: number;
    y: number;
}
interface WinConfig {
    width: number;
    height: number;
}

@Component({
    filters: {
        // character: Filters.character
    },
    components: {}
})
export default class MyCursor extends Vue {
    private mousepos: PosConfig = {
        x: 0,
        y: 0
    };
    private winsize: WinConfig = {
        width: 0,
        height: 0
    };
    private cursor!: any;
    private created() {
        window.addEventListener('resize', this.calcWinsize);
        // window.addEventListener('mousemove', this.onMousemove);
    }
    private mounted() {
        this.cursor = this.$refs.cursor;
    }
    private onMousemove(ev: any): void {
        const body = document.body;
        const docEl = document.documentElement;
        // console.log(ev);
        let posx = 0;
        let posy = 0;
        if (!ev) {
            ev = window.event;
        }
        if (ev.pageX || ev.pageY) {
            posx = ev.pageX;
            posy = ev.pageY;
        } else if (ev.clientX || ev.clientY) {
            posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
            posy = ev.clientY + body.scrollTop + docEl.scrollTop;
        }
        this.mousepos = {
            x: posx,
            y: posy
        };
        // console.log(this.cursor)
        TweenMax.set(this.cursor, {
            x: this.mousepos.x - 12,
            y: this.mousepos.y - 12
        });
    }
    private calcWinsize(): void {
        this.winsize = {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
}
</script>

<style lang="scss">
@import "index.scss";
</style>
