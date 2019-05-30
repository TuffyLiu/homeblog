<template>
<div class="about-container">
    <heading>About</heading>
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
