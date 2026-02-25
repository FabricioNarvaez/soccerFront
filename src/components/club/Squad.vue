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
                        <div 
                            v-for="player in group.players" 
                            :key="player._id"
                            @click="openModal(player)"
                            class="group relative bg-gray-50 rounded-xl p-4 border border-gray-100 transition-all duration-300 hover:shadow-lg hover:bg-white hover:-translate-y-1 hover:cursor-pointer"
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
                                <span class="text-blue-500">Goles: {{ player.goals || 0 }}</span>
                                <span v-if="!player.cardsPaid" class="text-red-500 flex items-center gap-1">
                                    <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                    Pendiente pago
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="py-12">
                <StatusMessage text="No hay jugadores registrados en la plantilla oficial de este equipo." />
            </div>
        </section>

        <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" @click.self="closeModal">
            <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
                <div class="relative h-32 bg-slate-900">
                    <button @click="closeModal" class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div class="absolute -bottom-12 left-1/2 -translate-x-1/2">
                        <img :src="selectedPlayer.photo || 'https://placehold.co/200x200/e2e8f0/64748b?text=Jugador'" 
                             class="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover bg-gray-100" />
                    </div>
                </div>

                <div class="pt-16 pb-8 px-8 text-center">
                    <h3 class="text-2xl font-black text-slate-800 mb-3">{{ selectedPlayer.name }}</h3>
                    <p class="text-blue-600 font-bold uppercase tracking-widest text-sm mb-6 bg-slate-500/20 inline-block px-3 py-1 rounded-full">
                        {{ selectedPlayer.position }} {{ selectedPlayer.playerNumber ? `#${selectedPlayer.playerNumber}` : '' }}
                    </p>

                    <div class="grid grid-cols-3 gap-4 mb-8">
                        <div class="p-3 bg-gray-50 rounded-2xl">
                            <p class="text-[10px] font-bold text-gray-400 uppercase">Goles</p>
                            <p class="text-xl font-black text-slate-700">{{ selectedPlayer.goals || 0 }}</p>
                        </div>
                        <div class="p-3 bg-gray-50 rounded-2xl">
                            <p class="text-[10px] font-bold text-gray-400 uppercase">Amarillas</p>
                            <p class="text-xl font-black text-slate-700">{{ selectedPlayer.yellowCards || 0 }}</p>
                        </div>
                        <div class="p-3 bg-gray-50 rounded-2xl">
                            <p class="text-[10px] font-bold text-gray-400 uppercase">Rojas</p>
                            <p class="text-xl font-black text-slate-700">{{ selectedPlayer.redCards || 0 }}</p>
                        </div>
                    </div>

                    <div v-if="selectedPlayer.yellowPendingPayment > 0 || selectedPlayer.RedPendingPayment > 0" 
                         class="bg-red-50 border border-red-100 rounded-2xl p-4 text-left">
                        <p class="text-xs font-black text-red-800 uppercase mb-2 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Tarjetas pendientes de pago
                        </p>
                        <ul class="text-sm font-bold text-red-600 space-y-1">
                            <li v-if="selectedPlayer.yellowPendingPayment > 0">
                                • Amarillas por pagar: {{ selectedPlayer.yellowPendingPayment }}
                            </li>
                            <li v-if="selectedPlayer.RedPendingPayment > 0">
                                • Rojas por pagar: {{ selectedPlayer.RedPendingPayment }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import HeaderSubtitle from '@components/common/HeaderSubtitle.vue';
    import StatusMessage from "@components/common/StatusMessage.vue";

    const props = defineProps({
        squad: {
            type: Array,
            default: () => []
        }
    });

    const isModalOpen = ref(false);
    const selectedPlayer = ref(null);

    const openModal = (player) => {
        selectedPlayer.value = player;
        isModalOpen.value = true;
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        isModalOpen.value = false;
        selectedPlayer.value = null;
        document.body.style.overflow = 'auto';
    };

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
                players: groups[pos].sort((a, b) => (a.playerNumber || 99) - (b.playerNumber || 99))
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