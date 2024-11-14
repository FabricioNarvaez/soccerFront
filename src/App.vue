<template>
    <Header />
    <div class="content80">
        <RouterView />
    </div>
</template>

<script setup>
    import { RouterView } from "vue-router";
    import Header from './components/main/Header.vue';
</script>
