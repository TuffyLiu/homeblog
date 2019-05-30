<template>
    <section class="banner-blog">
        <h3 class="title">{{title}}</h3>
        <div class="img-box" :style="imgUrlStyle"></div>
        <p class="sub-title">{{subTitle}}</p>
    </section>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Prop
} from 'vue-property-decorator';

@Component
export default class BannerBlog extends Vue {
    @Prop({ required: true }) private title!: string;
    @Prop({ required: true }) private subTitle!: string;
    @Prop({ required: true }) private imgUrl!: string;
    get imgUrlStyle() {
        return `background-image: url(${this.imgUrl})` ;
    }
}
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
