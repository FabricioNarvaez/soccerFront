<template>
    <div v-if="teamData" class="min-h-screen">
        <div 
            class="relative h-[40vh] min-h-[300px] w-full overflow-hidden bg-slate-900"
            :style="hasPhoto ? { 
                backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.9) 20%, transparent), url(${teamData.teamPhoto})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            } : {}"
        >
            <div class="container mx-auto h-full flex items-center px-6">
                <div class="flex flex-col md:flex-row items-center gap-6 z-10">
                    <img 
                        :src="teamData.shield" 
                        class="w-32 h-32 md:w-44 md:h-44 object-contain drop-shadow-2xl" 
                        :alt="teamData.name"
                    />
                    <div class="text-white text-center md:text-left">
                        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight">
                            {{ teamData.name }}
                        </h1>
                        <div class="mt-2 space-y-1 text-slate-300">
                            <p class="text-lg">
                                <span class="font-semibold text-white">Directivo:</span> {{ teamData.coachName }}
                            </p>
                            <p v-if="teamData.group" class="text-lg">
                                <span class="font-semibold text-white">Grupo:</span> {{ teamData.group }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <nav class="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
            <div class="container mx-auto px-4">
                <div class="flex space-x-8 overflow-x-auto no-scrollbar">
                    <RouterLink 
                        v-for="tab in ['General', 'Plantilla', 'Resultados', 'Sanciones']" 
                        :key="tab"
                        :to="{ path: `/equipo/${tab}`, query: { id, name }}"
                        class="py-4 px-2 text-sm font-bold uppercase tracking-wider transition-colors duration-200 border-b-2"
                        :class="actualPath === tab 
                            ? 'border-blue-600 text-blue-600' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                    >
                        {{ tab }}
                    </RouterLink>
                </div>
            </div>
        </nav>

        <main class="container mx-auto py-8 px-4">
            <GeneralInfo
                v-if="actualPath === 'General'" 
                :teamData="teamData" 
                :nextMatchInfo="nextMatchInfo"
            />
            <Squad v-else-if="actualPath === 'Plantilla'" :squad="teamData.playersDetails" />
            <ResultsView v-else-if="actualPath === 'Resultados'" :teamId="id" />
            
            <div v-else class="py-20 text-center">
                <StatusMessage :text="'Esta sección está en desarrollo. En breve, estará disponible.'" />
            </div>
        </main>
    </div>
    
    <div v-else class="h-screen flex items-center justify-center">
        <StatusMessage text="Cargando datos del equipo..." />
    </div>
</template>

<script setup>
    import { ref, watch, onMounted } from "vue";
    import { useRoute } from 'vue-router';
    import GeneralInfo from '@components/club/GeneralInfo.vue';
    import Squad from '@components/club/Squad.vue';
    import ResultsView from '@components/club/ResultsView.vue';
    import StatusMessage from "@components/common/StatusMessage.vue";

    const APIUrl = import.meta.env.VITE_API_URL;
    const route = useRoute();

    const id = route.query.id;
    const name = route.query.name;
    const actualPath = ref(route.path.split('/')[2] || 'General');
    const teamData = ref(null);
    const nextMatchInfo = ref(null);
    const hasPhoto = ref(false);

    watch(() => route.path, (newPath) => {
        actualPath.value = newPath.split('/')[2];
    });

    onMounted(async () => {
        try {
            const [teamRes, matchRes] = await Promise.all([
                fetch(`${APIUrl}/teams/team/${id}`),
                fetch(`${APIUrl}/matchweek/all`)
            ]);

            const teamDataResult = await teamRes.json();
            const matchWeekDataResult = await matchRes.json();

            // Lógica próximo partido (Pasar a backend en el futuro)
            const now = new Date();
            const nextMatchWeek = matchWeekDataResult.find(mw => 
                new Date(mw.date) > now && 
                mw.matches.some(m => m.localId._id === id || m.visitorId._id === id)
            );

            nextMatchInfo.value = nextMatchWeek 
                ? nextMatchWeek.matches.find(m => m.localId._id === id || m.visitorId._id === id) 
                : null;

            teamData.value = teamDataResult;
            hasPhoto.value = Boolean(teamDataResult.teamPhoto);
        } catch (error) {
            console.error('Error:', error);
        }
    });
</script>