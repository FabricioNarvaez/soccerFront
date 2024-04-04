<template>
    <div>
        <div class="formGroup">
            <input v-if="hideRegister" type="input" class="formField" placeholder="Nombre de usuario o Email" name="name" id='name' required />
            <input v-else type="input" class="formField" placeholder="Nombre" name="name" id='name' required />
            <div class="registerElements" v-if="!hideRegister">
                <input type="email" class="formField" placeholder="Email" name="email" id='email' required />
                <input type="number" class="formField" placeholder="Teléfono" name="phoneNumber" id='phoneNumber' required />
            </div>
            <input type="password" class="formField" placeholder="Contraseña" name="password" id='password' required />
            <button @click="loginRegister">{{ buttonText }}</button>
            <p v-if="hideRegister">¿Quieres participar? <RouterLink class="colorDarkBluePalette boldText" to="/registrar">Crear cuenta</RouterLink></p>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';

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
</script>

<style scoped>
    @import "../../assets/css/loginRegister/form.css";
</style>