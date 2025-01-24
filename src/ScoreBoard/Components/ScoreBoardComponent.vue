<template>
  <div class="score-board">
    <div :class="playerTurn === 1 ? 'blue-turn' : ''">
      <h3>Player Blue</h3>
      <h2>{{ bluePlayerScore }}</h2>
    </div>
    <div>
      <h4>Playing with size: {{ gameSize }}</h4>
      <p>{{ timer }}</p>
      <div class="score-board-buttons">
        <button @click="restartGame">Restart</button>
        <button @click="exitGame" class="exit-btn">Exit</button>
      </div>
    </div>
    <div :class="playerTurn === 2 ? 'red-turn' : ''">
      <h3>Player Red</h3>
      <h2>{{ redPlayerScore }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import "../Assets/Css/ScoreBoard.css";
import { defineComponent, ref, onMounted, onUnmounted } from "vue";

export default defineComponent({
  name: "ScoreBoardComponent",
  emits: ["exit-game", "restart-game"],
  props: {
    gameSize: {
      type: Number,
      required: true,
    },
    redPlayerScore: {
      type: Number,
      required: false,
    },
    bluePlayerScore: {
      type: Number,
      required: false,
    },
    playerTurn: {
      type: Number,
      required: false,
    },
  },

  setup(props, { emit }) {
    const timer = ref(0);
    let interval: number;

    const startTimer = (): void => {
      interval = setInterval(() => {
        timer.value++;
      }, 1000);
    };

    const exitGame = (): void => {
      emit("exit-game");
    };

    const restartGame = (): void => {
      emit("restart-game");
      timer.value = 0; // Reset the timer when the game restarts
    };

    onMounted(() => {
      startTimer();
    });

    onUnmounted(() => {
      clearInterval(interval);
    });

    return {
      timer,
      exitGame,
      restartGame,
    };
  },
});
</script>
