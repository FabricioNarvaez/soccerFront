<template>
    <div class="content80">
        <div class="clubBanner">
            <div class="flexCenterF20 positionAbsolute">
                <img src="https://res.cloudinary.com/dzd68sxue/image/upload/v1695395236/WEBP/Cancheritos_qdbnsw.webp"/>
                <div class="cardTeamInfo">
                    <p><b>Chancheritos</b></p>
                    <p><i>Directivo</i>: Fabricio Narvaez</p>
                    <p><i>Grupo</i>: A</p>
                </div>
            </div>
            <div class="gradient"></div>
        </div>
    
        <nav class="clubNav">
            <RouterLink :to="{ path: '/equipo/General', query: { id: id, name: name }}">General</RouterLink>
            <RouterLink :to="{ path: '/equipo/Plantilla', query: { id: id, name: name }}">Plantilla</RouterLink>
            <RouterLink :to="{ path: '/equipo/Resultados', query: { id: id, name: name }}">Resultados</RouterLink>
            <RouterLink :to="{ path: '/equipo/Sanciones', query: { id: id, name: name }}">Sanciones</RouterLink>
        </nav>

        <GeneralInfo v-if="actualPath === 'General'" />
        <p v-else>Not General</p>
    </div>
</template>

<script setup>
    import { ref, watch } from "vue";
    import GeneralInfo from '../components/club/GeneralInfo.vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const id = route.query.id;
    const name = route.query.name;
    const actualPath = ref('');
    watch(() => {
        actualPath.value = route.path.split('/')[2];
    })
</script>

<style scoped>
    @import "../assets/css/club/banner.css";
    @import "../assets/css/club/club.css";
</style>