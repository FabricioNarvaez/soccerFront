<template>
    <div class="rightMain">
        <HeaderSubtitle :subtitle="'Clasificaciones'" :link="'/classification'" :linkText="'Clasificación completa'" />
        <div v-if="groupA || groupB">
            <SmallTable v-if="groupA" :groupData="groupA" :groupName="'A'" />
            <SmallTable v-if="groupB" :groupData="groupB" :groupName="'B'" />
        </div>
        <p v-else>Las tablas de clasificaciones aún no están definidas.</p>

        <div class="legend">
            <span class="champions">Champions</span>
            <span class="uefa">UEFA</span>
        </div>
    </div>
</template>

<script setup>
    import HeaderSubtitle from '../common/HeaderSubtitle.vue';
    import SmallTable from './SmallTable.vue';

    defineProps({
        groupA: {
            type: Array,
            required: true
        },
        groupB: {
            type: Array,
            required: true
        }
    })
</script>

<style setup>
    @import "../../assets/css/common/table.css";
</style>