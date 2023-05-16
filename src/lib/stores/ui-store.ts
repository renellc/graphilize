import { writable } from "svelte/store";

export type UiStore = {
  selectedControl:
  "graphSettings" | "algorithms" | "select" | "addVertex" | "addEdge" | "removeItem" | "save" | "clear" | "drag";
};

const createUiStore = () => {
  const { set, subscribe, update } = writable<UiStore>({
    selectedControl: "select",
  });

  return {
    subscribe,
    selectControl: (control: UiStore["selectedControl"]) => update((ui) => {
      ui.selectedControl = control;
      return ui;
    }),
    toggleControl: (control: UiStore["selectedControl"]) => update((ui) => {
      if (ui.selectedControl === control) {
        ui.selectedControl = "select";
      } else {
        ui.selectedControl = control;
      }
      return ui;
    }),
  }
};

export const uiStore = createUiStore();
