<template>
    <div>
        <div class="formGroup">
            <input v-if="hideRegister" type="input" class="formField" placeholder="Nombre de usuario o Email" v-model="username" required />
            <input v-else type="input" class="formField" placeholder="Nombre" v-model="name" required />
            <div class="registerElements" v-if="!hideRegister">
                <input type="email" class="formField" placeholder="Email" v-model="email" required />
                <input type="input" class="formField" placeholder="Nombre del Equipo" v-model="team" required />
                <input type="number" class="formField" placeholder="Teléfono" v-model="phoneNumber" required />
            </div>
            <input type="password" class="formField" placeholder="Contraseña" v-model="password" required />
            <button @click="loginRegister">{{ buttonText }}</button>
            <p v-if="hideRegister">¿Quieres participar? <RouterLink class="colorDarkBluePalette boldText" to="/registrar">Crear cuenta</RouterLink></p>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, ref } from 'vue';

    const props = defineProps({
        buttonText: {
            type: String,
            required: true
        },
        hideRegister: {
            type: Boolean,
            required: true
        }
    });

    const username = ref('');
    const name = ref('');
    const email = ref('');
    const team = ref('');
    const phoneNumber = ref('');
    const password = ref('');

    const loginRegister = async (hideRegister) => {
        try {
            let formData = {};
            console.log(hideRegister);
            if (hideRegister) {
                formData = {
                    username: username.value,
                    password: password.value
                };
            } else {
                formData = {
                    name: name.value,
                    email: email.value,
                    team: team.value,
                    phoneNumber: phoneNumber.value,
                    password: password.value
                };
            }
            
            const response = await fetch('URL_DEL_ENDPOINT_DE_LOGIN_O_REGISTRO', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Operación exitosa');
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };
</script>

<style scoped>
    @import "../../assets/css/loginRegister/form.css";
</style>