<template>
    <!-- TODO: Cambiar por un loader -->
    <p v-if="teamsStore.loading" class="subtitle">Aún no hay equipos en el torneo</p>
    <swiper v-else
        :modules="modules"
        :space-between="50"
        navigation
        :pagination="{ clickable: true }"
        :loop="true"
        :breakpoints="swiperBreakpoints"
        >
        <swiper-slide v-if="teamsStore.allTeams" v-for="(team, key) in teamsStore.allTeams" :key="key" >
            <RouterLink :to="{ path: '/equipo/General', query: { id: team._id, name: team.name }}" >
                <img :src="team.shield"/> 
                <p>{{ team.name }}</p>
            </RouterLink>
        </swiper-slide>
        <p v-else class="subtitle">Aún no hay equipos en el torneo</p>
    </swiper>
</template>

<script setup>
    import { Navigation, Pagination, A11y } from "swiper/modules";
    import { Swiper, SwiperSlide } from "swiper/vue";

    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";
    import "swiper/css/scrollbar";

    import { useTeamsStore } from '@store/teamsStore.js';
    const teamsStore = useTeamsStore();

    const swiperBreakpoints = {
        320: { slidesPerView: 1, spaceBetween: 10 },
        400: { slidesPerView: 2, spaceBetween: 10 },
        700: { slidesPerView: 3, spaceBetween: 50 },
        1300: { slidesPerView: 5, spaceBetween: 30 }
    };

    const modules = [Navigation, Pagination, A11y];
</script>


<style setup>
    @import "@css/home/swiper.css";
</style>