<template>
  <div class="space-y-8">
    <section>
      <HeaderSubtitle 
        subtitle="Estado de Disciplina" 
        link="/reglamento"
        linkText="Ver reglamento de sanciones"
      />

      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="player in expelledPlayers" :key="player._id" 
          class="relative overflow-hidden bg-slate-950 rounded-2xl border-2 border-red-600 shadow-2xl group">
          
          <div class="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span class="text-9xl font-black text-white italic">OUT</span>
          </div>

          <div class="flex p-5 gap-5 items-center relative z-10">
            <div class="relative shrink-0">
              <div class="w-20 h-20 rounded-xl overflow-hidden border-2 border-red-500/50">
                <img :src="player.photo || 'https://placehold.co/200x200/1e293b/white?text=PJ'" class="w-full h-full object-cover grayscale" />
              </div>
              <div class="absolute -top-2 -left-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg">
                EXPULSADO
              </div>
            </div>

            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-red-500 font-black text-lg">#{{ player.playerNumber }}</span>
                <h3 class="text-white font-black uppercase tracking-tight">{{ player.name }}</h3>
              </div>
              <p class="text-red-400 text-[10px] font-bold uppercase tracking-widest leading-none">
                Sanción Definitiva: Expulsión del Torneo
              </p>
              <div class="mt-3 inline-block bg-red-600/20 border border-red-600/30 px-3 py-1 rounded-full">
                <span class="text-red-500 text-[9px] font-black uppercase">Falta Grave al Reglamento</span>
              </div>
            </div>
          </div>
        </div>

        <div v-for="player in sanctionedPlayers" :key="player._id" 
          class="bg-white rounded-2xl border-2 border-slate-100 shadow-sm hover:border-orange-400 transition-colors flex overflow-hidden">
          
          <div class="w-3" :class="player.sanctionType === 'Red' ? 'bg-red-600' : 'bg-orange-500'"></div>

          <div class="p-5 flex-1 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-400">
                {{ player.playerNumber }}
              </div>
              <div>
                <h4 class="font-black text-slate-800 uppercase text-sm leading-none">{{ player.name }}</h4>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 uppercase">
                    {{ player.sanctionLabel }}
                  </span>
                </div>
              </div>
            </div>

            <div class="text-right">
              <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Restan</p>
              <div class="flex items-baseline justify-end gap-1">
                <span class="text-3xl font-black text-slate-800 leading-none">{{ player.matchesLeft }}</span>
                <span class="text-[10px] font-bold text-slate-500 uppercase">Partidos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="processedPlayers.length === 0" class="mt-8 p-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
        <span class="text-4xl mb-4 block">✅</span>
        <p class="text-slate-500 font-bold uppercase text-xs tracking-widest">Equipo limpio. No hay sanciones activas.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
    import { computed, ref } from 'vue';
    import HeaderSubtitle from '@components/common/HeaderSubtitle.vue';

    // Datos de ejemplo basados en tu captura de MongoDB
    const mockPlayers = ref([
    {
        _id: "699ed784ad37ee8ac6a21095",
        name: "Kevin",
        playerNumber: 16,
        expelledTournament: false,
        redCards: 1, // Usaremos esto para calcular lógica temporal
        remainingMatches: 2,
        photo: null
    },
    {
        _id: "788fd...",
        name: "Santi",
        playerNumber: 7,
        expelledTournament: true,
        photo: "https://res.cloudinary.com/dzd68sxue/image/upload/v1695395236/WEBP/Cancheritos_qdbnsw.webp"
    },
    {
        _id: "123ab...",
        name: "Dani",
        playerNumber: 10,
        expelledTournament: false,
        remainingMatches: 1,
        doubleYellow: true
    }
    ]);

    const processedPlayers = computed(() => {
    return mockPlayers.value.filter(p => p.expelledTournament || (p.remainingMatches && p.remainingMatches > 0));
    });

    const expelledPlayers = computed(() => {
    return processedPlayers.value.filter(p => p.expelledTournament);
    });

    const sanctionedPlayers = computed(() => {
    return processedPlayers.value
        .filter(p => !p.expelledTournament)
        .map(p => ({
        ...p,
        matchesLeft: p.remainingMatches,
        sanctionType: p.doubleYellow ? 'Orange' : 'Red',
        sanctionLabel: p.doubleYellow ? 'Doble Amarilla' : 'Tarjeta Roja'
        }));
    });
</script>