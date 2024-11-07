<template>
    <main>
        <HeaderSubtitle :subtitle="'Equipos'" :link="'/equipos'" :linkText="'TODOS LOS EQUIPOS'" />
        <SwiperComponent v-if="swiperReady" :allTeams="allTeams" />
        <p v-else class="subtitle">Aún no hay equipos en el torneo</p>
        <!-- <Carousel /> -->
        <div class="homeMain">
            <NextMatchday :upcomingMatchweek="upcomingMatchweek"/>
            <GroupsTables v-if="allTeams.A || allTeams.B" :groupA="allTeams.A" :groupB="allTeams.B" :isSmallTable="true"/>
            <!-- TODO: Añadir v-else con imagen que diga que no hay clasificaciones -->
        </div>
    </main>
</template>

<script setup>
    // import Carousel from '../components/home/Carousel.vue'
    import HeaderSubtitle from '../components/common/HeaderSubtitle.vue';
    import SwiperComponent from '../components/home/SwiperComponent.vue';
    import NextMatchday from '../components/home/NextMatchday.vue';
    import GroupsTables from '../components/common/GroupsTables.vue';

    import { ref, onMounted } from "vue";
    const APIUrl = import.meta.env.VITE_API_URL;

    const swiperReady = ref(false);
    const upcomingMatchweek = ref(false);
    const allTeams = ref({});
    const currentDate = ref('');

    onMounted(async () => {
        try {
            const [allTeamsResponse, matchWeeksResponse] = await Promise.all([
                fetch(`${APIUrl}/teams/all`),
                fetch(`${APIUrl}/matchweek/all`)
            ]) ;
            
            const [teamDataResult, matchWeekDataResult] = await Promise.all([
                allTeamsResponse.json(),
                matchWeeksResponse.json()
            ]);

            allTeams.value = teamDataResult;
            upcomingMatchweek.value = matchWeekDataResult.find(matchWeek => matchWeek.date > currentDate.value);
            if(upcomingMatchweek.value.matches){
                const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                for(let match of upcomingMatchweek.value.matches){
                    const targetDate = new Date(match.hour);
                    const [formattedDateHelper, formattedHourHelper] = targetDate.toLocaleDateString('es-ES', options).split(',');
                    match.formattedDate = formattedDateHelper.split(' de').join(' ');
                    match.formattedHour = formattedHourHelper;
                }
            }
            if(Object.keys(allTeams.value.A).length || Object.keys(allTeams.value.B).length ) swiperReady.value = true;
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    })
</script>

<style setup>
    @import "../assets/css/home/home.css";
</style>