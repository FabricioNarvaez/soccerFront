<template>
    <SwiperComponent />
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="lg:col-span-2"> 
            <NextMatchDay />
        </div>
        <div class="lg:col-span-1">
            <GroupsTables :isSmallTable="true"/>
        </div>
    </div>
</template>

<script setup>
    import { useTeamsStore } from '@store/teamsStore.js';
    import SwiperComponent from '@components/home/SwiperComponent.vue';
    import NextMatchDay from '@components/home/NextMatchDay.vue';
    import GroupsTables from '@components/common/GroupsTables.vue';

    const teamsStore = useTeamsStore();
    teamsStore.getAllTeams();
</script>
