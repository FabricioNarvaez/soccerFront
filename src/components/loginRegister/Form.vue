<template>
    <div>
        <div class="formGroup">
            <input v-if="hideRegister" type="input" class="formField" placeholder="Nombre de usuario o Email" name="name" id='name' required />
            <input v-else type="input" class="formField" placeholder="Nombre de usuario" name="name" id='name' required />
            <input v-if="!hideRegister" type="email" class="formField" placeholder="Email" name="email" id='email' required />
            <input v-if="!hideRegister" type="number" class="formField" placeholder="Teléfono" name="phoneNumber" id='phoneNumber' required />
            <input type="password" class="formField" placeholder="Contraseña" name="password" id='password' required />
            <button @click="login">{{ buttonText }}</button>
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