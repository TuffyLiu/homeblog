<template>
<div class="photo-container" :class="{'view-full' : showFull}">
    <!-- <heading>Photo</heading> -->
    <div class="photo-bg"></div>
    <div class="stack-slider" @click="clickSlider" :style="{height: clientHeight}">
        <div class="stacks-wrapper" ref="stacksWrapper">
            <div class="stack" v-for="(stack, index) in data" :key="'stack' + index">
                <h2 class="stack-title" ><span class="title-span">{{stack.setName}}</span></h2>
                <div class="item" v-for="(photo , j) in stack.photos" :key="'photo' + j">
                    <div class="content">
                        <img :src="(showList[index] ? photo.url : imgUrl )" :alt="photo.title">
                        <h3>{{photo.title}} <span class="item__date">{{photo.date}}</span></h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
import Heading from '@/components/heading/index.vue';
import BannerHome from '@/components/banner-home/index.vue';
import Flickity from 'flickity';

@Component({
    components: {
        Heading,
        BannerHome
    }
})
export default class Photo extends Vue {
    private imgUrl: string = require('../../assets/img/stock-photo-134067119.jpg');
    private flky!: any;
    private stacks!: any;
    private stacksWrapper!: any;
    private showFull: boolean = false;
    private canOpen: boolean = true;
    private clientHeight: string = '300px';
    private data: any = [];
    private showList: any = [true, true, true];
    private created() {
        this.getPhotoData();
    }
    private createSlider(): void {
        this.stacksWrapper = this.$refs.stacksWrapper;
        this.stacks = this.stacksWrapper.querySelectorAll('.stack');
        this.stacks[1].classList.add('stack-next');
        this.stacks[this.stacks.length - 1].classList.add('stack-prev');

        this.flky = new Flickity(this.stacksWrapper, {
            wrapAround: true,
            imagesLoaded: true,
            initialIndex: 0,
            setGallerySize: false,
            pageDots: false,
            prevNextButtons: false,
            lazyLoad: 2
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
            this.showStack(this.stacks[selidx]);
            this.showList[selidx] = true;
            this.showList[previdx] = true;
            this.showList[nextidx] = true;
            this.showList = [].concat(this.showList);
        });

        this.flky.on('dragStart', () => {
            this.canOpen = false;
        });

        this.flky.on('settle', () => {
            this.canOpen = true;
        });
    }
    private clickSlider(e: any): any {
        const target = e.target;
        if (!target.classList.contains('title-span') || !this.canOpen) {
            return false;
        }
        const offsetParent = target.parentElement.parentElement;
        if (offsetParent.classList.contains('is-selected')) {
            this.showFull = !this.showFull;
            this.showStack(offsetParent);
        } else if (offsetParent.classList.contains('stack-next')) {
            this.nextStack();
        } else if (offsetParent.classList.contains('stack-prev')) {
            this.prevStack();
        }
    }
    private showStack(stack: any): void {
        if (this.showFull) {
            this.clientHeight = stack.clientHeight + 'px';
        } else {
            this.clientHeight = '300px';
        }
    }
    private nextStack(): void {
        this.flky.next(true);
    }
    private prevStack(): void {
        this.flky.previous(true);
    }
    private getPhotoData(): void {
        this.$axios.get('/data/photo.json').then((res: any) => {
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
