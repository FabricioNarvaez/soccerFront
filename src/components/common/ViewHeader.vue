<template>
    <header class="mt-5 mb-12 border-b border-slate-200 pb-8 w-fit">
        <div>
            <h1 class="text-4xl font-black tracking-tight text-slate-800 uppercase italic">
                {{ title }}
            </h1>
            <div class="h-1 w-20 bg-blue-500 shadow-blue-400 shadow-xl mt-2"></div>
        </div>
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