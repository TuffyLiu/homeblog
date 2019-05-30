<template>
<div class="blog-container">
    <heading>Blog</heading>
    <blog-item v-for="(blog,index) in data" :id="blog.id" :key="'blog' + index" :title="blog.title" :subTitle="blog.subTitle" :imgUrl="blog.banner" :date="blog.date"></blog-item>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
import Heading from '@/components/heading/index.vue';
import BlogItem from '@/components/blog-item/index.vue';

@Component({
    components: {
        Heading,
        BlogItem
    }
})
export default class Blog extends Vue {
    private data: any = [];
    private title: string = 'week 的踩坑之旅';
    private subTitle: string = 'week填不完的坑';
    private date: string = '05/05/2015';
    private imgUrl: string = 'https://hbimg.huabanimg.com/d81cf602d4a9e477de3a5d5ae16ba4e2068a131f16921-smAmuV_fw658';
    private created() {
        this.getBlogData();
    }
    private getBlogData(): void {
        this.$axios.get('/data/blog.json').then((res: any) => {
            this.data = res.data;
        });
    }
}
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
