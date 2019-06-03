<template>
<div class="about-container">
    <heading>About</heading>
    <div class="container">
        <div class="box-img">
            <img src="../../assets/img/user.jpg" alt="">
        </div>
        <div class="box-detail">
            <h3>Tuffy - 阿胐</h3>
            <p>Front End Engineer  / ShenZhen.China</p>
            <p>361329912@qq.com  / +8618807800463</p>
            <p>霍山有兽焉，装如狸，而白尾有鬣，</p>
            <p>名曰胐胐，养之可以已忧。</p>
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
