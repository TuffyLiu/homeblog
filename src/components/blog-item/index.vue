<template>
<router-link tag="div" :to="{name: 'BlogDetail', params: {id: id} }" class="blog-item">
    <div class="img-box" :style="imgUrlStyle"></div>
    <div class="detail">
        <h3 class="title"> {{title}}<span class="date">{{date}}</span></h3>
        <p class="sub-title">{{subTitle}}</p>
    </div>
</router-link>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Prop
} from 'vue-property-decorator';

@Component
export default class BlogItem extends Vue {
    @Prop({ required: true }) private title!: string;
    @Prop({ required: true }) private subTitle!: string;
    @Prop({ required: true }) private imgUrl!: string;
    @Prop({ required: true }) private date!: string;
    @Prop({ required: true }) private id!: string;
    get imgUrlStyle() {
        return `background-image: url(${this.imgUrl})` ;
    }
}
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
