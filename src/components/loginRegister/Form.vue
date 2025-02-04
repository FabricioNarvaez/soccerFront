<template>
    <div>
        <p v-if="hideRegister">{{ subtitle }}</p>
        <p v-else>Date de alta como Directivo y crea tu Equipo</p>
        <form class="formGroup" @submit.prevent="loginRegister" ref="formRef">
            <input v-if="hideRegister" type="input" class="formField" placeholder="DNI o Email *" v-model="loginUsername" required />
            <div class="registerElements" v-if="!hideRegister">
                <input type="input" class="formField" placeholder="Nombre *" v-model="name" required />
                <input type="input" class="formField" placeholder="DNI *" v-model="dni" required />
                <input type="email" class="formField" placeholder="Email *" v-model="email"  />
                <input type="input" class="formField" placeholder="Nombre del Equipo *" v-model="team" required />
                <input type="number" class="formField" placeholder="Teléfono *" v-model="phoneNumber" required />
            </div>
            <input type="password" class="formField" placeholder="Contraseña *" v-model="password" required />
            <div v-if="!hideRegister" class="checkboxContainer">
                <input type="checkbox" id="terms-checkbox" class="checkboxInput" v-model="checkboxTerms"/>
                <!-- TODO: Redirect to terms and conditions page -->
                <label for="terms-checkbox" class="checkboxLabel">He leído y acepto los <RouterLink to="/registrar" class="checkbox-link">términos y condiciones</RouterLink></label>
            </div>
            <p v-if="showError" class="errorMessage">{{ errorMessage }}</p>
            <button type="submit">{{ buttonText }}</button>
            <p v-if="hideRegister">¿Quieres participar? <RouterLink class="colorDarkBluePalette boldText" to="/registrar">Crear cuenta</RouterLink></p>
        </form>

        <ModalMod :isModalOpen="isModalOpen" :modalMessage="modalMessage" :modalFunction="closeModal" />

    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import ModalMod from '../common/ModalMod.vue'
    const router = useRouter();

    const props = defineProps({
        subtitle: {
            type: String,
            required: true
        },
        buttonText: {
            type: String,
            required: true
        },
        hideRegister: {
            type: Boolean,
            required: true
        },
        selectedOption: {
            type: Boolean,
            required: true
        }
    });

    const loginUsername = ref('');
    const dni = ref('');
    const name = ref('');
    const email = ref('');
    const team = ref('');
    const phoneNumber = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const modalMessage = ref('');
    const formRef = ref(null);
    const checkboxTerms = ref(false);
    const showError = ref(false);

    const isModalOpen = ref(false);

    const closeModal = () => {
        isModalOpen.value = false;
        router.push('/login');
    };

    const loginRegister = async () => {
        if(!props.hideRegister){
            showError.value = checkboxTerms.value ? false : true;
            if(showError.value){
                errorMessage.value = 'Debe aceptar los términos y condiciones para poderse registrar en nuestro sitio web.'
                return
            }
        }
        try {
            const APIUrl = import.meta.env.VITE_API_URL;
            let formData = {};
            let postUrl = APIUrl;
            if (props.hideRegister) {
                formData = {
                    loginUsername: loginUsername.value,
                    password: password.value
                };
                postUrl += `/${props.selectedOption ? 'admins': 'coaches'}/login`;
            } else {
                formData = {
                    name: name.value,
                    dni: dni.value,
                    email: email.value,
                    team: team.value,
                    phoneNumber: phoneNumber.value,
                    password: password.value
                };
                postUrl += "/coaches/register";
            }

            
            const response = await fetch(postUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if(response.status === 409 || response.status === 401){
                showError.value = true;
                errorMessage.value = data.message;
                return
            }

            if(response.status === 200 && data.coachData){
                router.push('/');
            }

            if(response.status === 200 || response.status === 500){
                modalMessage.value = data.message;
                isModalOpen.value = true;
                return
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };
</script>

<style scoped>
    @import "../../assets/css/loginRegister/form.css";
</style>