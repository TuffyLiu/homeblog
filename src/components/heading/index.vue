<template>
<h2 class="heading"><slot/></h2>
</template>
<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';

@Component
export default class Heading extends Vue {}
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
