import { mount } from "@vue/test-utils";
import GameComponent from "@/Game/Components/GameComponent.vue";
import ScoreBoardComponent from "@/ScoreBoard/Components/ScoreBoardComponent.vue";

describe("GameComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(GameComponent, {
      props: {
        initialGameSize: 4,
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent(ScoreBoardComponent).exists()).toBe(true);
  });

  it("initializes with correct default values", () => {
    const totalCells = wrapper.vm.board.length;
    const blueCells = wrapper.vm.board.filter((cell) => cell === 1).length;
    const redCells = wrapper.vm.board.filter((cell) => cell === 2).length;
    const emptyCells = wrapper.vm.board.filter((cell) => cell === 0).length;

    expect([1, 2]).toContain(wrapper.vm.playerTurn);
    expect(wrapper.vm.winner).toBe(null);
    expect(wrapper.vm.board.length).toBe(4);
    expect(blueCells).toBe(Math.round(totalCells * 0.2));
    expect(redCells).toBe(Math.round(totalCells * 0.2));
    expect(emptyCells).toBe(Math.round(totalCells * 0.6));
  });

  it("starts the game correctly", () => {
    wrapper.vm.startGame();
    const totalCells = wrapper.vm.board.length;
    const blueCells = wrapper.vm.board.filter((cell) => cell === 1).length;
    const redCells = wrapper.vm.board.filter((cell) => cell === 2).length;
    const emptyCells = wrapper.vm.board.filter((cell) => cell === 0).length;

    expect(blueCells).toBe(Math.round(totalCells * 0.2));
    expect(redCells).toBe(Math.round(totalCells * 0.2));
    expect([1, 2]).toContain(wrapper.vm.playerTurn);
  });

  it("restarts the game correctly", () => {
    wrapper.vm.restartGame(6);
    const totalCells = wrapper.vm.board.length;
    const blueCells = wrapper.vm.board.filter((cell) => cell === 1).length;
    const redCells = wrapper.vm.board.filter((cell) => cell === 2).length;
    const emptyCells = wrapper.vm.board.filter((cell) => cell === 0).length;

    expect(wrapper.vm.board.length).toBe(6);
    expect(blueCells).toBe(Math.round(totalCells * 0.2));
    expect(redCells).toBe(Math.round(totalCells * 0.2));
    expect(emptyCells).toBe(Math.round(totalCells * 0.6));
    expect(wrapper.vm.winner).toBe(null);
  });
});
