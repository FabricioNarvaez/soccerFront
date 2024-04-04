<template>
    <div class="loginRegisterContainer">
        <h1 class="subtitle">{{ title }}</h1>
        <div class="switch-container">
            <span :class="{ boldText : !selectedOption}">Directivo</span>
            <label class="switch">
                <input type="checkbox" v-model="selectedOption" />
                <span class="slider round"></span>
            </label>
            <span :class="{ boldText : selectedOption}">Admin</span>
        </div>
        <RouterLink to="/registrar" v-if="hideRegister">Crear cuenta</RouterLink>
    </div>
</template>

<script>
    import { ref, watch } from "vue";
    import { useRoute } from "vue-router";

    export default {
        setup() {
            const selectedOption = ref(false);
            const route = useRoute();
            const title = ref("");
            const hideRegister = ref(false);

            watch(() => {
                title.value = route.fullPath
                    .replace(/\//g, "")
                    .replace(/^\w/, (letra) => letra.toUpperCase());
                hideRegister.value = title.value === "Login" ? true : false;
            });

            return { selectedOption, title, hideRegister };
        },
    };
</script>

<style scoped>
    @import "../assets/css/loginRegister/loginRegister.css";
</style>
