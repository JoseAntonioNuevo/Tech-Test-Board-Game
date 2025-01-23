<template>
  <div>
    <ScoreBoardComponent
      @exit-game="exitGame"
      @restart-game="restartGame"
      :gameSize="gameSize"
      :bluePlayerScore="bluePlayerScore"
      :redPlayerScore="redPlayerScore"
    />
  </div>
</template>

<script lang="ts">
import "../Assets/Css/Game.css";
import ScoreBoardComponent from "../../ScoreBoard/Components/ScoreBoardComponent.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "GameComponent",
  emits: ["exit-game"],
  components: {
    ScoreBoardComponent,
  },
  props: {
    gameSize: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const bluePlayerScore = ref<number>(0);
    const redPlayerScore = ref<number>(0);

    const exitGame = (): void => {
      emit("exit-game");
    };

    const restartGame = (): void => {
      bluePlayerScore.value = 0;
      redPlayerScore.value = 0;
    };

    return { bluePlayerScore, redPlayerScore, exitGame, restartGame };
  },
});
</script>
