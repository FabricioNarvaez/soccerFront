<template>
    <div class="py-8 px-4 sm:px-6 lg:px-8">
        <HeaderSubtitle :subtitle="'Equipos'" :link="'/equipos'" :linkText="'TODOS LOS EQUIPOS'" />
        <LoadingText v-if="teamsStore.loading" :loadingText="'Cargando Equipos...'"/>

        <p v-else-if="!teamsStore.allTeams || teamsStore.allTeams.length === 0" class="text-xl text-gray-500 text-center font-medium">
            Aún no hay equipos en el torneo
        </p>

        <swiper v-else class="pb-10" 
            :modules="modules"
            :space-between="50"
            navigation
            :pagination="{ clickable: true }"
            :loop="true"
            :breakpoints="swiperBreakpoints"
            >
            
            <swiper-slide v-for="(team, key) in teamsStore.allTeams" :key="key" class="!pb-8">
                <RouterLink class="flex flex-col items-center space-y-3 p-4 transition-transform duration-300 hover:scale-[1.02]"
                    :to="{ path: '/equipo/General', query: { id: team._id, name: team.name }}"
                >
                    <img class="w-full max-w-[200px] h-auto object-contain sm:max-w-[160px] xl:max-w-[200px]"
                        :src="team.shield" 
                        :alt="`Escudo del equipo ${team.name}`"
                    />
                    
                    <p class="text-lg font-bold text-dark-blue mt-2 text-center truncate w-full px-2">
                        {{ team.name }}
                    </p>
                </RouterLink>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup>
    import { Navigation, Pagination, A11y } from "swiper/modules";
    import { Swiper, SwiperSlide } from "swiper/vue";
    import LoadingText from "@components/common/LoadingText.vue";
    import HeaderSubtitle from '@components/common/HeaderSubtitle.vue';

    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";
    // import "swiper/css/scrollbar";

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