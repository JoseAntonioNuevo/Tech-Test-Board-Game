import { mount } from "@vue/test-utils";
import GameConfigComponent from "@/GameConfig/Components/GameConfigComponent.vue";

describe("GameConfigComponent", () => {
  it("renders correctly", () => {
    const wrapper = mount(GameConfigComponent);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("input#game-size").exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("sets initial game size correctly", () => {
    const wrapper = mount(GameConfigComponent, {
      props: {
        initialGameSize: 10,
      },
    });
    const input = wrapper.find("input#game-size");
    expect(input.element.value).toBe("10");
  });

  it("updates game size on input", async () => {
    const wrapper = mount(GameConfigComponent);
    const input = wrapper.find("input#game-size");
    await input.setValue(20);
    expect(wrapper.vm.gameSize).toBe(20);
  });

  it("displays error for game size too large", async () => {
    const wrapper = mount(GameConfigComponent);
    const input = wrapper.find("input#game-size");
    await input.setValue(60);
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.vm.error).toBe("The maximum game size is 50.");
    expect(wrapper.find(".error").text()).toBe("The maximum game size is 50.");
  });

  it("displays error for game size too small", async () => {
    const wrapper = mount(GameConfigComponent);
    const input = wrapper.find("input#game-size");
    await input.setValue(2);
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.vm.error).toBe("The minimum game size is 4.");
    expect(wrapper.find(".error").text()).toBe("The minimum game size is 4.");
  });

  it("emits start-game event with correct size", async () => {
    const wrapper = mount(GameConfigComponent);
    const input = wrapper.find("input#game-size");
    await input.setValue(30);
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.emitted("start-game")).toBeTruthy();
    expect(wrapper.emitted("start-game")[0]).toEqual([30]);
  });

  it("does not emit start-game event if there is an error", async () => {
    const wrapper = mount(GameConfigComponent);
    const input = wrapper.find("input#game-size");
    await input.setValue(60);
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.emitted("start-game")).toBeFalsy();
  });
});
