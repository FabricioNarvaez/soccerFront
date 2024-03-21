<template>
    <header>
        <div class="headerContainer">
            <img
                alt="AAPD Logo"
                class="headerLogo"
                src="https://res.cloudinary.com/dzd68sxue/image/upload/v1708167851/AAPD_ratkzi.png"
            />

            <!-- <HelloWorld msg="You did it!" /> -->
            <nav class="navMenu">
                <RouterLink to="/">Inicio</RouterLink>
                <RouterLink to="/classification">Clasificación</RouterLink>
                <div class="dropdown">
                    <RouterLink to="/playofss">Eliminatorias</RouterLink>
                    <Icon icon="bxs:down-arrow" />
                    <div class="dropdown-content">
                        <RouterLink to="/playofss/champions"
                            >Champions</RouterLink
                        >
                        <RouterLink to="/playofss/uefa">UEFA</RouterLink>
                    </div>
                </div>
                <div class="dropdown">
                    <RouterLink to="/mvp">MVP</RouterLink>
                    <Icon icon="bxs:down-arrow" />
                    <div class="dropdown-content">
                        <RouterLink to="/playofss/pichichi"
                            >Pichichi</RouterLink
                        >
                        <RouterLink to="/playofss/porteroDestacado"
                            >Portero</RouterLink
                        >
                    </div>
                </div>
                <RouterLink to="/rules">Reglamento</RouterLink>
                <RouterLink to="/matchweeks">Jornadas</RouterLink>
                <RouterLink to="/admin">
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

    <RouterView />
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { RouterLink, RouterView } from "vue-router";
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from "vue";

// const isActive = ref(false);
// function toggleMenu() {
//     isActive.value = !isActive.value;
//     // emit('toggle');
// }
</script>
