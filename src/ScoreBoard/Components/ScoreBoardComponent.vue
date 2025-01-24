<template>
  <div class="score-board">
    <div :class="winner || playerTurn === 1 ? 'blue-turn' : ''">
      <h3>Player Blue</h3>
      <h2>{{ bluePlayerScore }}</h2>
    </div>
    <div>
      <GameConfigComponent
        @start-game="restartGame"
        :initialGameSize="gameSize"
      />
    </div>
    <div :class="winner || playerTurn === 2 ? 'red-turn' : ''">
      <h3>Player Red</h3>
      <h2>{{ redPlayerScore }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import "../Assets/Css/ScoreBoard.css";
import GameConfigComponent from "../../GameConfig/Components/GameConfigComponent.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ScoreBoardComponent",
  components: {
    GameConfigComponent,
  },
  emits: ["restart-game"],
  props: {
    initialGameSize: {
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
    winner: {
      type: Number,
      required: false,
      default: null,
    },
  },

  setup(props, { emit }) {
    const gameSize = ref<number>(props.initialGameSize);

    const restartGame = (size: number): void => {
      gameSize.value = size;
      emit("restart-game", size);
    };

    return {
      gameSize,
      restartGame,
    };
  },
});
</script>
