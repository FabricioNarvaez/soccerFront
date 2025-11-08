<template>
    <div class="p-4 bg-white rounded-xl h-full">
        <HeaderSubtitle :subtitle="'Próxima Jornada'" :link="'/'" :linkText="'TODAS LAS JORNADAS'" />
        <StatusMessage v-if="matchWeeksStore.loading" :text="'Cargando Próxima Jornada...'"/>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            v-else-if="matchWeeksStore.upcomingMatchweek && matchWeeksStore.upcomingMatchweek.matches.length > 0"
        >
            <div class="match-card bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300"
                v-for="(match, key) in matchWeeksStore.upcomingMatchweek.matches" 
                :key="key" 
            >
                <div class="flex items-center justify-between space-x-2">
                    <div class="flex flex-col items-center space-y-1 w-5/12">
                        <img class="w-full max-w-[80px] h-auto object-contain transition-transform duration-300 hover:scale-105" 
                            :src="match.localId.shield" 
                            :alt="`Escudo de ${match.localId.name}`"
                        />
                        <p class="text-sm font-semibold text-gray-800 text-center truncate w-full">{{ match.localId.name }}</p>
                    </div>

                    <p class="text-xl font-extrabold text-dark-blue w-2/12 text-center select-none">VS</p>

                    <div class="flex flex-col items-center space-y-1 w-5/12">
                        <img class="w-full max-w-[80px] h-auto object-contain transition-transform duration-300 hover:scale-105" 
                            :src="match.visitorId.shield" 
                            :alt="`Escudo de ${match.visitorId.name}`"
                        />
                        <p class="text-sm font-semibold text-gray-800 text-center truncate w-full">{{ match.visitorId.name }}</p>
                    </div>
                </div>

                <div class="mt-4 pt-3 border-t border-gray-200 text-center text-sm font-medium text-gray-600 bg-gray-100 p-2 rounded-md">
                    <span class="font-bold text-dark-blue">{{ match.formattedDate }}</span> | <span>{{ match.formattedHour }}</span> 
                </div>
            </div>
        </div>

        <StatusMessage v-else :text="'Las jornadas aún no están definidas'"/>
    </div>
</template>

<script setup>
    import HeaderSubtitle from '@components/common/HeaderSubtitle.vue';
    import StatusMessage from "@components/common/StatusMessage.vue";
    
    import { useMatchWeeksStore } from '@store/matchWeeksStore';
    const matchWeeksStore = useMatchWeeksStore();
</script>