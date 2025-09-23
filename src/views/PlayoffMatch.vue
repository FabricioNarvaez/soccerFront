<template>
    <div class="match" :class="{ final: isFinalRound }">
      <div class="team">
          <span>{{ match.team1 }}</span>
          <span>{{ match.score1 }}</span>
      </div>
      <div class="team">
          <span>{{ match.team2 }}</span>
          <span>{{ match.score2 }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
    defineProps({
      match: {
        type: Object,
        required: true
      },
      isFinalRound: Boolean
    });
  </script>