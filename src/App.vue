<template>
  <div id="app">
    <InitialPage v-if="!gameInProgress" @start-game="startGame" />
    <div v-else>
      <GameComponent @exit-game="exitGame" :gameSize="gameSize" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InitialPage from "./InitialPage/Components/InitialPage.vue";
import GameComponent from "./Game/Components/GameComponent.vue";

export default defineComponent({
  components: {
    InitialPage,
    GameComponent,
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
      gameSize,
      startGame,
      exitGame,
    };
  },
});
</script>
