<template>
    <p class="text-xl text-gray-500 text-center font-medium">
        {{ text }}
    </p>
</template>

<script setup>
    defineProps({
        text: {
            type: String,
            default: 'Vacío'
        }
    });
</script>script