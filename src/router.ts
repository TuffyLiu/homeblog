import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home/index.vue';
import Photo from './views/photo/index.vue';
import About from './views/about/index.vue';
import Blog from './views/blog/index.vue';
import Cook from './views/cook/index.vue';
import BlogDetail from './views/blog-detail/index.vue';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/photo',
            name: 'Photo',
            component: Photo
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/blog',
            name: 'Blog',
            component: Blog
        },
        {
            path: '/cook',
            name: 'Cook',
            component: Cook
        },
        {
            path: '/blog-detail/:id',
            name: 'BlogDetail',
            component: BlogDetail
        },
        {
            path: '*',
            redirect: {
                name: 'Home'
            }
        }
    ],
    scrollBehavior: (to, from, savedPosition) => {
        console.log(from.name);
        if (savedPosition && to.meta.keepAlive) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(savedPosition);
                    console.log('scrollBehavior');
                }, 0);
            });
        } else {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ x: 0, y: 0 });
                }, 0);
            });
        }
    }
});
