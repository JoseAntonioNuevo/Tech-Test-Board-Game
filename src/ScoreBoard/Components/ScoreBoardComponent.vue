<template>
  <div>
    <h1>Playing with size: {{ gameSize }}</h1>
    <button @click="exitGame" class="exit-btn">Exit</button>
  </div>
</template>

<script lang="ts">
import "../Assets/Css/ScoreBoard.css";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScoreBoardComponent",
  emits: ["exit-game"],
  props: {
    gameSize: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const exitGame = (): void => {
      emit("exit-game");
    };

    return {
      exitGame,
      gameSize: props.gameSize,
    };
  },
});
</script>
