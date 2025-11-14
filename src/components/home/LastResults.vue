<template>
    <div class="bg-white p-4 rounded-xl mt-8">
        <HeaderSubtitle :subtitle="'Últimos Resultados'" :link="'/'" :linkText="'ver todas las jornadas'" />
        <StatusMessage v-if="matchWeeksStore.loading" :text="'Cargando resultados...'"/>

        <div v-else-if="matches.length > 0" class="space-y-4 pt-3">
            <div v-for="match in matches" :key="match.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
                
                <div class="flex items-center w-5/12 justify-end space-x-2 text-right">
                    <span class="text-sm font-semibold text-gray-800 truncate">{{ match.team1Name }}</span>
                    <img :src="match.team1Shield" :alt="match.team1Name" class="w-6 h-6 object-contain rounded-full">
                </div>
                
                <div class="flex items-center space-x-2 w-2/12 justify-center">
                    <span class="text-lg font-extrabold" :class="{ 'text-green-600': match.score1 > match.score2, 'text-red-600': match.score1 < match.score2, 'text-gray-700': match.score1 === match.score2 }">{{ match.score1 }}</span>
                    <span class="text-sm text-gray-500">-</span>
                    <span class="text-lg font-extrabold" :class="{ 'text-green-600': match.score2 > match.score1, 'text-red-600': match.score2 < match.score1, 'text-gray-700': match.score1 === match.score2 }">{{ match.score2 }}</span>
                </div>
                
                <div class="flex items-center w-5/12 justify-start space-x-2 text-left">
                    <img :src="match.team2Shield" :alt="match.team2Name" class="w-6 h-6 object-contain rounded-full">
                    <span class="text-sm font-semibold text-gray-800 truncate">{{ match.team2Name }}</span>
                </div>
            </div>
            
            <p class="text-xs text-gray-400 text-right pt-2">Jornada 5 | Finalizado</p>
        </div>

        <StatusMessage v-else :text="'No hay resultados disponibles de la última jornada.'"/>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import HeaderSubtitle from '@components/common/HeaderSubtitle.vue';
    import StatusMessage from "@components/common/StatusMessage.vue";

    import { useMatchWeeksStore } from '@store/matchWeeksStore';
    const matchWeeksStore = useMatchWeeksStore();

    const matches = ref([
        { 
            id: 1, 
            team1Name: 'Pájaro Azul FC', 
            team1Shield: 'https://placehold.co/100x100/1e40af/ffffff?text=P', 
            score1: 3, 
            team2Name: 'Spencer FC', 
            team2Shield: 'https://placehold.co/100x100/1f2937/ffffff?text=S', 
            score2: 1 
        },
        { 
            id: 2, 
            team1Name: 'Amistad C.D.', 
            team1Shield: 'https://placehold.co/100x100/34d399/ffffff?text=A', 
            score1: 0, 
            team2Name: 'Impersiva S.A.', 
            team2Shield: 'https://placehold.co/100x100/f97316/ffffff?text=I', 
            score2: 0 
        },
        { 
            id: 3, 
            team1Name: 'Canchecitos FC', 
            team1Shield: 'https://placehold.co/100x100/f59e0b/000000?text=C', 
            score1: 2, 
            team2Name: 'Peñarol A.', 
            team2Shield: 'https://placehold.co/100x100/dc2626/ffffff?text=P', 
            score2: 5 
        }
    ]);
</script>