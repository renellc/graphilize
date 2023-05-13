<script lang="ts">
  import Icon, { type IconifyIcon } from "@iconify/svelte";
  import graphIcon from "@iconify/icons-mdi/graph";
  import functionIcon from "@iconify/icons-mdi/function";
  import cursorDefault from "@iconify/icons-mdi/cursor-default";
  import checkboxBlankCircle from "@iconify/icons-mdi/checkbox-blank-circle";
  import minusIcon from "@iconify/icons-mdi/minus";
  import eraserIcon from "@iconify/icons-mdi/eraser";
  import contentSave from "@iconify/icons-mdi/content-save";
  import deleteIcon from "@iconify/icons-mdi/delete";
  import { uiStore, type UiStore } from "@/stores";
  import { onDestroy } from "svelte";

  let ui: UiStore;
  const storeUiUnsubscribe = uiStore.subscribe((store) => (ui = store));
  onDestroy(() => {
    storeUiUnsubscribe();
  });

  const iconGroups: {
    name: string;
    icon: IconifyIcon;
    control: UiStore["selectedControl"];
  }[][] = [
    [
      { name: "Graph Settings", icon: graphIcon, control: "graphSettings" },
      { name: "Algorithms", icon: functionIcon, control: "algorithms" },
    ],
    [
      { name: "Select", icon: cursorDefault, control: "select" },
      { name: "Add Vertex", icon: checkboxBlankCircle, control: "addVertex" },
      { name: "Add Edge", icon: minusIcon, control: "addEdge" },
      { name: "Remove Item", icon: eraserIcon, control: "removeItem" },
    ],
    [
      { name: "Export Graph", icon: contentSave, control: "save" },
      { name: "Clear Graph", icon: deleteIcon, control: "clear" },
    ],
  ];

  let lastSelected: HTMLElement;

  function onGraphCrontrolItemSelected(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const { currentTarget } = event;
    if (!currentTarget.checked) {
      return;
    }

    const parent = currentTarget.parentElement;
    parent.style.backgroundColor = "#e7e7e7";

    if (lastSelected) {
      lastSelected.style.backgroundColor = "transparent";
    }

    lastSelected = parent;
  }
</script>

<div class="graph-control__container">
  {#each iconGroups as iconGroup, idx}
    {#each iconGroup as { name, icon, control }, idx}
      <label
        title={name}
        class="graph-control__item"
        style="margin-right: {idx !== iconGroup.length - 1 ? '4px' : '0'}"
      >
        <input
          type="radio"
          name="graph-control__item"
          id={name}
          on:change={(event) => {
            onGraphCrontrolItemSelected(event);
            uiStore.setSelectedControl(control);
          }}
        />
        <Icon {icon} width="24" color="#171717" />
      </label>
    {/each}

    {#if idx !== iconGroups.length - 1}
      <div class="graph-control__separator" />
    {/if}
  {/each}
</div>

<style>
  .graph-control__container {
    display: flex;
    align-items: center;
    width: max-content;

    position: absolute;
    left: 0;
    right: 0;
    bottom: 2rem;
    margin-left: auto;
    margin-right: auto;

    padding: 12px;

    border-radius: 12px;
    box-shadow: 0px 0px 12px -5px rgba(0, 0, 0, 0.75);
  }

  .graph-control__container .graph-control__item {
    display: flex;
    align-items: center;

    position: relative;
    width: max-content;
    height: max-content;

    padding: 4px;
    border-radius: 2px;
  }

  .graph-control__container .graph-control__item > input[type="radio"] {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;

    width: 100%;
    height: 100%;

    cursor: pointer;
  }

  .graph-control__separator {
    display: inline-block;
    width: 2px;
    background-color: #c2c2c2;
    height: 1rem;
    margin: 0 16px;
  }
</style>
