<template>
<div class="cook-container">
    <heading>Cook</heading>
    <div class="container">
        <div class="stacks-wrapper" ref="stacksWrapper">
            <div class="stack" v-for="(stack, index) in data" :key="'stack' + index">
                <figure class="figure-layout" :style="'grid-area:'  + figure.gridArea" v-for="(figure, i) in stack" :key="'figure' + i">
                    <div class="img-box" :style="'background-image: url(' +  figure.picture  +')'"></div>
                    <figcaption>
                        <h3 class="title">{{figure.title}}</h3>
                        <p class="sub-title">{{figure.subTitle}}</p>
                    </figcaption>
                </figure>
            </div>
        </div>
        <div class="btn next-btn" @click="clickNextBtn"></div>
        <div class="btn prev-btn disable" @click="clickPrevBtn"></div>
    </div>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
import Heading from '@/components/heading/index.vue';
import Flickity from 'flickity';
@Component({
    components: {
        Heading
    }
})
export default class Cook extends Vue {
    private imgUrl: string = require('../../assets/img/stock-photo-134067119.jpg');
    private data: any = [];
    private selectedIndex: number = 0;
    private stacksWrapper!: any;
    private stacks!: any;
    private flky!: any;
    private created() {
        this.getCookData();
    }
    private createSlider(): void {
        this.stacksWrapper = this.$refs.stacksWrapper;
        this.stacks = this.stacksWrapper.querySelectorAll('.stack');
        // this.loadImg(0);
        if (this.stacks[1]) {
            this.stacks[1].classList.add('stack-next');
            this.stacks[this.stacks.length - 1].classList.add('stack-prev');
            // this.loadImg(1);
            // this.loadImg(this.stacks.length - 1);
        }

        this.flky = new Flickity(this.stacksWrapper, {
            wrapAround: true,
            imagesLoaded: true,
            initialIndex: 0,
            setGallerySize: false,
            pageDots: false,
            prevNextButtons: false
        });

        this.flky.on('cellSelect', () => {
            const prevStack = this.stacksWrapper.querySelector('.stack-prev');
            const nextStack = this.stacksWrapper.querySelector('.stack-next');
            const selidx = this.flky.selectedIndex;
            const cellsCount = this.flky.cells.length;
            const previdx = selidx > 0 ? selidx - 1 : cellsCount - 1;
            const nextidx = selidx < cellsCount - 1 ? selidx + 1 : 0;
            if (prevStack) {
                prevStack.classList.remove('stack-prev');
            }
            if (nextStack) {
                nextStack.classList.remove('stack-next');
            }
            this.stacks[previdx].classList.add('stack-prev');
            this.stacks[nextidx].classList.add('stack-next');
        });
    }
    private clickNextBtn(): void {
        this.flky.next(true);
    }
    private clickPrevBtn(): void {
        this.flky.previous(true);
    }
    private getCookData(): void {
        this.$axios.get('/data/cook.json').then((res: any) => {
            this.data = res.data;
            this.$nextTick(() => {
                this.createSlider();
            });
        });
    }
}
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
