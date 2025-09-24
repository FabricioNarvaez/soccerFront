<template>
    <HeaderSubtitle :subtitle="'Equipos'" :link="'/equipos'" :linkText="'TODOS LOS EQUIPOS'" />
    <SwiperComponent />
    <div class="homeMain">
        <NextMatchDay />
        <GroupsTables :isSmallTable="true"/>
    </div>
</template>

<script setup>
    import HeaderSubtitle from '@components/common/HeaderSubtitle.vue';
    import SwiperComponent from '@components/home/SwiperComponent.vue';
    import NextMatchDay from '@components/home/NextMatchDay.vue';
    import GroupsTables from '@components/common/GroupsTables.vue';
</script>

<style setup>
    @import "@css/home/home.css";
</style>