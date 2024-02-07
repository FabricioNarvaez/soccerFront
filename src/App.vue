<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="headerContainer">
      <img alt="AAPD Logo" class="logo" src="https://res.cloudinary.com/dzd68sxue/image/upload/v1697728432/WEBP/Logo_ybmlsh.webp" width="125" height="125" />
  
      <!-- <HelloWorld msg="You did it!" /> -->
      <nav class="navMenu">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/Statistics">Estadísticas</RouterLink>
        <RouterLink to="/classification">Clasificación</RouterLink>
        <RouterLink to="/matchweeks">Jornadas</RouterLink>
        <RouterLink to="/admin">
          <img alt="Admin icon" class="icon" src="@/assets/images/PhUserCircle.svg" width="40" height="40" />
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>


