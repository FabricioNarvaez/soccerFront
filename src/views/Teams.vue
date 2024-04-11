<template>
    <div class="content80">
        <h1 class="subtitle">Equipos Temporada Verano 2024</h1>
        <div class="cardsCollection">
            <div class="card" v-for="team in allTeams">
                <RouterLink class="cardContent" :to="{ path: '/equipo/', query: { id: team._id, name: team.name }}" >
                    <img :src="team.shield"/>
                    <div class="cardTeamInfo">
                        <p><b>{{ team.name }}</b></p>
                        <p><i>Directivo</i>: {{ team.coachName }}</p>
                        <p><i>Grupo</i>: {{ team.group }}</p>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted  } from 'vue';
    const APIUrl = import.meta.env.VITE_API_URL;
    const allTeams = ref('');

    onMounted(async () => {
        try {
            const response = await fetch(`${APIUrl}/teams/all`);
            const data = await response.json();
            allTeams.value = (data.A).concat(data.B);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    })
</script>

<style scoped>
    @import "../assets/css/teams/AllTeans.css"
</style>