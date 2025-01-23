<template>
  <div>
    <h1>Welcome to The Tech Test Board Game</h1>
    <h2>Choose The Game Size</h2>
    <div class="game-size-form">
      <input
        @input="setGameSize($event)"
        type="number"
        name="game-size"
        id="game-size"
        min="1"
        max="25"
        v-model.number="gameSize"
      />
      <button @click="startGame">Start</button>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import "../Assets/Css/InitialPage.css";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "InitialComponent",
  emits: ["start-game"],
  setup(_, { emit }) {
    const gameSize = ref<number>(1);
    const error = ref<string>("");

    const setGameSize = (e: Event): void => {
      const target = e.target as HTMLInputElement;
      const value = target.value ? parseInt(target.value) : 1;
      CheckGameSize(value);
    };

    const CheckGameSize = (value: number): boolean => {
      const maxSize = 25;
      const minSize = 1;

      if (value > maxSize) {
        gameSize.value = maxSize;
        error.value = `The maximum game size is ${maxSize}.`;
        return false;
      }
      if (value < minSize) {
        gameSize.value = minSize;
        error.value = `The minimum game size is ${minSize}.`;
        return false;
      }

      gameSize.value = value;
      error.value = "";
      return true;
    };

    const startGame = (): void => {
      if (CheckGameSize(gameSize.value)) {
        emit("start-game", gameSize.value);
        return;
      }
      error.value = "Please enter a valid game size.";
    };

    return {
      gameSize,
      error,
      setGameSize,
      startGame,
    };
  },
});
</script>
