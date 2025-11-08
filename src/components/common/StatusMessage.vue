<template>
    <p class="text-xl text-gray-500 text-center font-medium pt-4">
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