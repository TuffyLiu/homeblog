<template>
  <div id="app">
    <my-header />
    <main class="main">
        <keep-alive exclude="BlogDetail">
            <router-view/>
        </keep-alive>
    </main>
    <my-footer />
    <!-- <my-cursor /> -->
  </div>
</template>
<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
import MyHeader from '@/components/header/index.vue';
import MyFooter from '@/components/footer/index.vue';
// import MyCursor from '@/components/cursor/index.vue';

@Component({
    filters: {
        // character: Filters.character
    },
    components: {
        MyHeader,
        MyFooter
        // MyCursor
    }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "App.scss";
</style>
