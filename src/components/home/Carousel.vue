<template>
    <Carousel>
        <Slide v-for="(image, key) in images" :key="key">
            <div class="carousel__item" :style="{ backgroundImage: 'url(' + image.href + ')' }">
                <p class="carouselTeamText">{{ image.name }}</p>
            </div>
        </Slide>
    
        <template #addons>
            <Navigation />
            <Pagination />
        </template>
    </Carousel>
</template>
  
<script setup>
    import { defineComponent } from 'vue';
    import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';

    import 'vue3-carousel/dist/carousel.css';

    const images = {
        team1: { name: "Peñarol", href: "https://res.cloudinary.com/dzd68sxue/image/upload/v1697729971/WEBP/Default_soccer_field_noon_rural_1_cf3ppi.jpg"},
        team2: { name: "Cancheritos", href: "https://res.cloudinary.com/dzd68sxue/image/upload/v1697729971/WEBP/Default_soccer_field_noon_rural_1_cf3ppi.jpg"},
        team3: { name: "Amistad", href: "https://res.cloudinary.com/dzd68sxue/image/upload/v1697729971/WEBP/Default_soccer_field_noon_rural_1_cf3ppi.jpg"},
        team4: { name: "Estella", href: "https://res.cloudinary.com/dzd68sxue/image/upload/v1697729971/WEBP/Default_soccer_field_noon_rural_1_cf3ppi.jpg"},
    }
    
    defineComponent({
        name: 'Basic',
        components: {
            Carousel,
            Slide,
            Pagination,
            Navigation,
        },
    })

    
</script>
  
  
<style scoped>
    @import "../../assets/css/home/carousel.css";
</style>
  