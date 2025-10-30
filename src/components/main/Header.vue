<template>
    <header class="sticky top-0 z-[999] bg-[#206192] shadow-xl">
        <div class="max-w-7xl mx-auto h-20 px-4 flex items-center justify-between">
            <RouterLink to="/" class="transition-transform hover:scale-105">
                <img
                    alt="AAPD Logo"
                    class="h-14 w-auto"
                    src="https://res.cloudinary.com/dzd68sxue/image/upload/v1708167596/WEBP/AAPD_2024_W_belugq.webp"
                />
            </RouterLink>

            <nav class="hidden lg:flex items-center space-x-8 xl:space-x-10 text-white font-semibold">
                <RouterLink to="/" class="nav-link">Inicio</RouterLink>
                <RouterLink to="/equipos" class="nav-link">Equipos</RouterLink>
                <RouterLink to="/clasificaciones" class="nav-link">Clasificación</RouterLink>

                <div class="relative group">
                    <div class="flex items-center cursor-pointer nav-link">
                        <p>Eliminatorias</p>
                        <Icon icon="bxs:down-arrow" class="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                    </div>
                    <div class="absolute top-full -left-5 z-10 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out translate-y-2 group-hover:translate-y-0 bg-[#206192] shadow-lg border-t-4 border-amber-400 min-w-[150px] flex flex-col">
                        <RouterLink to="/playoffs/champions" class="dropdown-link">Champions</RouterLink>
                        <RouterLink to="/playoffs/uefa" class="dropdown-link border-t border-white/10">UEFA</RouterLink>
                    </div>
                </div>

                <div class="relative group">
                    <div class="flex items-center cursor-pointer nav-link">
                        <p>MVP</p>
                        <Icon icon="bxs:down-arrow" class="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                    </div>
                    <div class="absolute top-full -left-5 z-10 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out translate-y-2 group-hover:translate-y-0 bg-[#206192] shadow-lg border-t-4 border-amber-400 min-w-[150px] flex flex-col">
                        <RouterLink to="/playoffs/pichichi" class="dropdown-link">Pichichi</RouterLink>
                        <RouterLink to="/playoffs/porteroDestacado" class="dropdown-link border-t border-white/10">Portero</RouterLink>
                    </div>
                </div>

                <RouterLink to="/reglamento" class="nav-link">Reglamento</RouterLink>
                <RouterLink to="/matchweeks" class="nav-link">Jornadas</RouterLink>
                <RouterLink to="/galería" class="nav-link">Galería</RouterLink>
            </nav>

            <div class="flex items-center space-x-4">
                <RouterLink aria-label="Acceder a la cuenta"
                    to="/login" class="user-link hidden lg:flex"
                >
                    <Icon
                        icon="mingcute:user-4-fill"
                        class="w-7 h-7 text-white transition-colors hover:text-amber-400"
                    />
                </RouterLink>
                
                <div @click="toggleMenu" aria-label="menuButton"
                    class="lg:hidden cursor-pointer text-white"
                >
                    <Icon  width="30" height="30" icon="bi:list" />
                </div>
            </div>

            <Transition
                enter-active-class="transition ease-out duration-300"
                enter-from-class="-translate-x-full"
                enter-to-class="translate-x-0"
                leave-active-class="transition ease-in duration-300"
                leave-to-class="-translate-x-full"
                leave-from-class="translate-x-0"
            >
                <div v-if="isActive" class="fixed inset-0 z-[2000] lg:hidden">
                    <div @click="toggleMenu" class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

                    <nav aria-label="mobileNav"
                        class="absolute top-0 left-0 h-full w-full max-w-[300px] bg-[#206192] shadow-2xl overflow-y-auto pt-4 flex flex-col space-y-8">
                        <div 
                            @click="toggleMenu"
                            role="button"
                            aria-label="closeNavButton"
                            class="crossIcon absolute top-4 right-4 cursor-pointer"
                        >
                            <Icon
                                class="w-6 h-6 text-white"
                                icon="radix-icons:cross-1"
                            />
                        </div>
                        
                        <div class="mt-16 flex flex-col divide-y divide-white/10 text-white font-semibold">
                            <RouterLink @click="toggleMenu" to="/" class="mobile-link">Inicio</RouterLink>
                            <RouterLink @click="toggleMenu" to="/equipos" class="mobile-link" aria-label="Equipos">Equipos</RouterLink>
                            <RouterLink @click="toggleMenu" to="/clasificaciones" class="mobile-link">Clasificación</RouterLink>

                            <div class="group mobile-link-container">
                                <div @click="() => isActiveDropdownPlayoffs = !isActiveDropdownPlayoffs" class="flex items-center justify-between cursor-pointer">
                                    <p>Eliminatorias</p>
                                    <Icon 
                                        icon="bxs:down-arrow" 
                                        :class="{'rotate-180': isActiveDropdownPlayoffs}" 
                                        class="w-4 h-4 transition-transform" 
                                    />
                                </div>
                                <div v-show="isActiveDropdownPlayoffs" class="flex flex-col pl-4 py-2 space-y-1 bg-[#1a4e76]">
                                    <RouterLink @click="toggleMenu" to="/playoffs/champions" class="mobile-sub-link">Champions</RouterLink>
                                    <RouterLink @click="toggleMenu" to="/playoffs/uefa" class="mobile-sub-link">UEFA</RouterLink>
                                </div>
                            </div>
                            
                            <div class="group mobile-link-container">
                                <div @click="() => isActiveDropdownMVP = !isActiveDropdownMVP" class="flex items-center justify-between cursor-pointer">
                                    <p>MVP</p>
                                    <Icon 
                                        icon="bxs:down-arrow" 
                                        :class="{'rotate-180': isActiveDropdownMVP}" 
                                        class="w-4 h-4 transition-transform" 
                                    />
                                </div>
                                <div v-show="isActiveDropdownMVP" class="flex flex-col pl-4 py-2 space-y-1 bg-[#1a4e76]">
                                    <RouterLink @click="toggleMenu" to="/playoffs/pichichi" class="mobile-sub-link">Pichichi</RouterLink>
                                    <RouterLink @click="toggleMenu" to="/playoffs/porteroDestacado" class="mobile-sub-link">Portero</RouterLink>
                                </div>
                            </div>

                            <RouterLink @click="toggleMenu" to="/reglamento" class="mobile-link">Reglamento</RouterLink>
                            <RouterLink @click="toggleMenu" to="/matchweeks" class="mobile-link">Jornadas</RouterLink>
                            <RouterLink @click="toggleMenu" to="/galería" class="mobile-link">Galería</RouterLink>
                            
                            <RouterLink @click="toggleMenu" to="/login" class="mobile-link flex items-center space-x-2 text-amber-400">
                                <Icon icon="mingcute:user-4-fill" class="w-6 h-6" />
                                <span>Acceder</span>
                            </RouterLink>
                        </div>
                    </nav>
                </div>
            </Transition>

        </div>
    </header>
</template>

<script setup>
    import { Icon } from "@iconify/vue";
    import { RouterLink } from "vue-router";
    import { ref } from "vue";

    const isActive = ref(false);
    const isActiveDropdownPlayoffs = ref(false);
    const isActiveDropdownMVP = ref(false);

    function toggleMenu() {
        isActive.value = !isActive.value;
    }
</script>

<style>
    .nav-link {
        @apply relative text-white transition-colors duration-200;
    }
    .nav-link:hover,
    .nav-link.router-link-active {
        @apply text-amber-400;
    }
    .nav-link.router-link-active {
        @apply border-b-2 border-amber-400 pb-1;
    }

    .dropdown-link {
        @apply px-4 py-2 text-sm text-white hover:bg-amber-400 hover:text-black transition-colors duration-200 w-full;
    }

    .mobile-link,
    .mobile-link-container {
        @apply w-full px-5 py-3.5 transition-colors duration-200 border-b border-white/5;
    }
    .mobile-link:hover,
    .mobile-link.router-link-active {
        @apply bg-white/5 text-amber-400;
    }
    .mobile-sub-link {
        @apply text-sm py-2 px-2 hover:text-amber-400 transition-colors duration-200;
    }
</style>