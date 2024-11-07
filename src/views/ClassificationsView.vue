<template>
    <main>
        <h2 class="subtitle">Clasificaciones</h2>
        <!-- TODO: Crear un seleccionador de temporada -->
        <!-- <h3>Seleccionador de temporada</h3> -->
        <GroupsTables v-if="allTeams.A || allTeams.B" :groupA="allTeams.A" :groupB="allTeams.B" :isBigTable="true"/>
        <!-- TODO: Añadir v-else con imagen que diga que no hay clasificaciones -->
    </main>
</template>

<script setup>
    import GroupsTables from '../components/common/GroupsTables.vue';
    import { ref, onMounted } from "vue";
    const APIUrl = import.meta.env.VITE_API_URL;

    const allTeams = ref([]);

    onMounted(async () => {
        try {
            const allTeamsResponse = await fetch(`${APIUrl}/teams/all`);
            allTeams.value =  await allTeamsResponse.json();
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    })
</script>

<!-- <style setup>
    @import "../assets/css/common/table.css";
</style> -->