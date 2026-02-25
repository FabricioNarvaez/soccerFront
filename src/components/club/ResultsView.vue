<template>
    <div class="space-y-8">
            <div class="mt-8 space-y-8">
                <div v-for="match in processedResults" :key="match.matchId" 
                    class="relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:shadow-xl"
                    :style="{ 
                        borderColor: match.statusClasses?.border, 
                        backgroundColor: match.statusClasses?.bgLight 
                    }"
                >
                    <div class="absolute left-0 top-0 bottom-0 w-2" 
                         :style="{ backgroundColor: match.statusClasses?.bg }"></div>

                    <div class="bg-slate-900 py-3 px-6 flex justify-between items-center">
                        <div class="flex items-center gap-3">
                            <span v-if="match.statusClasses" 
                                class="text-[10px] font-black text-white px-2 py-0.5 rounded uppercase tracking-widest shadow-sm" 
                                :style="{ backgroundColor: match.statusClasses.bg }">
                                {{ match.statusText }}
                            </span>
                            <span class="text-[10px] font-black text-blue-400 uppercase tracking-widest">Jornada {{ match.round }}</span>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ match.date }}</span>
                    </div>

                    <div class="p-8">
                        <div class="grid grid-cols-3 gap-8 items-start">
                            
                            <div class="flex flex-col items-center">
                                <img :src="match.local.shield" class="w-20 h-20 object-contain mb-4 drop-shadow-md" />
                                <p class="text-[12px] font-black text-slate-800 uppercase tracking-tight text-center mb-6">{{ match.local.name }}</p>
                                
                                <div class="w-full space-y-2.5">
                                    <div v-for="(goal, i) in match.local.scorers" :key="'gl'+i" class="flex items-center justify-center gap-2">
                                        <span class="text-xs">⚽</span>
                                        <span class="text-[11px] font-bold text-slate-700">{{ goal.name }}</span>
                                    </div>
                                    <div v-for="(card, i) in match.local.cards" :key="'cl'+i" class="flex items-center justify-center gap-2">
                                        <div class="transform rotate-6 shadow-sm rounded-[1px]" 
                                            :style="{ 
                                                backgroundColor: card.type === 'Y' ? '#fbbf24' : '#dc2626',
                                                width: '10px',
                                                height: '14px',
                                                minWidth: '10px',
                                                minHeight: '14px',
                                                display: 'block'
                                            }"
                                        ></div>
                                        <span class="text-[10px] font-bold text-slate-400 uppercase italic">{{ card.name }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col items-center justify-center pt-2">
                                <div class="flex items-center gap-5 bg-white px-8 py-4 rounded-3xl border-2 shadow-inner h-fit" 
                                     :style="{ borderColor: match.statusClasses?.border }">
                                    <span class="text-5xl font-black text-slate-800 tabular-nums">{{ match.local.goals }}</span>
                                    <span class="text-2xl font-black text-slate-200">-</span>
                                    <span class="text-5xl font-black text-slate-800 tabular-nums">{{ match.visitor.goals }}</span>
                                </div>
                                <span class="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Finalizado</span>
                            </div>

                            <div class="flex flex-col items-center">
                                <img :src="match.visitor.shield" class="w-20 h-20 object-contain mb-4 drop-shadow-md" />
                                <p class="text-[12px] font-black text-slate-800 uppercase tracking-tight text-center mb-6">{{ match.visitor.name }}</p>
                                
                                <div class="w-full space-y-2.5">
                                    <div v-for="(goal, i) in match.visitor.scorers" :key="'gv'+i" class="flex items-center justify-center gap-2">
                                        <span class="text-xs">⚽</span>
                                        <span class="text-[11px] font-bold text-slate-700">{{ goal.name }}</span>
                                    </div>
                                    <div v-for="(card, i) in match.visitor.cards" :key="'cv'+i" class="flex items-center justify-center gap-2">
                                        <div class="transform rotate-6 shadow-sm rounded-[1px]" 
                                            :style="{ 
                                                backgroundColor: card.type === 'Y' ? '#fbbf24' : '#dc2626',
                                                width: '10px',
                                                height: '14px',
                                                minWidth: '10px',
                                                minHeight: '14px',
                                                display: 'block'
                                            }"
                                        ></div>
                                        <span class="text-[10px] font-bold text-slate-400 uppercase italic">{{ card.name }}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const MY_TEAM = "Cancheritos FC";

