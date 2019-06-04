<template>
<div class="blog-detail">
    <banner-blog :title="title" :subTitle="tip" :imgUrl="banner"></banner-blog>
    <article class="container" ref="container" v-html="blogDetail">
    </article>
    <h3 class="other"><span>Orthers</span></h3>
    <div class="row">
        <router-link tag="div" :key="blog.id" :to="{name: 'BlogDetail', params: {id: blog.id} }" class="block" v-for="blog in blogList">
            <img :src="blog.banner" alt="">
            <p>{{blog.title}}</p>
        </router-link>
    </div>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
import BannerBlog from '@/components/banner-blog/index.vue';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

// hljs.initHighlightingOnLoad();
@Component({
    name: 'BlogDetail',
    components: {
        BannerBlog
    }
})
export default class BlogDetail extends Vue {
    private title: string = '';
    private tip: string = '';
    private banner: string = '';
    private id: string = '';
    private blogDetail: string = '';
    private blogList: any = [];
    private created() {
        this.id = this.$route.params.id;
        this.getBlogData();
        this.getBlogDetail();
    }
    private getBlogDetail(): void {
        this.$axios.get(`/data/blogs/${this.id}.html`).then((res: any) => {
            this.blogDetail = res.data;
        });
    }
    private getBlogData(): void {
        this.$axios.get('/data/blog.json').then((res: any) => {
            const dataIndex = res.data.findIndex((item: any) => {
                return item.id === this.id;
            });

            this.blogList = res.data.slice(dataIndex + 1, dataIndex + 4);
            this.blogList = this.blogList.concat(res.data.slice(0, Math.max(3 - this.blogList.length, 0)));

            const data = res.data[dataIndex];
            this.title = data.title;
            this.tip = data.tip;
            this.banner = data.banner;
            this.showHighCode();
        });
    }
    private showHighCode(): void {
        this.$nextTick(() => {
            setTimeout(() => {
                Prism.highlightAll();
            }, 100);
        });
    }

}
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
<style lang="scss">
.container {
    section {
        margin-bottom: 20px;
    }
    p {
        line-height: 1.5;
        font-size: 15px;
        margin-bottom: 8px;
        // white-space:pre-wrap;
    }
    iframe {
        border: none;
    }
    img {
        width: 100%;
        height: auto;
    }
    h3 {
        margin-bottom: 6px;
        margin-top: 15px;
    }
}
</style>
