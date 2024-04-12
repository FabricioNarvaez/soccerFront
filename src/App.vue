<template>
    <Header />
    <RouterView class="content80" />
</template>

<script setup>
    import { RouterView } from "vue-router";
    import Header from './components/main/Header.vue';
</script>
