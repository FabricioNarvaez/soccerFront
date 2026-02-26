<template>
  <div class="relative transition-all duration-300 hover:translate-x-2 group/match" 
       :class="isFinal ? 'w-50 scale-110 origin-left ml-10' : 'w-50'">
    
    <div class="bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden shadow-2xl group-hover/match:border-blue-500/50 transition-colors">
      <div class="flex items-center justify-between p-3 border-b border-white/5 bg-gradient-to-r from-white/5 to-transparent">
        <div class="flex items-center gap-3">
          <img :src="team1.logo" class="w-6 h-6 object-contain" />
          <span class="text-[11px] font-bold uppercase truncate w-28">{{ team1.name }}</span>
        </div>
        <span class="text-base font-black" :class="team1.score > team2.score ? 'text-blue-400' : 'text-slate-500'">
          {{ team1.score }}
        </span>
      </div>
      
      <div class="flex items-center justify-between p-3">
        <div class="flex items-center gap-3">
          <img :src="team2.logo" class="w-6 h-6 object-contain" />
          <span class="text-[11px] font-bold uppercase truncate w-28">{{ team2.name }}</span>
        </div>
        <span class="text-base font-black" :class="team2.score > team1.score ? 'text-blue-400' : 'text-slate-500'">
          {{ team2.score }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['team1', 'team2', 'isFinal']);
</script>