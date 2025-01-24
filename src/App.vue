<template>
  <div id="app">
    <div v-if="!gameInProgress">
      <h1>Welcome to The Tech Test Board Game</h1>
      <h2>Choose The Game Size</h2>
      <GameConfigComponent
        @start-game="startGame"
        :initialgameSize="gameSize"
      />
    </div>
    <GameComponent v-if="gameInProgress" :initialGameSize="gameSize" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import GameConfigComponent from "./GameConfig/Components/GameConfigComponent.vue";
import GameComponent from "./Game/Components/GameComponent.vue";

export default defineComponent({
  components: {
    GameComponent,
    GameConfigComponent,
  },
  setup() {
    const gameInProgress = ref<boolean>(false);
    const gameSize = ref<number>(4);

    const startGame = (newGameSize: number): void => {
      console.log(newGameSize);
      gameSize.value = newGameSize;
      gameInProgress.value = true;
    };

    return {
      gameInProgress,
      gameSize,
      startGame,
    };
  },
});
</script>
