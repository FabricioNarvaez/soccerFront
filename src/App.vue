<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <main class="flex-grow">
      <div class="max-w-[1400px] w-4/5 mx-auto md:w-auto md:px-1.5">
        <RouterView />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
    import { RouterView } from "vue-router";
    import Header from '@components/main/Header.vue';
    import Footer from '@components/main/Footer.vue';
</script>
