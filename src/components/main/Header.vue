<template>
    <header>
        <div class="headerContainer">
            <img
                alt="AAPD Logo"
                class="headerLogo"
                src="https://res.cloudinary.com/dzd68sxue/image/upload/v1708167596/WEBP/AAPD_2024_W_belugq.webp"
            />

            <!-- <HelloWorld msg="You did it!" /> -->
            <div @click="toggleMenu" class="hamburger">
                <Icon width="25" height="25" icon="bi:list" />
            </div>
            <nav class="navMenu" :class="{ menuActive: isActive }">
                <Icon
                    @click="toggleMenu"
                    class="crossIcon"
                    icon="radix-icons:cross-1"
                />
                <RouterLink to="/">Inicio</RouterLink>
                <RouterLink to="/teams">Equipos</RouterLink>
                <RouterLink to="/classification">Clasificación</RouterLink>
                <div class="dropdown">
                    <p @click="toggleDropdown">Eliminatorias</p>
                    <Icon icon="bxs:down-arrow" />
                    <div
                        class="dropdown-content"
                        :class="{ dropdownActive: isActiveDropdown }"
                    >
                        <RouterLink to="/playoffs/champions"
                            >Champions</RouterLink
                        >
                        <RouterLink to="/playoffs/uefa">UEFA</RouterLink>
                    </div>
                </div>
                <div class="dropdown">
                    <p>MVP</p>
                    <Icon icon="bxs:down-arrow" />
                    <div class="dropdown-content">
                        <RouterLink to="/playoffs/pichichi"
                            >Pichichi</RouterLink
                        >
                        <RouterLink to="/playoffs/porteroDestacado"
                            >Portero</RouterLink
                        >
                    </div>
                </div>
                <RouterLink to="/rules">Reglamento</RouterLink>
                <RouterLink to="/matchweeks">Jornadas</RouterLink>
                <RouterLink to="/login">
                    <Icon
                        icon="mingcute:user-4-fill"
                        width="40"
                        height="40"
                        style="color: #dba400"
                    />
                </RouterLink>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { RouterLink } from "vue-router";
import { ref } from "vue";

const isActive = ref(false);
const isActiveDropdown = ref(false);
function toggleMenu() {
    isActive.value = !isActive.value;
    console.log(isActive);
}
function toggleDropdown() {
    isActiveDropdown.value = !isActiveDropdown.value;
}
</script>

<style scoped>
@import "../../assets/css/main/header.css";
</style>
