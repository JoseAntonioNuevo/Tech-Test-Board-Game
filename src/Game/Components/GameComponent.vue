<template>
  <div>
    <ScoreBoardComponent
      @restart-game="restartGame"
      :initialGameSize="initialGameSize"
      :bluePlayerScore="bluePlayerScore"
      :redPlayerScore="redPlayerScore"
      :playerTurn="playerTurn"
      :winner="winner"
    />
    <div v-if="winner" class="winner">
      <h1>{{ winner === 1 ? "Blue" : "Red" }} Wins!</h1>
    </div>
    <h2 v-else class="turn-indicator">
      {{ playerTurn === 1 ? "Blue's Turn" : "Red's Turn" }}
    </h2>
    <div class="board-game">
      <div class="board-row">
        <div
          v-for="colIndex in board"
          @click="playTurn(colIndex)"
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
  components: {
    ScoreBoardComponent,
  },
  props: {
    initialGameSize: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    // 1: Blue, 2: Red
    const playerTurn = ref<number>(1);
    const winner = ref<number | undefined>(undefined);
    const gameSize = ref<number>(props.initialGameSize ?? 4);

    const board = ref<number[]>(Array(props.initialGameSize).fill(0));

    const startGame = () => {
      const size = gameSize.value;
      const redCells = Math.round(size * 0.2);
      const blueCells = Math.round(size * 0.2);

      let alreadySet: Set<number> = new Set();

      while (alreadySet.size < redCells + blueCells) {
        const col = Math.floor(Math.random() * size);
        if (!alreadySet.has(col)) {
          if (board.value.filter((cell) => cell === 1).length < blueCells) {
            board.value[col] = 1;
          } else if (
            board.value.filter((cell) => cell === 2).length < redCells
          ) {
            board.value[col] = 2;
          }
          alreadySet.add(col);
        }
      }

      playerTurn.value = Math.random() < 0.5 ? 1 : 2;
    };

    const exitGame = (): void => {
      emit("exit-game");
    };

    const restartGame = (size: number): void => {
      board.value = Array(size).fill(0);
      winner.value = undefined;
      gameSize.value = size;
      startGame();
    };

    const playTurn = (col: number): void => {
      if (winner.value) return;
      if (board.value[col] !== playerTurn.value) {
        board.value[col] = playerTurn.value;
        colorOtherCells(col, playerTurn.value);
        playerTurn.value = playerTurn.value === 1 ? 2 : 1;
        checkWinner();
      }
    };

    const colorOtherCells = (col: number, player: number): void => {
      const colorCells = (start: number, end: number, step: number) => {
        let preSelected = [];
        for (let i = start; i !== end; i += step) {
          if (board.value[i] === 0) {
            preSelected.push(i);
          } else if (board.value[i] === player) {
            preSelected.forEach((cell) => {
              board.value[cell] = player;
            });
            break;
          } else if (board.value[i] !== player) {
            if (board.value[i + step] === player) {
              board.value[i] = player;
              preSelected.forEach((cell) => {
                board.value[cell] = player;
              });
            }
            break;
          }
        }
      };

      board.value[col] = player;

      colorCells(col + 1, gameSize.value, 1);
      colorCells(col - 1, -1, -1);
    };

    const getCellClass = (colIndex: number): string => {
      if (board.value[colIndex] === 1) {
        return "blue-row";
      }
      if (board.value[colIndex] === 2) {
        return "red-row";
      }
      return "";
    };

    const checkWinner = (): void => {
      const bluePlayerScore = board.value.filter((cell) => cell === 1).length;
      const redPlayerScore = board.value.filter((cell) => cell === 2).length;

      if (bluePlayerScore === gameSize.value || redPlayerScore === 0) {
        winner.value = 1;
      } else if (redPlayerScore === gameSize.value || bluePlayerScore === 0) {
        winner.value = 2;
      }
    };

    const bluePlayerScore = computed(
      () => board.value.filter((cell) => cell === 1).length
    );
    const redPlayerScore = computed(
      () => board.value.filter((cell) => cell === 2).length
    );

    startGame();

    return {
      playerTurn,
      board,
      winner,
      bluePlayerScore,
      redPlayerScore,
      exitGame,
      restartGame,
      playTurn,
      getCellClass,
      checkWinner,
      startGame,
    };
  },
});
</script>
