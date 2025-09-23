<template>
    <div class="leftMain">
        <HeaderSubtitle :subtitle="'Próxima Jornada'" :link="'/'" :linkText="'TODAS LAS JORNADAS'" />
        <div class="flexSpaceAround">
            <div class="matchOfMatchweekContainer" v-if="matchWeeksStore.upcomingMatchweek" v-for="(match, key) in matchWeeksStore.upcomingMatchweek.matches" :key="key">
                <div class="matchTeams">
                    <div class="localInfo">
                        <img class="matchTeamsImg" :src="match.localId.shield" />
                        <p>{{ match.localId.name }}</p>
                    </div>
                    <p class="versus">VS</p>
                    <div class="visitorInfo">
                        <img class="matchTeamsImg" :src="match.visitorId.shield" />
                        <p>{{ match.visitorId.name }}</p>
                    </div>
                </div>
                <div class="matchHour">{{ match.formattedDate }} | {{ match.formattedHour }} </div>
            </div>
            <p v-else class="subtitle">Las jornadas aún no están definidas</p>
        </div>
    </div>
</template>

<script setup>
    import HeaderSubtitle from '@components/common/HeaderSubtitle.vue';
    
    import { useMatchWeeksStore } from '@/store/matchWeeksStore';
    const matchWeeksStore = useMatchWeeksStore();
</script>

<style>
    @import "@css/home/NextMatchDay.css";
</style>