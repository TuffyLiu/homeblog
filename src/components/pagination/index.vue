<template>
<ul class="pagination" v-if="count > 1">
    <li class="item" :class="{disable: !canPrev}" @click="onClickPrev">{{prevText}}</li>
    <li class="item" :class="{current: (index + 1) === pageActive}" @click="onClickPage(index + 1)" v-for="(item, index) in pages">{{ index + 1}}</li>
    <li class="item" :class="{disable: !canNext}" @click="onClickNext">{{nextText}}</li>
</ul>
</template>
<script lang="ts">
import {
    Component,
    Vue,
    Prop,
    Watch
} from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
    private pageActive: number = 1;
    @Prop({
        required: false,
        default: 1
    }) private value!: number;
    @Prop({
        required: false,
        default: 5
    }) private itemsPerPage!: number;
    @Prop({
        required: true
    }) private totalItems!: number;
    @Prop({
        required: false,
        default: 'Prev'
    }) private prevText!: string;
    @Prop({
        required: false,
        default: 'Next'
    }) private nextText!: string;

    get canPrev() {
        return this.pageActive > 1;
    }
    get canNext() {
        return this.pageActive < this.count;
    }
    get count() {
        return Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
    }
    get pages() {
        return new Array(this.count);
    }
    @Watch('pageActive') private onPageActiveChange(val: number) {
        this.pageActive = val;
        this.$emit('change', val);
    }
    private onClickPrev(): void {
        if (this.canPrev) {
            this.pageActive--;
        }
    }
    private onClickNext(): void {
        if (this.canNext) {
            this.pageActive++;
        }
    }
    private onClickPage(page: number): void {
        this.pageActive = page;
    }
}
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
