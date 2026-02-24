<template>
    <div class="space-y-10">
        <section class="overflow-hidden bg-white rounded-2xl shadow-md border border-gray-100">
            <div class="bg-slate-900 py-4 px-6">
                <h3 class="text-white font-bold uppercase tracking-widest text-center text-sm">Próximo Encuentro</h3>
            </div>
            
            <div class="p-8">
                <div v-if="nextMatchInfo" class="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
                    <div class="flex flex-col items-center text-center order-2 md:order-1">
                        <img :src="localInfo.shield" class="w-24 h-24 object-contain mb-3 drop-shadow-md" />
                        <p class="text-xl font-bold text-gray-800">{{ localInfo.name }}</p>
                    </div>

                    <div class="flex flex-col items-center order-1 md:order-2 bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <div class="flex text-center">
                            <div v-for="(val, label) in countdownItems" :key="label" class="flex items-center">
                                <div>
                                    <p class="text-3xl font-black text-blue-600 tabular-nums">{{ val }}</p>
                                    <p class="text-[10px] font-bold text-gray-400 uppercase">{{ label }}</p>
                                </div>
                                <p v-if="label !== 'seg'" class="text-3xl font-black text-gray-300 px-4">:</p>
                            </div>
                        </div>
                        <div class="mt-4 pt-4 border-t border-gray-200 w-full text-center text-l">
                            <p class="font-bold text-gray-600">{{ formattedDate }}</p>
                            <p class="text-blue-600 font-extrabold">{{ formattedHour }}</p>
                        </div>
                    </div>

                    <div class="flex flex-col items-center text-center order-3">
                        <img :src="visitorInfo.shield" class="w-24 h-24 object-contain mb-3 drop-shadow-md" />
                        <p class="text-xl font-bold text-gray-800">{{ visitorInfo.name }}</p>
                    </div>
                </div>
                <StatusMessage v-else text="No hay partidos programados próximamente." />
            </div>
        </section>

        <section class="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <HeaderSubtitle subtitle="Estadísticas de Temporada" />
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 items-center">
                <div class="h-[300px] w-full max-w-[300px] mx-auto">
                    <Doughnut :data="chartData" :options="chartOptions" />
                </div>

                <div class="space-y-8">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="p-4 rounded-xl bg-green-50 border border-blue-100 flex items-center justify-between">
                            <span class="font-bold text-green-900">Victorias</span>
                            <span class="text-2xl font-black text-green-600">{{ teamData.PG }}</span>
                        </div>
                        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                            <span class="font-bold text-slate-700">Empates</span>
                            <span class="text-2xl font-black text-slate-500">{{ teamData.PE }}</span>
                        </div>
                        <div class="p-4 rounded-xl bg-red-50 border border-red-100 flex items-center justify-between">
                            <span class="font-bold text-red-900">Derrotas</span>
                            <span class="text-2xl font-black text-red-600">{{ teamData.PP }}</span>
                        </div>
                        <div class="p-4 rounded-xl bg-gray-900 flex items-center justify-between">
                            <span class="font-bold text-white">Jugados</span>
                            <span class="text-2xl font-black text-blue-400">{{ teamData.PG + teamData.PE + teamData.PP }}</span>
                        </div>
                    </div>

                    <div class="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <HeaderSubtitle subtitle="Tarjetas" />
                        <div class="flex justify-around mt-3">
                            <div v-for="(val, key) in disciplineCards" :key="key" class="text-center">
                                <div :class="['w-6 h-8 mx-auto rounded-sm mb-2 shadow-sm', key]"></div>
                                <p class="text-lg font-black text-gray-800">{{ val }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted } from 'vue';
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
    import { Doughnut } from 'vue-chartjs';
    import HeaderSubtitle from '@components/common/HeaderSubtitle.vue';
    import StatusMessage from "@components/common/StatusMessage.vue";

    ChartJS.register(ArcElement, Tooltip, Legend);

    const props = defineProps({
        teamData: { type: Object, required: true },
        nextMatchInfo: { type: Object }
    });

    const timeRemaining = ref(0);
    const timerId = ref(null);
    const targetDate = computed(() => props.nextMatchInfo?.hour ? new Date(props.nextMatchInfo.hour) : null);

    const countdownItems = computed(() => ({
        días: Math.floor(timeRemaining.value / (1000 * 60 * 60 * 24)),
        horas: Math.floor((timeRemaining.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        min: Math.floor((timeRemaining.value % (1000 * 60 * 60)) / (1000 * 60)),
        seg: Math.floor((timeRemaining.value % (1000 * 60)) / 1000)
    }));

    const formattedDate = computed(() => {
        if (!targetDate.value) return '';
        return targetDate.value.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    });

    const formattedHour = computed(() => {
        if (!targetDate.value) return '';
        return targetDate.value.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) + ' H';
    });

    const localInfo = computed(() => props.nextMatchInfo?.localId || {});
    const visitorInfo = computed(() => props.nextMatchInfo?.visitorId || {});

    const disciplineCards = computed(() => ({
        'bg-blue-600': props.teamData.TAZ || 0,
        'bg-yellow-400': props.teamData.TAM || 0,
        'bg-gradient-to-br from-yellow-400 to-red-600': props.teamData.DAM || 0,
        'bg-red-600': props.teamData.TRO || 0
    }));

    const chartData = computed(() => {
        const pg = props.teamData.PG || 0;
        const pe = props.teamData.PE || 0;
        const pp = props.teamData.PP || 0;
        const isZero = pg === 0 && pe === 0 && pp === 0;

        return {
            labels: ['Derrotas', 'Empates', 'Victorias'],
            datasets: [{
                backgroundColor: ['#f74040', '#7f91ab', '#26cb63'],
                data: isZero ? [1, 1, 1] : [pp, pe, pg],
                borderWidth: 5,
                hoverBorderWidth: 5,
            }]
        };
    });

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        }
    };

    onMounted(() => {
        if (targetDate.value) {
            const calculate = () => {
                const now = new Date();
                const diff = targetDate.value - now;
                timeRemaining.value = diff > 0 ? diff : 0;
            };
            calculate();
            timerId.value = setInterval(calculate, 1000);
        }
    });

    onUnmounted(() => {
        if (timerId.value) clearInterval(timerId.value);
    });
</script>

<style scoped>
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>