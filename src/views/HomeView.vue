<template>
    <main>
        <HeaderSubtitle :subtitle="'Equipos'" :link="'/equipos'" :linkText="'TODOS LOS EQUIPOS'" />
        <SwiperComponent v-if="swiperReady" :allTeams="allTeams" />
        <p v-else class="subtitle">Aún no hay equipos en el torneo</p>
        <!-- <Carousel /> -->
        <div class="homeMain">
            <div class="leftMain">
                <HeaderSubtitle :subtitle="'Próxima Jornada'" :link="'/'" :linkText="'TODAS LAS JORNADAS'" />
            </div>
            <div class="rightMain">
                <p>tabla clasificaciones</p>
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

<style setup>
    @import "../assets/css/home/home.css";
</style>