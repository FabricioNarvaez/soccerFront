<template>
    <div class="loginRegisterContainer">
        <h1 class="subtitle">{{ title }}</h1>
        <div class="switchContainer">
            <span :class="{ boldText : !selectedOption}">Directivo</span>
            <label class="switch">
                <input type="checkbox" v-model="selectedOption" />
                <span class="slider round"></span>
            </label>
            <span :class="{ boldText : selectedOption}">Admin</span>
        </div>
        <Form :buttonText="buttonText" :hideRegister="hideRegister"/>
    </div>
</template>

<script setup>
    import { ref, watch } from "vue";
    import { useRoute } from "vue-router";
    import Form from '../components/loginRegister/Form.vue'

    const selectedOption = ref(false);
    const route = useRoute();
    const title = ref("");
    const buttonText = ref("");
    const hideRegister = ref(false);

    watch(() => {
        title.value = route.fullPath
            .replace(/\//g, "")
            .replace(/^\w/, (letra) => letra.toUpperCase());
        hideRegister.value = title.value === "Login" ? true : false;
        buttonText.value = hideRegister.value ? "Iniciar Sesión" : "Registrar";
    });
</script>

<style scoped>
    @import "../assets/css/loginRegister/loginRegister.css";
</style>
