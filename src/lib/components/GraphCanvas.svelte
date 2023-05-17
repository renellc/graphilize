<script lang="ts">
  import type Konva from "konva";
  import { onDestroy } from "svelte";
  import { Circle, Layer, Stage } from "svelte-konva";

  import { uiStore, graphStore } from "@/stores";
  import { addVertexToGraph } from "@/core";

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

  function placeVertexOnStage() {
    if ($uiStore.selectedControl === "addVertex") {
      const { x, y } = stage.getRelativePointerPosition();
      graphStore.addVertex({ x, y });
    }
  }
</script>

<Stage
  bind:handle={stage}
  config={{
    width: window.innerWidth,
    height: window.innerHeight,
  }}
  on:mouseup={placeVertexOnStage}
  on:touchend={placeVertexOnStage}
  on:wheel={({ detail: event }) => {
    const oldScale = stage.scaleX();
    const currPointer = stage.getRelativePointerPosition();
    const mousePointTo = {
      x: (currPointer.x - stage.x()) / oldScale,
      y: (currPointer.y - stage.y()) / oldScale,
    };

    let newScale;
    if (event.evt.deltaY > 0) {
      newScale = oldScale * 1.05;
    } else {
      newScale = oldScale / 1.05;
    }

    const newPos = {
      x: -(mousePointTo.x - currPointer.x / newScale) * newScale,
      y: -(mousePointTo.y - currPointer.y / newScale) * newScale,
    };

    stage.scale({ x: newScale, y: newScale });
    stage.position(newPos);
  }}
>
  <Layer>
    {#each $graphStore.vertices as vertex}
      <Circle
        config={{
          fill: "blue",
          x: vertex.x,
          y: vertex.y,
          radius: 15,
        }}
      />
    {/each}
  </Layer>
</Stage>
