<template>
  <div class="playoff-table">
    <div v-if="champion" class="champion">
      <h2>Champion</h2>
      <div class="winner">
        <span>{{ champion }}</span>
      </div>
    </div>
    <div class="rounds">
      <div class="round" v-for="(round, index) in rounds" :key="index">
        <h3>Round {{ index + 1 }}</h3>
        <div class="match" v-for="(match, i) in round" :key="i">
          <div class="team">
            <span>{{ match.team1 }}</span>
          </div>
          <div class="result">
            <span v-if="match.result">{{ match.result }}</span>
            <span v-else>{{ match.date }}</span>
          </div>
          <div class="team">
            <span>{{ match.team2 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayoffTable",
  props: {
    rounds: {
      type: Array,
      required: true,
      default: () => [
        [
          { team1: "Team A", team2: "Team B", result: "3 - 1" },
          { team1: "Team C", team2: "Team D", date: "2024-12-30" },
        ],
        [
          { team1: "Winner A", team2: "Winner B", result: "2 - 2 (4-3 penales)" },
        ],
      ],
    },
    // champion: {
    //   type: String,
    //   default: "TBD Team",
    // },
  },
};
</script>

<style scoped>
.playoff-table {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.rounds {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.round {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.round h3 {
  font-size: 1.5rem;
  color: var(--darkBluePalette);
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-weight: 700;
}

.match {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: var(--lightGrey);
  border: 2px solid var(--greyPalette);
  border-radius: 10px;
  width: 220px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.match:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.team {
  font-size: 1rem;
  font-weight: bold;
  color: var(--black);
  text-transform: uppercase;
}

.result {
  font-size: 0.9rem;
  font-style: italic;
  font-weight: 500;
  color: var(--darkBrownPalette);
  margin: 0.3rem 0;
  background: var(--lightBrown);
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
}


/* Champions */
.champion {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(145deg, #0d1117, #161b22); /* Fondo oscuro profesional */
  padding: 3rem;
  border-radius: 20px;
  border: 3px solid #ffd700; /* Borde dorado */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 215, 0, 0.3); /* Brillo interno */
  position: relative;
  overflow: hidden;
  width: 80%;
  max-width: 600px;
  margin: 2rem auto;
}

.champion::before,
.champion::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
  animation: glow 6s linear infinite;
  z-index: 0;
}

.champion::before {
  width: 200px;
  height: 200px;
  top: -50px;
  left: -50px;
}

.champion::after {
  width: 300px;
  height: 300px;
  bottom: -80px;
  right: -80px;
}

@keyframes glow {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
}

.champion h2 {
  font-size: 2.5rem;
  color: #ffd700;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  z-index: 1;
  position: relative;
  margin-bottom: 1rem;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
}

.winner {
  font-size: 3rem;
  font-weight: 900;
  color: #fff;
  z-index: 1;
  position: relative;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 30px #ffd700;
  animation: winner-glow 3s infinite;
}

@keyframes winner-glow {
  0%, 100% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 30px #ffd700;
    transform: scale(1);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 50px #ffd700;
    transform: scale(1.05);
  }
}

</style>
