import { mount } from "@vue/test-utils";
import ScoreBoardComponent from "@/ScoreBoard/Components/ScoreBoardComponent.vue";
import GameConfigComponent from "@/GameConfig/Components/GameConfigComponent.vue";

describe("ScoreBoardComponent", () => {
  it("renders the component correctly", () => {
    const wrapper = mount(ScoreBoardComponent, {
      props: {
        initialGameSize: 3,
        redPlayerScore: 0,
        bluePlayerScore: 0,
        playerTurn: 1,
        winner: null,
      },
    });

    expect(wrapper.find(".score-board").exists()).toBe(true);
    expect(wrapper.find("h3").text()).toBe("Player Blue");
  });

  it("receives and applies props correctly", () => {
    const wrapper = mount(ScoreBoardComponent, {
      props: {
        initialGameSize: 3,
        redPlayerScore: 5,
        bluePlayerScore: 10,
        playerTurn: 2,
        winner: null,
      },
    });

    expect(wrapper.props("initialGameSize")).toBe(3);
    expect(wrapper.props("redPlayerScore")).toBe(5);
    expect(wrapper.props("bluePlayerScore")).toBe(10);
    expect(wrapper.props("playerTurn")).toBe(2);
  });

  it("applies the correct class based on playerTurn and winner", async () => {
    const wrapper = mount(ScoreBoardComponent, {
      props: {
        initialGameSize: 4,
        redPlayerScore: 0,
        bluePlayerScore: 0,
        playerTurn: 1,
        winner: null,
      },
    });

    expect(wrapper.find(".blue-turn").exists()).toBe(true);
    expect(wrapper.find(".red-turn").exists()).toBe(false);
  });

  it("emits the restart-game event when GameConfigComponent triggers start-game", async () => {
    const wrapper = mount(ScoreBoardComponent, {
      props: {
        initialGameSize: 3,
        redPlayerScore: 0,
        bluePlayerScore: 0,
        playerTurn: 1,
        winner: null,
      },
    });

    const gameConfigComponent = wrapper.findComponent(GameConfigComponent);

    await gameConfigComponent.vm.$emit("start-game", 5);

    const emittedEvents = wrapper.emitted("restart-game");
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents[0]).toEqual([5]);
  });
});
