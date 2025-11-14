<template>
    <div class="flex items-end justify-between">
        <h3 class="text-xl font-semibold text-gray-800">{{ subtitle }}</h3>
        
        <RouterLink class="text-sm capitalize font-semibold italic text-blue-600 pb-1 transition-colors duration-200 hover:text-blue-800 hover:underline"
            v-if="linkText" 
            :to="link" 
        >
            {{ linkText }}
        </RouterLink>
    </div>
    <hr class="border-t border-gray-300 mt-2">
</template>

<script setup>
    const props = defineProps({
        subtitle: {
            type: String,
            required: true
        },
        link: {
            type: String
        },
        linkText: {
            type: String
        }
    })
</script>