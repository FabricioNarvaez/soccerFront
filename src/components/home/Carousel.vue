<template>
    <Carousel>
        <Slide v-for="slide in 10" :key="slide">
            <div class="carousel__item">{{ slide }}</div>
        </Slide>
    
        <template #addons>
            <Navigation />
            <Pagination />
        </template>
    </Carousel>
</template>
  
<script setup>
  import { defineComponent } from 'vue'
  import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'

  import 'vue3-carousel/dist/carousel.css'
  
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
    @import "src/assets/css/home/carousel.css";
</style>
  