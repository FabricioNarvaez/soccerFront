<template>
    <div class="min-h-screen bg-[#08080a] text-white p-6 md:p-12 overflow-x-auto no-scrollbar shadow-[0_0_0_100vmax_#08080a] clip-path-fix">
        <div class="mb-16 ml-4">
            <h1 class="text-6xl font-black italic tracking-tighter uppercase text-white inline-block">
                Europa League
            </h1>
            <div class="h-1 w-32 bg-orange-500 mt-2 shadow-[0_0_15px_#f97316]"></div>
        </div>

        <div class="flex items-start gap-0 pb-20 min-w-max pt-10">
            <div class="flex flex-col items-center">
                <h2 class="phase-title">Octavos de Final</h2>
                <div class="flex flex-col gap-12 pr-20">
                    <div v-for="i in 4" class="relative group-pair" :key="'g-oct' + i">
                        <div class="flex flex-col gap-8">
                            <div v-for="j in 2" class="relative" :key="'oct-m' + i + j">
                                <PlayoffMatch
                                    :team1="teams[0]"
                                    :team2="teams[1]"
                                />
                                <div class="line-horizontal-out"></div>
                            </div>
                        </div>
                        <div class="line-vertical-connector"></div>
                        <div class="line-horizontal-advance"></div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col items-center">
                <h2 class="phase-title">Cuartos de Final</h2>
                <div class="flex flex-col gap-[14.5rem] px-20 pt-[3.8rem]">
                    <div v-for="i in 2" class="relative group-pair" :key="'g-cua' + i">
                        <div class="flex flex-col gap-[10.5rem]">
                            <div v-for="j in 2" class="relative" :key="'cua-m' + i + j">
                                <PlayoffMatch
                                    :team1="teams[2]"
                                    :team2="teams[3]"
                                />
                                <div class="line-horizontal-out"></div>
                            </div>
                        </div>
                        <div class="line-vertical-connector"></div>
                        <div class="line-horizontal-advance"></div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col items-center">
                <h2 class="phase-title">Semifinal</h2>
                <div class="flex flex-col px-20 pt-[12.5rem]">
                    <div class="relative group-pair">
                        <div class="flex flex-col gap-[31rem]">
                            <div v-for="i in 2" class="relative" :key="'semi' + i">
                                <PlayoffMatch
                                    :team1="teams[0]"
                                    :team2="teams[2]"
                                />
                                <div class="line-horizontal-out"></div>
                            </div>
                        </div>
                        <div class="line-vertical-connector"></div>
                        <div class="line-horizontal-advance !w-24 !-right-24 shadow-[0_0_8px_#f97316]"></div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col items-center pl-20 pt-[3.8rem]">
                <h2 class="phase-title opacity-0">Espaciador</h2>

                <div class="relative flex flex-col items-center justify-center min-h-[700px]">
                    <div class="mb-12 group text-center">
                        <div class="absolute -inset-10 bg-orange-600/10 blur-[60px] rounded-full"></div>
                        <img class="h-52 w-auto mx-auto drop-shadow-[0_0_30px_rgba(249,115,22,0.4)] relative z-10" src="/europa-league.png"/>
                        <h2 class="phase-title-final !mt-4">Gran Final</h2>
                    </div>

                    <div class="relative z-20">
                        <PlayoffMatch
                            :team1="teams[0]"
                            :team2="teams[3]"
                            :isFinal="true"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import PlayoffMatch from "@components/playoffs/PlayoffMatchUEFA.vue";

    const teams = ref([
        {
            name: "Cancheritos FC",
            logo: "https://res.cloudinary.com/dzd68sxue/image/upload/v1695395236/WEBP/Cancheritos_qdbnsw.webp",
            score: 3,
        },
        {
            name: "Pájaro Azul",
            logo: "https://res.cloudinary.com/dzd68sxue/image/upload/v1695398424/WEBP/pajaro-azul-qge5bh_xmfsyj.webp",
            score: 1,
        },
        {
            name: "Rayo Verde",
            logo: "https://placehold.co/100x100/16a34a/white?text=RV",
            score: 2,
        },
        {
            name: "Titanes FC",
            logo: "https://placehold.co/100x100/1e293b/white?text=T",
            score: 0,
        },
    ]);
</script>

<style scoped>
    .clip-path-fix {
        clip-path: inset(0 -100vmax);
    }
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
    .phase-title {
        @apply text-xs font-black uppercase tracking-[0.4em] text-orange-400/50 mb-12;
    }
    .phase-title-final {
        @apply text-center mt-6 font-black italic text-orange-500 tracking-widest text-lg uppercase;
    }
    .group-pair {
        @apply relative flex flex-col;
    }
    .line-horizontal-out {
        @apply absolute -right-10 top-1/2 w-10 h-[2px] bg-orange-500/20;
    }
    .line-vertical-connector {
        @apply absolute -right-10 top-[3.25rem] bottom-[3.25rem] w-[2px] bg-orange-500/20;
    }
    .line-horizontal-advance {
        @apply absolute -right-20 top-1/2 w-10 h-[2px] bg-orange-500/20;
    }
    .bg-[#08080a] {
        background-color: #08080a;
        background-image: radial-gradient(
            circle at 20% 30%,
            #1a110a 0%,
            #08080a 100%
        );
    }
</style>