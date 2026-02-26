<template>
    <div class="min-h-screen p-4 mt-5">
            <ViewHeader :title="'EQUIPOS DEL TORNEO'" :subtitle="'Temporada Verano'"/>
            <StatusMessage v-if="teamsStore.loading" :text="'Cargando Equipos...'"/>

            <div v-else-if="teamsStore.allTeams.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <div v-for="team in teamsStore.allTeams" :key="team._id"
                class="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 ease-out border border-slate-100 overflow-hidden transform hover:-translate-y-2"
                >
                    <RouterLink :to="{ path: '/equipo/General', query: { id: team._id, name: team.name }}">
                        <div class="aspect-square bg-gradient-to-br from-blue-400 to-white flex items-center justify-center p-10 group-hover:from-blue-600 group-hover:to-blue-600 transition-colors duration-500">
                            <img 
                                :src="team.shield" 
                                :alt="`Escudo de ${team.name}`"
                                class="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        <div class="p-6">
                            <h3 class="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors truncate uppercase italic">
                                {{ team.name }}
                            </h3>
                            
                            <div class="space-y-3">
                                <div class="flex items-center justify-between py-2 border-b border-slate-50">
                                <span class="text-slate-400 text-sm font-medium">Directivo</span>
                                <span class="text-slate-700 text-sm font-bold truncate max-w-[120px]">
                                    {{ team.coachName || 'N/A' }}
                                </span>
                                </div>
                                
                                <div class="flex items-center justify-between">
                                <span class="text-slate-400 text-sm font-medium">Grupo</span>
                                <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-wider">
                                    Grupo {{ team.group || '-' }}
                                </span>
                                </div>
                            </div>
                        </div>

                        <div class="w-full py-4 text-center bg-slate-900 text-white font-bold text-sm tracking-widest uppercase group-hover:bg-blue-600 transition-colors duration-300">
                        Ver Perfil
                        </div>
                    </RouterLink>
                </div>
            </div>

            <div v-else class="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p class="text-slate-400 text-lg">No hay equipos disponibles en este momento.</p>
            </div>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { useTeamsStore } from '@store/teamsStore.js';
    import ViewHeader from '@components/common/ViewHeader.vue';
    import StatusMessage from "@components/common/StatusMessage.vue";

    const teamsStore = useTeamsStore();

    onMounted(() => {
    if (teamsStore.allTeams.length === 0) {
        teamsStore.getAllTeams();
    }
    });
</script>

<style scoped>
    .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
</style>