const mockResults = ref([
    {
        matchId: 101, round: 1, date: "15 FEB 2026",
        local: {
            name: "Cancheritos FC",
            shield: "https://res.cloudinary.com/dzd68sxue/image/upload/v1695395236/WEBP/Cancheritos_qdbnsw.webp",
            goals: 3,
            scorers: [{ name: "Kevin" }, { name: "Santi" }, { name: "Kevin" }],
            cards: [{ name: "Santi", type: "Y" }]
        },
        visitor: {
            name: "Pájaro Azul FC",
            shield: "https://res.cloudinary.com/dzd68sxue/image/upload/v1695398424/WEBP/pajaro-azul-qge5bh_xmfsyj.webp",
            goals: 1,
            scorers: [{ name: "Ramírez" }],
            cards: [{ name: "López", type: "Y" }]
        }
    },
    {
        matchId: 102, round: 2, date: "08 FEB 2026",
        local: {
            name: "Rayo Verde",
            shield: "https://placehold.co/100x100/16a34a/white?text=RV",
            goals: 2,
            scorers: [{ name: "Carlos" }, { name: "Pérez" }],
            cards: [{ name: "Pérez", type: "Y" }]
        },
        visitor: {
            name: "Cancheritos FC",
            shield: "https://res.cloudinary.com/dzd68sxue/image/upload/v1695395236/WEBP/Cancheritos_qdbnsw.webp",
            goals: 1,
            scorers: [{ name: "Dani" }],
            cards: [{ name: "Kevin", type: "R" }]
        }
    },
    {
        matchId: 103, round: 3, date: "09 FEB 2026",
        local: {
            name: "Rayo Verde",
            shield: "https://placehold.co/100x100/16a34a/white?text=RV",
            goals: 2,
            scorers: [{ name: "Carlos" }, { name: "Pérez" }],
            cards: [{ name: "Pérez", type: "Y" }]
        },
        visitor: {
            name: "Cancheritos FC",
            shield: "https://res.cloudinary.com/dzd68sxue/image/upload/v1695395236/WEBP/Cancheritos_qdbnsw.webp",
            goals: 2,
            scorers: [{ name: "Dani" }],
            cards: [{ name: "Kevin", type: "R" }]
        }
    }
]);

const processedResults = computed(() => {
    if (!mockResults.value) return [];

    return mockResults.value.map(match => {
        const isLocal = match.local.name === MY_TEAM;
        const myGoals = isLocal ? match.local.goals : match.visitor.goals;
        const opponentGoals = isLocal ? match.visitor.goals : match.local.goals;

        let statusKey = 'empate';
        if (myGoals > opponentGoals) statusKey = 'victoria';
        else if (myGoals < opponentGoals) statusKey = 'derrota';

        const config = {
            victoria: {
                text: 'Victoria',
                bg: '#16a34a', // green-600
                bgLight: '#f0fdf4', // green-50
                border: '#22c55e'  // green-500
            },
            derrota: {
                text: 'Derrota',
                bg: '#dc2626', // red-600
                bgLight: '#fef2f2', // red-50
                border: '#ef4444'  // red-500
            },
            empate: {
                text: 'Empate',
                bg: '#64748b', // slate-500
                bgLight: '#ffffff',
                border: '#e2e8f0'  // slate-200
            }
        };

        return { 
            ...match, 
            statusText: config[statusKey].text, 
            statusClasses: config[statusKey] 
        };
    });
});
</script>