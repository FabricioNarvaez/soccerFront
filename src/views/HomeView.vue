<template>
    <HeaderSubtitle :subtitle="'Equipos'" :link="'/equipos'" :linkText="'TODOS LOS EQUIPOS'" />
    <SwiperComponent />
    <div class="homeMain">
        <NextMatchDay />
        <GroupsTables v-if="teamsStore.allGroups.A || teamsStore.allGroups.B" :groupA="teamsStore.allGroups.A" :groupB="teamsStore.allGroups.B" :isSmallTable="true"/>
        <!-- TODO: Añadir v-else con imagen que diga que no hay clasificaciones -->
    </div>
</template>

<script setup>
    import HeaderSubtitle from '@components/common/HeaderSubtitle.vue';
    import SwiperComponent from '@components/home/SwiperComponent.vue';
    import NextMatchDay from '@components/home/NextMatchDay.vue';
    import GroupsTables from '@components/common/GroupsTables.vue';
    import { useTeamsStore } from '@store/teamsStore.js';

    const teamsStore = useTeamsStore();
</script>

<style setup>
    @import "@css/home/home.css";
</style>