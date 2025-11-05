<template>
    <p class="text-xl text-gray-500 text-center font-medium">
        {{ loadingText }}
    </p>
</template>

<script setup>
    defineProps({
        loadingText: {
            type: String,
            default: 'Cargando...'
        }
    });
</script>