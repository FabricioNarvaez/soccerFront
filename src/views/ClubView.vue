<template>
    <div class="clubBanner"
        :class="{ notPhoto: !hasPhoto }">
        <div class="flexCenterF20 positionAbsolute"
            :class="{ notPhoto2Level: !hasPhoto }">
            <img :src="teamData.shield"/>
            <div class="cardTeamInfo">
                <p><b>{{ teamData.name }}</b></p>
                <p><i>Directivo</i>: {{ teamData.coachName }}</p>
                <p v-if="teamData.group"><i>Grupo</i>: {{ teamData.group }}</p>
            </div>
        </div>
        <div v-if="hasPhoto" :style="{ '--backgroundImage': `url(${teamData.teamPhoto})`, '--backgroundColor': `${teamData.color}`}" class="gradient"></div>
    </div>

    <nav class="clubNav">
        <RouterLink :to="{ path: '/equipo/General', query: { id: id, name: name }}">General</RouterLink>
        <RouterLink :to="{ path: '/equipo/Plantilla', query: { id: id, name: name }}">Plantilla</RouterLink>
        <RouterLink :to="{ path: '/equipo/Resultados', query: { id: id, name: name }}">Resultados</RouterLink>
        <RouterLink :to="{ path: '/equipo/Sanciones', query: { id: id, name: name }}">Sanciones</RouterLink>
    </nav>

    <GeneralInfo v-if="actualPath === 'General' && teamData" :teamData="teamData" :nextMatchInfo="nextMatchInfo"/>
    <p v-else class="WIP">Esta sección está en desarrollo. En breve, estará disponible.</p>
</template>

<script setup>
    import { ref, watch, onMounted } from "vue";
    import { useRoute } from 'vue-router';
    import GeneralInfo from '../components/club/GeneralInfo.vue';

    const APIUrl = import.meta.env.VITE_API_URL;
    const route = useRoute();

    const id = route.query.id;
    const name = route.query.name;
    const actualPath = ref('');
    const teamData = ref('');
    const nextMatchInfo = ref({});
    const currentDate = ref('');
    const hasPhoto = ref(false);

    watch(() => {
        actualPath.value = route.path.split('/')[2];
    })

    // const getCurrentDate = () => {
    //     const date = new Date();
    //     const formattedDate = date.toISOString().slice(0, 10) + 'T00:00:00.000+00:00';
    //     currentDate.value = formattedDate;
    // };

    onMounted(async () => {
        try {
            const [ teamResponse, matchWeekResponse ] = await Promise.all([
                fetch(`${APIUrl}/teams/team/${id}`),
                fetch(`${APIUrl}/matchweek/all`)
            ]) ;

            const [teamDataResult, matchWeekDataResult] = await Promise.all([
                teamResponse.json(),
                matchWeekResponse.json()
            ]);

            const nextMatchWeek = matchWeekDataResult.find(matchWeek => matchWeek.date > currentDate.value && matchWeek.matches.some(match => match.localId._id === id || match.visitorId._id === id))
            nextMatchInfo.value = nextMatchWeek ?
                                     nextMatchWeek.matches.find(match => match.localId._id === id || match.visitorId._id === id)
                                     : false;

            teamData.value = teamDataResult;
            hasPhoto.value = Boolean(teamDataResult.teamPhoto);
            // console.log(teamData.value)
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    })
</script>

<style scoped>
    @import "../assets/css/club/banner.css";
    @import "../assets/css/club/club.css";
</style>