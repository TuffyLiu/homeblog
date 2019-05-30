<template>
<div class="blog-detail">
    <banner-blog :title="title" :subTitle="mark" :imgUrl="banner"></banner-blog>
    <article class="container" ref="container" v-html="blogDetail">

    </article>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
import BannerBlog from '@/components/banner-blog/index.vue';
import hljs from 'highlight.js';
// import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/github.css';
@Component({
    components: {
        BannerBlog
    }
})
export default class BlogDetail extends Vue {
    private title: string = '';
    private mark: string = '';
    private banner: string = '';
    private id: string = '';
    private blogDetail: string = '';
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
            const data = res.data.filter((item: any) => {
                return item.id === this.id;
            })[0];
            this.title = data.title;
            this.mark = data.mark;
            this.banner = data.banner;
            this.showHighCode();
        });
    }
    private showHighCode(): void {
        this.$nextTick(() => {
            setTimeout(() => {
                const list = document.querySelectorAll('pre code');
                list.forEach((block: any) => {
                    hljs.highlightBlock(block);
                });
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
    }
    iframe {
        border: none;
    }
}
</style>
