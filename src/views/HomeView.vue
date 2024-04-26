<template>
    <main>
        <div class="headerSubtitle">
            <h3 class="subtitle">Equipos</h3>
            <RouterLink to="/equipos">TODOS LOS EQUIPOS</RouterLink>
        </div>
        <hr>
        <SwiperComponent v-if="swiperReady" :allTeams="allTeams" />
        <h3 v-else class="subtitle">Aún no hay equipos en el torneo</h3>
        <!-- <Carousel /> -->
    </main>
</template>

<script setup>
    // import Carousel from '../components/home/Carousel.vue'
    import SwiperComponent from '../components/home/SwiperComponent.vue';
    import { ref, onMounted } from "vue";
    const APIUrl = import.meta.env.VITE_API_URL;

    const swiperReady = ref(false);
    const allTeams = ref({});

    onMounted(async () => {
        try {
            const allTeamsResponse = await fetch(`${APIUrl}/teams/all`);
            allTeams.value = await allTeamsResponse.json();
            if(Object.keys(allTeams.value.A).length || Object.keys(allTeams.value.B).length ) swiperReady.value = true;
            console.log(allTeams.value)
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    })
</script>