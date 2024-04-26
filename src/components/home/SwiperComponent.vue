<template>
    <swiper v-if="allTeams"
        :modules="modules"
        :space-between="50"
        navigation
        :pagination="{ clickable: true }"
        :loop="true"
        :breakpoints="swiperBreakpoints"
        >
        <swiper-slide v-if="teamsToSwiper" v-for="(team, key) in teamsToSwiper" :key="key" >
            <RouterLink :to="{ path: '/equipo/General', query: { id: team._id, name: team.name }}" >
                <img :src="team.shield"/> 
                <p>{{ team.name }}</p>
            </RouterLink>
        </swiper-slide>
    </swiper>
</template>

<script>
    import { Navigation, Pagination, A11y } from 'swiper/modules';
    import { Swiper, SwiperSlide } from 'swiper/vue';

    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import 'swiper/css/scrollbar';

    export default {
        props: {
            allTeams: {
                type: Object
            }
        },
        components: {
            Swiper,
            SwiperSlide,
        },
        setup(props) {
            const teamsToSwiper = Object.keys(props.allTeams).length === 2 
                                    ? props.allTeams.A.concat(props.allTeams.B)
                                    : props.allTeams;

            const swiperBreakpoints = {
                320: {       
                    slidesPerView: 1,
                    spaceBetween: 10     
                },          
                400: {       
                    slidesPerView: 2,
                    spaceBetween: 10     
                },          
                700: {       
                    slidesPerView: 3,       
                    spaceBetween: 50     
                },   
            
                1300: {       
                    slidesPerView: 5,       
                    spaceBetween: 30     
                }
            };

            return {
                teamsToSwiper,
                swiperBreakpoints,
                modules: [Navigation, Pagination, A11y],
            };
        },
    };
</script>

<style setup>
    @import "../../assets/css/home/swiper.css";
</style>