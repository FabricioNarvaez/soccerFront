<template>
    <div class="rightMain">
        <HeaderSubtitle v-if="isSmallTable" :subtitle="'Clasificaciones'" :link="'/clasificaciones'" :linkText="'Clasificación completa'" />
        <div v-if="(groupA || groupB)">
            <div v-if="isSmallTable">
                <SmallTable v-if="groupA" :groupData="groupA" :groupName="'A'" />
                <SmallTable v-if="groupB" :groupData="groupB" :groupName="'B'" />
            </div>
            <div v-else-if="isBigTable">
                <BigTable v-if="groupA" :groupData="groupA" :groupName="'A'"/>
                <BigTable v-if="groupB" :groupData="groupB" :groupName="'B'"/>
            </div>
            <div class="legend">
                <span class="champions">Champions</span>
                <span class="uefa">UEFA</span>
            </div>
        </div>
        <p v-else>Las tablas de clasificaciones aún no están definidas.</p>
    </div>
</template>

<script setup>
    import HeaderSubtitle from '../common/HeaderSubtitle.vue';
    import SmallTable from '../common/SmallTable.vue';
    import BigTable from '../common/BigTable.vue';

    defineProps({
        groupA: {
            type: Array,
            required: true
        },
        groupB: {
            type: Array,
            required: true
        },
        isSmallTable: {
            type:Boolean,
            default: false
        },
        isBigTable: {
            type:Boolean,
            default: false
        }
    })
</script>

<style setup>
    @import "../../assets/css/common/table.css";
</style>