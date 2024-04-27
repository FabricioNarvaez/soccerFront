<template>
    <div class="headerSubtitle">
        <h3 class="subtitle">{{ subtitle }}</h3>
        <RouterLink v-if="linkText" :to="link">{{ linkText }}</RouterLink>
    </div>
    <hr>
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

<style setup>
    @import "../../assets/css/common/headerSubtitle.css";
</style>