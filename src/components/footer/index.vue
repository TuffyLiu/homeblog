<template>
<footer class="footer">
    <div class="footer-links">
        <ul class="links">
            <li><router-link tag="a" :to="{name: 'Home'}">Home</router-link></li>
            <li><router-link tag="a" :to="{name: 'Blog'}">Blog</router-link></li>
            <li><router-link tag="a" :to="{name: 'Photo'}">Photo</router-link></li>
            <li><router-link tag="a" :to="{name: 'Cook'}">Cook</router-link></li>
        </ul>
        <ul class="links">
            <li><a href="https://github.com/TuffyLiu" target="_blank"  rel="noopener noreferrer">Github</a> </li>
            <li><a href="https://www.qdfuns.com/u/17942.html" target="_blank"  rel="noopener noreferrer">Qdfuns</a></li>
            <li><a href="https://www.instagram.com/tuffy_liu/" target="_blank"  rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://weibo.com/u/1816255453?refer_flag=1005055010" target="_blank"  rel="noopener noreferrer">Weibo</a></li>
        </ul>
        <router-link  :to="{name: 'Home'}">
             <img class="logo" alt="tuffy logo" src="../../assets/logo.png">
        </router-link>
    </div>
    <p class="copy-right">COPYRIGHT © 2019–2029 TUFFY-阿胐</p>

</footer>
</template>
<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
