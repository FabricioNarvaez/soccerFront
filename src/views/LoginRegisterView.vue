<template>
    <h1>{{ title }}</h1>
    <div class="switch-container">
        <span>Directivo</span>
        <label class="switch">
            <input type="checkbox" v-model="selectedOption" />
            <span class="slider round"></span>
        </label>
        <span>Admin</span>
    </div>
    <RouterLink to="/registrar" v-if="hideRegister">Crear cuenta</RouterLink>
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
