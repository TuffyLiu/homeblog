<template>
<div class="about-container">
    <heading>About</heading>
    <div class="container">
        <div class="box-img">
            <img src="../../assets/img/user.jpg" alt="">
        </div>
        <div class="box-detail">
            <h3>Tuffy</h3>
            <p>ShenZhen.China</p>
            <p>+86 18807800463</p>
            <p>361329912@qq.com</p>
            <p>Front End Engineer</p>
        </div>

    </div>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
import Heading from '@/components/heading/index.vue';

@Component({
    components: {
        Heading
    }
})
export default class About extends Vue {
}
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
