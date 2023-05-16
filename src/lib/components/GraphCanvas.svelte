<script lang="ts">
  import { uiStore } from "@/stores";
  import type Konva from "konva";
  import { onDestroy } from "svelte";
  import { Layer, Rect, Stage } from "svelte-konva";

  let stage: Konva.Stage;

  const unsubUi = uiStore.subscribe((store) => {
    if (!stage) {
      return;
    }

    if (store.selectedControl === "drag") {
      stage.container().style.cursor = "pointer";
      stage.draggable(true);
    } else {
      stage.container().style.cursor = "default";
      stage.draggable(false);
    }
  });

  onDestroy(() => {
    unsubUi();
  });
</script>

<Stage
  bind:handle={stage}
  config={{
    width: window.innerWidth,
    height: window.innerHeight,
  }}
>
  <Layer>
    <Rect
      config={{
        fill: "red",
        width: 100,
        height: 100,
        offset: {
          x: -(window.innerHeight / 2),
          y: -(window.innerHeight / 2),
        },
      }}
    />
  </Layer>
</Stage>
