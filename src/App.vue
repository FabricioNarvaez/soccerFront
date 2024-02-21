<template>
    <header>
        <div class="headerContainer">
            <img alt="AAPD Logo" class="headerLogo"
                src="https://res.cloudinary.com/dzd68sxue/image/upload/v1697728432/WEBP/Logo_ybmlsh.webp" />

            <!-- <HelloWorld msg="You did it!" /> -->
            <div class="hamburger" :class="{ change: isActive }" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav class="navMenu">
                <RouterLink to="/">Inicio</RouterLink>
                <RouterLink to="/classification">Clasificación</RouterLink>
                <div class="dropdown">
                    <RouterLink to="/playofss">Eliminatorias</RouterLink>
                    <div class="dropdown-content">
                        <RouterLink to="/playofss/champions">Champions</RouterLink>
                        <RouterLink to="/playofss/uefa">Uefa</RouterLink>
                    </div>
                </div>
                <div class="dropdown">
                    <RouterLink to="/mvp">MVP</RouterLink>
                    <div class="dropdown-content">
                        <RouterLink to="/playofss/pichichi">Pichichi</RouterLink>
                        <RouterLink to="/playofss/porteroDestacado">Portero Destacado</RouterLink>
                    </div>
                </div>
                <RouterLink to="/rules">Reglamento</RouterLink>
                <RouterLink to="/matchweeks">Jornadas</RouterLink>
                <RouterLink to="/admin">
                    <img alt="Admin icon" class="icon" src="@/assets/images/PhUserCircle.svg" width="40" height="40" />
                </RouterLink>
            </nav>
        </div>
    </header>

    <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue';

const isActive = ref(false);
function toggleMenu() {
    isActive.value = !isActive.value;
    // emit('toggle');
}
</script>
