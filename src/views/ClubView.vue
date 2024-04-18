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
            <RouterLink to="/">General</RouterLink>
            <RouterLink to="/">Plantilla</RouterLink>
            <RouterLink to="/">Resultados</RouterLink>
            <RouterLink to="/">Sanciones</RouterLink>
        </nav>

        <GeneralInfo />
    </div>
</template>

<script setup>
    import GeneralInfo from '../components/club/GeneralInfo.vue';
</script>

<style scoped>
    @import "../assets/css/club/banner.css";
    @import "../assets/css/club/club.css";
</style>