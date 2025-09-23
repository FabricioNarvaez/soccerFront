<template>
    <HeaderSubtitle :subtitle="'Equipos'" :link="'/equipos'" :linkText="'TODOS LOS EQUIPOS'" />
    <p v-if="teamsStore.loading" class="subtitle">Aún no hay equipos en el torneo</p>
    <SwiperComponent v-else :allTeams="teamsStore.allTeams" />
    <!-- <Carousel /> -->
    <div class="homeMain">
        <NextMatchDay :upcomingMatchweek="matchWeeksStore.upcomingMatchweek"/>
        <GroupsTables v-if="teamsStore.allTeams.A || teamsStore.allTeams.B" :groupA="teamsStore.allTeams.A" :groupB="teamsStore.allTeams.B" :isSmallTable="true"/>
        <!-- TODO: Añadir v-else con imagen que diga que no hay clasificaciones -->
    </div>
</template>

<script setup>
    // import Carousel from '@components/home/Carousel.vue'
    import HeaderSubtitle from '@components/common/HeaderSubtitle.vue';
    import SwiperComponent from '@components/home/SwiperComponent.vue';
    import NextMatchDay from '@components/home/NextMatchDay.vue';
    import GroupsTables from '@components/common/GroupsTables.vue';
    import { useTeamsStore } from '@store/teamsStore.js';
    import { useMatchWeeksStore } from '@/store/matchWeeksStore';

    const teamsStore = useTeamsStore();
    const matchWeeksStore = useMatchWeeksStore();
</script>

<style setup>
    @import "@css/home/home.css";
</style>