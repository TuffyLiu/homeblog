<template>
<div class="banner" :class="{right: postion === 'right'}">
    <template id="right" v-if ="postion === 'right'">
        <div class="banner-detail">
            <div class="detail-box">
                <p class="title">{{title}}</p>
                <p class="sub-title" v-html="subTitleHtml"></p>
            </div>
        </div>
        <figure class="banner-img">
            <!-- <img class="img" :src="imgUrl" alt=""> -->
            <div class="img-box" :style="imgUrlStyle"></div>
            <router-link tag="div" class="btn-more" :to="{name: 'BlogDetail', params: {id: id} }">
                <span class="btn-txt">LEARN MORE</span>
                <span class="btn-ico">
                    <svg viewBox="0 0 14 19" class="btn-svg"><path d="M3.85 18l6.3-5.968L12.4 9.9l-2.25-2.132L3.85 1.8 1.6 3.932 7.9 9.9l-6.3 5.968z" fill="#FFF" stroke="#FFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </span>
            </router-link>
        </figure>
    </template>
    <template id="left" v-else>
        <figure class="banner-img">
            <!-- <img class="img" :src="imgUrl" alt=""> -->
            <div class="img-box" :style="imgUrlStyle"></div>
            <router-link tag="div" class="btn-more" :to="{name: 'BlogDetail', params: {id: id} }">
                <span class="btn-txt">LEARN MORE</span>
                <span class="btn-ico">
                    <svg viewBox="0 0 14 19" class="btn-svg"><path d="M3.85 18l6.3-5.968L12.4 9.9l-2.25-2.132L3.85 1.8 1.6 3.932 7.9 9.9l-6.3 5.968z" fill="#FFF" stroke="#FFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </span>
            </router-link>
        </figure>
        <div class="banner-detail">
            <div class="detail-box">
                <p class="title">{{title}}</p>
                <p class="sub-title" v-html="subTitleHtml"></p>
            </div>
        </div>
    </template>

</div>
</template>
<script lang="ts">
import {
    Component,
    Vue,
    Prop
} from 'vue-property-decorator';

@Component
export default class BannerHome extends Vue {
    @Prop({ required: false }) private postion!: string;
    @Prop({ required: true }) private title!: string;
    @Prop({ required: true }) private subTitle!: string;
    @Prop({ required: false }) private mark!: string;
    @Prop({ required: true }) private imgUrl!: string;
    @Prop({ required: true }) private id!: string;
    get imgUrlStyle() {
        return `background-image: url(${this.imgUrl})` ;
    }
    get subTitleHtml() {
        return this.mark ? this.subTitle.replace(new RegExp(this.mark, 'g'), `<span>${this.mark}</span>`) : this.subTitle;
    }
}
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
<style lang="scss">
@import "../../assets/scss/var.scss";
.banner{
    .sub-title {
        span{
            color: $pink-color;
            margin: 0 6px;
        }
    }
}
</style>
