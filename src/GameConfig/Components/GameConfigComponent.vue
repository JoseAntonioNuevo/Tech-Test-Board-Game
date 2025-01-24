<template>
  <div>
    <form @submit.prevent="startGame" class="game-size-form">
      <input
        @input="setGameSize($event)"
        type="number"
        name="game-size"
        id="game-size"
        v-model.number="gameSize"
      />
      <button>Start</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import "../Assets/Css/GameConfig.css";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "GameConfigComponent",
  props: {
    initialGameSize: {
      type: Number,
      required: false,
    },
  },
  emits: ["start-game"],
  setup(props, { emit }) {
    const gameSize = ref<number>(props.initialGameSize ?? 4);
    const error = ref<string>("");

    const setGameSize = (e: Event): void => {
      const target = e.target as HTMLInputElement;
      const value = target.value ? parseInt(target.value) : NaN;
      gameSize.value = isNaN(value) ? 0 : value;
    };

    const CheckGameSize = (value: number): number => {
      const maxSize = 50;
      const minSize = 4;

      if (value > maxSize) {
        gameSize.value = maxSize;
        error.value = `The maximum game size is ${maxSize}.`;
        return maxSize;
      }
      if (value < minSize) {
        gameSize.value = minSize;
        error.value = `The minimum game size is ${minSize}.`;
        return minSize;
      }

      gameSize.value = value;
      error.value = "";
      return value;
    };

    const startGame = (e: Event): void => {
      e.preventDefault();
      const size = CheckGameSize(gameSize.value);
      if (error.value) return;
      emit("start-game", size);
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
