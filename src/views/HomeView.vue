<template>
    <main>
        <HeaderSubtitle :subtitle="'Equipos'" :link="'/equipos'" :linkText="'TODOS LOS EQUIPOS'" />
        <SwiperComponent v-if="swiperReady" :allTeams="allTeams" />
        <p v-else class="subtitle">Aún no hay equipos en el torneo</p>
        <!-- <Carousel /> -->
        <div class="homeMain">
            <div class="leftMain">
                <HeaderSubtitle :subtitle="'Próxima Jornada'" :link="'/'" :linkText="'TODAS LAS JORNADAS'" />
                <div class="matchOfMatchweekContainer" v-if="upcomingMatchweek" v-for="(match, key) in upcomingMatchweek.matches" :key="key">
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
            <div class="rightMain">
                <p v-if="classifications">tabla clasificaciones</p>
                <p v-else>Las tablas de clasificaciones aún no están definidas.</p>
            </div>
        </div>
    </main>
</template>

<script setup>
    // import Carousel from '../components/home/Carousel.vue'
    import SwiperComponent from '../components/home/SwiperComponent.vue';
    import HeaderSubtitle from '../components/common/HeaderSubtitle.vue';

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
            console.log(upcomingMatchweek.value)
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    })
</script>

<style setup>
    @import "../assets/css/home/home.css";
</style>