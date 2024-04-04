<template>
    <div>
        <!-- <p>test</p> -->
        <p>{{ message }}</p>
    </div>
</template>

<script setup>
    defineProps({
        message: {
            type: String,
            required: true
        }
    })
</script>