<template>
  <div>
    <ScoreBoardComponent
      @exit-game="exitGame"
      @restart-game="restartGame"
      :gameSize="gameSize"
      :bluePlayerScore="bluePlayerScore"
      :redPlayerScore="redPlayerScore"
      :playerTurn="playerTurn"
    />
    <div class="board-game">
      <div class="board-row">
        <div
          v-for="(col, colIndex) in board"
          @click="cellClicked(colIndex)"
          :key="colIndex"
          :class="getCellClass(colIndex)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "../Assets/Css/Game.css";
import ScoreBoardComponent from "../../ScoreBoard/Components/ScoreBoardComponent.vue";
import { defineComponent, ref, computed } from "vue";

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
    const playerTurn = ref<number>(0);
    const blueBoard = ref<number[]>([]);
    const redBoard = ref<number[]>([]);

    const board = ref<number[][]>(
      Array.from({ length: props.gameSize }, () =>
        Array(props.gameSize).fill(0)
      )
    );

    const initializeBoard = () => {
      const size = props.gameSize;
      const redCells = Math.floor(size * 0.2);
      const blueCells = Math.floor(size * 0.2);

      let alreadySet: Set<number> = new Set();

      while (alreadySet.size < redCells + blueCells) {
        const col = Math.floor(Math.random() * size) + 1;
        if (!alreadySet.has(col)) {
          if (blueBoard.value.length < blueCells) {
            blueBoard.value.push(col);
          } else if (redBoard.value.length < redCells) {
            redBoard.value.push(col);
          }
          alreadySet.add(col);
        }
      }

      playerTurn.value = Math.random() < 0.5 ? 1 : 2;
    };

    const exitGame = (): void => {
      emit("exit-game");
    };

    const restartGame = (): void => {
      bluePlayerScore.value = 0;
      redPlayerScore.value = 0;
      board.value = Array.from({ length: props.gameSize }, () =>
        Array(props.gameSize).fill(0)
      );
      initializeBoard();
    };

    const cellClicked = (col: number): void => {
      console.log(col);
    };

    const getCellClass = (colIndex: number): string => {
      if (blueBoard.value.includes(colIndex)) {
        return "blue-row";
      }
      if (redBoard.value.includes(colIndex)) {
        return "red-row";
      }
      return "";
    };

    initializeBoard();

    return {
      bluePlayerScore,
      redPlayerScore,
      playerTurn,
      board,
      exitGame,
      restartGame,
      cellClicked,
      getCellClass,
    };
  },
});
</script>
