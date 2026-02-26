<template>
    <header class="mb-12 border-b border-slate-200 pb-8">
        <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight italic uppercase">
            {{ title }}
        </h1>
        <p v-if="subtitle" class="mt-3 text-xl text-slate-600">
            {{ subtitle }}
        </p>
    </header>
</template>

<script setup>
    defineProps({
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String,
            required: false
        }
    });
</script>