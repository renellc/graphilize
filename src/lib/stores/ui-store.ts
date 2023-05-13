import { writable } from "svelte/store";

export type UiStore = {
  selectedControl:
  "graphSettings" | "algorithms" | "select" | "addVertex" | "addEdge" | "removeItem" | "save" | "clear";
};

const createUiStore = () => {
  const { set, subscribe, update } = writable<UiStore>({
    selectedControl: "select",
  });

  return {
    subscribe,
    setSelectedControl: (control: UiStore["selectedControl"]) => update((ui) => {
      ui.selectedControl = control;
      return ui;
    }),
  }
};

export const uiStore = createUiStore();
