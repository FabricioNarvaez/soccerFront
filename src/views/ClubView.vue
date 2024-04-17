<template>
    <div class="content80">
        <div class="clubBanner">
            <div class="clubBannerLeft">
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

        <div class="nextMatch">
            <div class="countdown">
                <h2 class="countTitle">Próximo partido</h2>
                <div class="date">
                    <div v-if="hasDate" class="countdownClock">
                    </div>
                    <p v-else><i>Sin Definir</i></p>
                </div>
            </div>
            <div v-if="hasDate">
                <!-- TODO: Next Match info -->
                <p>test</p>
            </div>
        </div>

        
    </div>
</template>

<script setup>

</script>

<style scoped>
    @import "../assets/css/club/banner.css";
    @import "../assets/css/club/club.css";
</style>