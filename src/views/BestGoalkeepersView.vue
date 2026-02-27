<template>
    <div class="mb-8 mx-4 md:mx-0">
        <div class="flex justify-between items-end mb-8">
            <div class="flex justify-between w-full">
                <ViewHeader :title="'Mejores Porteros'"/>
            
                <div class="flex items-center gap-3 text-sm font-bold text-slate-500">
                    <span>MOSTRAR:</span>
                    <select v-model="limit" class="bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-orange-500 transition-colors cursor-pointer shadow-sm">
                        <option :value="10">10 Jugadores</option>
                        <option :value="20">20 Jugadores</option>
                        <option :value="30">30 Jugadores</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-gray-100">
        <table class="w-full text-left border-collapse">
            <thead>
            <tr class="bg-slate-50/50 border-b border-gray-100">
                <th class="py-5 px-8 text-xs font-black uppercase tracking-widest text-slate-400">Pos</th>
                <th class="py-5 px-4 text-xs font-black uppercase tracking-widest text-slate-400">Jugador</th>
                <th class="py-5 px-4 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Goles</th>
            </tr>
            </thead>
            <tbody>
            <tr 
                v-for="(player, index) in displayedPlayers" 
                :key="player.id"
                :class="[
                'group transition-all duration-300',
                index === 0 ? 'bg-orange-50/50' : 'hover:bg-gray-50'
                ]"
            >
                <td class="py-6 px-8 relative">
                <div class="flex items-center gap-4">
                    <span :class="[
                        'text-2xl font-black italic',
                        index === 0 ? 'text-orange-500' : 'text-slate-300'
                    ]">
                        {{ index + 1 }}
                    </span>
                </div>
                </td>

                <td class="py-6 px-4">
                <div class="flex items-center gap-4">
                    <div class="relative">
                        <img :src="player.photo || 'https://placehold.co/200x200/e2e8f0/64748b?text=Jugador'" class="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-white" />
                        <span v-if="player.playerNumber" class="absolute -bottom-1 -right-1 bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-white">
                            #{{ player.playerNumber }}
                        </span>
                        <div v-if="index === 0" class="absolute -top-3 -right-3 bg-orange-500 text-white p-1 rounded-lg rotate-12 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M2 7l5 5 5-10 5 10 5-5v10h-20v-10z"/></svg>
                        </div>
                    </div>
                    <div>
                    <p class="font-black text-slate-800 uppercase tracking-tight text-lg">{{ player.name }}</p>
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-tighter">{{ player.team }}</p>
                    </div>
                </div>
                </td>

                <td class="py-6 px-8 text-right">
                <span :class="[
                    'text-3xl font-black tabular-nums italic',
                    index === 0 ? 'text-orange-500' : 'text-slate-800'
                ]">
                    {{ player.goals }}
                </span>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ViewHeader from '@components/common/ViewHeader.vue';

const limit = ref(10);

const players = ref([
    { id: 13, name: "Gonçalo Guedes", team: "Valencia CF", goals: 1, playerNumber: 7, photo: "" },
    { id: 12, name: "Randal Kolo Muani", team: "Eintracht Frankfurt", goals: 2, playerNumber: 27, photo: "" },
    { id: 11, name: "Donyell Malen", team: "Borussia Dortmund", goals: 2, playerNumber: 9, photo: "" },
    { id: 10, name: "Gonçalo Guedes", team: "Valencia CF", goals: 3, playerNumber: 7, photo: "" },
    { id: 9, name: "Randal Kolo Muani", team: "Eintracht Frankfurt", goals: 4, playerNumber: 27, photo: "" },
    { id: 8, name: "Donyell Malen", team: "Borussia Dortmund", goals: 4, playerNumber: 9, photo: "" },
    { id: 7, name: "Gonçalo Guedes", team: "Valencia CF", goals: 5, playerNumber: 7, photo: "" },
    { id: 6, name: "Randal Kolo Muani", team: "Eintracht Frankfurt", goals: 6, playerNumber: 27, photo: "" },
    { id: 5, name: "Donyell Malen", team: "Borussia Dortmund", goals: 6, playerNumber: 9, photo: "" },
    { id: 4, name: "Gonçalo Ramos", team: "PSV Eindhoven", goals: 7, playerNumber: 9, photo: "" },
    { id: 3, name: "Victor Boniface", team: "Bayer Leverkusen", goals: 8, playerNumber: 22, photo: "" },
    { id: 2, name: "Santiago Giménez", team: "Feyenoord", goals: 9, playerNumber: 29, photo: "" },
    { id: 1, name: "Marcus Rashford", team: "Manchester United", goals: 12, playerNumber: 10, photo: "" },
]);

const displayedPlayers = computed(() => {
    return players.value.slice(0, limit.value);
});
</script>