<template>
    <div class="rightMain">
        <HeaderSubtitle :subtitle="'Tabla Clasificaciones'" :link="'/'" :linkText="'Mostrar tablas completas'" />
        <p v-if="groupA || groupB">tabla clasificaciones</p>
        <p v-else>Las tablas de clasificaciones aún no están definidas.</p>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import HeaderSubtitle from '../common/HeaderSubtitle.vue';

    defineProps({
        groupA: {
            type: Array,
            required: true
        },
        groupB: {
            type: Array,
            required: true
        },
    })
</script>