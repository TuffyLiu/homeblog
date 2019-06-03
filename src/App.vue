<template>
  <div id="app">
    <my-header />
    <main class="main">
        <keep-alive exclude="BlogDetail">
            <router-view :key="$route.path" />
        </keep-alive>
    </main>
    <my-footer />
  </div>
</template>
<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
import MyHeader from '@/components/header/index.vue';
import MyFooter from '@/components/footer/index.vue';

@Component({
    filters: {
    },
    components: {
        MyHeader,
        MyFooter
    }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "App.scss";
</style>
