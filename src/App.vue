<template>
    <Header />
    <div class="content80">
        <RouterView />
    </div>
    <Footer />
</template>

<script setup>
    import { RouterView } from "vue-router";
    import Header from '@components/main/Header.vue';
    import Footer from '@components/main/Footer.vue';
</script>
