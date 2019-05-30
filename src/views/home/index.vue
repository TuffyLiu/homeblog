<template>
<div class="home-container">
    <heading>Home</heading>
    <banner-home :key="item.id"  :postion="index === 0 ? 'left' : 'right'" v-for="(item, index) in data" :imgUrl="item.banner" :title="item.title" :subTitle="item.subTitle" :id="item.id" ></banner-home>
    <!-- <banner-home :imgUrl="imgUrl" title="vue + typescript 的初次尝试" subTitle="vue-cli 3.0 的新创建模版中已经可以实现typescript项目构建。" mark="typescript" postion="right"></banner-home> -->
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
import Heading from '@/components/heading/index.vue';
import BannerHome from '@/components/banner-home/index.vue';

@Component({
    components: {
        Heading,
        BannerHome
    }
})
export default class Home extends Vue {
    private imgUrl: string = require('../../assets/img/stock-photo-134067119.jpg');
    private data: any = [];
    private created() {
        this.getBlogData();
    }
    private getBlogData(): void {
        this.$axios.get('/data/blog.json').then((res: any) => {
            this.data = res.data.slice(0, 2);
            console.log(this.data);
        });
    }
}
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
