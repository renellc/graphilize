<script lang="ts">
  import GraphCanvas from "@/components/GraphCanvas.svelte";
  import GraphCanvasControl from "@/components/GraphCanvasControl.svelte";
  import { uiStore } from "@/stores";
  import { KeyboardShortcutStore } from "@/stores/kbshortcut-store";
  import { onDestroy, onMount } from "svelte";

  onMount(() => {
    KeyboardShortcutStore.initialize();

    KeyboardShortcutStore.registerShortcuts([
      {
        shortcut: ["Control"],
        onPressDown: () => uiStore.toggleControl("drag"),
        onPressRelease: () => uiStore.toggleControl("drag"),
      },
      {
        shortcut: ["Meta"],
        onPressDown: () => uiStore.toggleControl("drag"),
        onPressRelease: () => uiStore.toggleControl("drag"),
      },
      {
        shortcut: ["`"],
        onPressDown: () => uiStore.selectControl("graphSettings"),
      },
      {
        shortcut: ["0"],
        onPressDown: () => uiStore.selectControl("algorithms"),
      },
      {
        shortcut: ["1"],
        onPressDown: () => uiStore.selectControl("select"),
      },
      {
        shortcut: ["2"],
        onPressDown: () => uiStore.selectControl("addVertex"),
      },
      {
        shortcut: ["3"],
        onPressDown: () => uiStore.selectControl("addEdge"),
      },
      {
        shortcut: ["4"],
        onPressDown: () => uiStore.selectControl("removeItem"),
      },
    ]);
  });

  onDestroy(() => {
    KeyboardShortcutStore.destroy();
  });
</script>

<main>
  <GraphCanvas />
  <GraphCanvasControl />
</main>
