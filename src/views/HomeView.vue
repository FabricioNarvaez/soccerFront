<template>
    <HeaderSubtitle :subtitle="'Equipos'" :link="'/equipos'" :linkText="'TODOS LOS EQUIPOS'" />
    <p v-if="teamsStore.loading" class="subtitle">Aún no hay equipos en el torneo</p>
    <SwiperComponent v-else :allTeams="teamsStore.allTeams" />
    <!-- <Carousel /> -->
    <div class="homeMain">
        <NextMatchDay :upcomingMatchweek="upcomingMatchweek"/>
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
    const teamsStore = useTeamsStore();

    import { ref, onMounted } from "vue";
    const APIUrl = import.meta.env.VITE_API_URL;

    const upcomingMatchweek = ref(false);
    const currentDate = ref('');

    onMounted(async () => {
        try {
            const [matchWeeksResponse] = await Promise.all([
                fetch(`${APIUrl}/matchweek/all`)
            ]) ;
            
            const [matchWeekDataResult] = await Promise.all([
                matchWeeksResponse.json()
            ]);

            upcomingMatchweek.value = matchWeekDataResult.find(matchWeek => matchWeek.date > currentDate.value);
            // TODO: Eliminar estas dos líneas de abajo una vez se tengan más jornadas
            upcomingMatchweek.value.matches = upcomingMatchweek.value.matches.concat(upcomingMatchweek.value.matches);
            upcomingMatchweek.value.matches = upcomingMatchweek.value.matches.concat(upcomingMatchweek.value.matches);
            
            if(upcomingMatchweek.value.matches){
                const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                for(let match of upcomingMatchweek.value.matches){
                    const targetDate = new Date(match.hour);
                    const [formattedDateHelper, formattedHourHelper] = targetDate.toLocaleDateString('es-ES', options).split(',');
                    match.formattedDate = formattedDateHelper.split(' de').join(' ');
                    match.formattedHour = formattedHourHelper;
                }
            }
            
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    })
</script>

<style setup>
    @import "@css/home/home.css";
</style>