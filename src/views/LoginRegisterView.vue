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
        <Form :message="'tesgfesfdt'" />
        <div v-if="hideRegister" class="formGroup">
            <input type="input" class="formField" placeholder="Nombre de usuario o Email" name="name" id='name' required />
            <input type="password" class="formField" placeholder="Contraseña" name="password" id='password' required />
            <button @click="login">Iniciar sesión</button>
        </div>
        <div v-else class="formGroup">
            <input type="input" class="formField" placeholder="Nombre de usuario o Email" name="name" id='name' required />
            <input type="number" class="formField" placeholder="Teléfono" name="phoneNumber" id='phoneNumber' required />
            <input type="password" class="formField" placeholder="Contraseña" name="password" id='password' required />
            <button @click="login">Registrar</button>
        </div>
        <p v-if="hideRegister">¿Quieres participar? <RouterLink class="colorDarkBluePalette boldText" to="/registrar">Crear cuenta</RouterLink></p>
    </div>
</template>

<script setup>
    import { ref, watch } from "vue";
    import { useRoute } from "vue-router";
    import Form from '../components/loginRegister/Form.vue'

    const username = ref('');
    const password = ref('');
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

    const login = async () => {
        try {
            const response = await fetch('URL_DEL_ENDPOINT_DE_LOGIN', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Inicio de sesión exitoso');
            } else {
                console.error('Error al iniciar sesión:', data.message);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    }
</script>

<style scoped>
    @import "../assets/css/loginRegister/loginRegister.css";
</style>
