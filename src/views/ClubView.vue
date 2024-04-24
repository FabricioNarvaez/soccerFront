<template>
    <div class="content80">
        <div :style="{ '--backgroundColor': `${teamData.color}`}"
            class="clubBanner"
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

        <GeneralInfo v-if="actualPath === 'General'" :teamData="teamData"/>
        <p v-else>Not General</p>
    </div>
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
    const hasPhoto = ref(false);

    watch(() => {
        actualPath.value = route.path.split('/')[2];
    })

    onMounted(async () => {
        try {
            const response = await fetch(`${APIUrl}/teams/team/${id}`);
            const data = await response.json();
            teamData.value = data;
            hasPhoto.value = Boolean(data.teamPhoto);
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