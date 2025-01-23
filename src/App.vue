<template>
  <div id="app">
    <InitialPage v-if="!gameInProgress" @start-game="startGame" />
    <div v-else>
      <p>Game is in progress...</p>
      <button @click="exitGame">Exit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InitialPage from "./InitialPage/Components/InitialPage.vue";

export default defineComponent({
  components: {
    InitialPage,
  },
  setup() {
    const gameInProgress = ref<boolean>(false);
    const gameSize = ref<number>(1);

    const startGame = (newGameSize: number): void => {
      gameSize.value = newGameSize;
      gameInProgress.value = true;
    };

    const exitGame = (): void => {
      gameSize.value = 1;
      gameInProgress.value = false;
    };

    return {
      gameInProgress,
      startGame,
      exitGame,
    };
  },
});
</script>
