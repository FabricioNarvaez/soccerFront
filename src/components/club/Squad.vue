<template>
    <div class="space-y-8">
        <section class="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <HeaderSubtitle 
                subtitle="Plantilla Oficial" 
                :link="'/contacto'"
            />

            <div v-if="groupedPlayers.length > 0" class="mt-8 space-y-12">
                <div v-for="group in groupedPlayers" :key="group.position" class="space-y-4">
                    <h4 class="text-sm font-black uppercase tracking-widest text-blue-600 border-l-4 border-blue-600 pl-3">
                        {{ group.position }}
                    </h4>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <div class="group relative bg-gray-50 rounded-xl p-4 border border-gray-100 transition-all duration-300 hover:shadow-lg hover:bg-white hover:-translate-y-1 hover:cursor-pointer"
                            v-for="player in group.players" 
                            :key="player._id"
                            
                        >
                            <div class="flex items-center gap-4">
                                <div class="relative">
                                    <img class="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm bg-gray-200"
                                        :src="player.photo || 'https://placehold.co/200x200/e2e8f0/64748b?text=Jugador'"
                                        :alt="player.name"
                                    />
                                    <span v-if="player.playerNumber" class="absolute -bottom-1 -right-1 bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-white">
                                        #{{ player.playerNumber }}
                                    </span>
                                </div>
                                
                                <div class="flex-1 min-w-0">
                                    <p class="text-gray-900 font-bold truncate group-hover:text-blue-600 transition-colors">
                                        {{ player.name }}
                                    </p>
                                    <p class="text-xs text-gray-500 font-medium truncate uppercase tracking-tighter">
                                        {{ player.nickname || 'Sin apodo' }}
                                    </p>
                                </div>
                            </div>

                            <div class="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center text-[11px] font-bold text-gray-400 uppercase">
                                <span class="text-blue-500">Goles: {{ player.stats?.goals || 0 }}</span>
                                <span v-if="!player.cardsPaid" class="text-red-500">Tarjetas pendientes de pago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="py-12">
                <StatusMessage text="No hay jugadores registrados en la plantilla oficial de este equipo." />
            </div>
        </section>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import HeaderSubtitle from '@components/common/HeaderSubtitle.vue';
import StatusMessage from "@components/common/StatusMessage.vue";

const props = defineProps({
    squad: {
        type: Array,
        default: () => []
    }
});

const groupedPlayers = computed(() => {
    if (!props.squad || props.squad.length === 0) return [];

    const order = ['Portero', 'Defensa', 'Centrocampista', 'Delantero'];
    const groups = {};

    props.squad.forEach(player => {
        const pos = player.position || 'Otros';
        if (!groups[pos]) groups[pos] = [];
        groups[pos].push(player);
    });

    return Object.keys(groups)
        .sort((a, b) => {
            const indexA = order.indexOf(a);
            const indexB = order.indexOf(b);
            return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
        })
        .map(pos => ({
            position: pos,
            players: groups[pos].sort((a, b) => (a.number || 99) - (b.number || 99)) // También ordenamos por dorsal
        }));
});
</script>

<style scoped>
    .truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>