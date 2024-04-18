<template>
    <div class="loginRegisterContainer">
        <h2 class="subtitle">{{ title }}</h2>
        <div class="switchContainer">
            <span :class="{ boldText : !selectedOption}">Directivo</span>
            <label class="switch">
                <input type="checkbox" v-model="selectedOption" :disabled="!hideRegister" />
                <span class="slider round" ></span>
            </label>
            <span :class="{ boldText : selectedOption}">Admin</span>
        </div>
        <Form :selectedOption="selectedOption" :subtitle="subtitle" :buttonText="buttonText" :hideRegister="hideRegister"/>
    </div>
</template>

<script setup>
    import { ref, watch } from "vue";
    import { useRoute } from "vue-router";
    import Form from '../components/loginRegister/Form.vue'

    const selectedOption = ref(false);
    const route = useRoute();
    const title = ref("");
    const subtitle = ref("");
    const buttonText = ref("");
    const hideRegister = ref(false);

    watch(() => {
        subtitle.value = `Inicia sesión con tu cuenta de ${selectedOption.value ? 'Admin': 'Directivo'}`

        title.value = route.fullPath
            .replace(/\//g, "")
            .replace(/^\w/, (letra) => letra.toUpperCase());
        hideRegister.value = title.value === "Login";
        buttonText.value = hideRegister.value ? "Iniciar Sesión" : "Registrar";
    });

</script>

<style scoped>
    @import "../assets/css/loginRegister/loginRegister.css";
</style>
