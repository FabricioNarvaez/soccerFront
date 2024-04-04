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
.switch-container {
    display: flex;
    align-items: center;
}

.switch-container span {
    padding-right: 10px;
    padding-left: 10px;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    right: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: #2196f3;
}

input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}
</style>
