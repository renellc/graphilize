<script lang="ts">
  import { onMount } from "svelte";

  import Konva from "konva";
  import { Stage, Layer } from "svelte-konva";

  import { uiStore, graphStore, canvasStore } from "@/stores";
  import { canvasCreateVertex } from "@/util";
  import Vertex from "./Vertex.svelte";

  const STAGE_WIDTH = 3000;
  const STAGE_HEIGHT = 3000;

  let stage: Konva.Stage;
  let mainLayer: Konva.Layer;

  function updateCursorStyle() {
    if (!stage) {
      return;
    }

    if ($uiStore.selectedControl === "drag") {
      stage.container().style.cursor = "pointer";
      stage.draggable(true);
    } else {
      stage.container().style.cursor = "default";
      stage.draggable(false);
    }
  }

  function handleZoom(event: Konva.KonvaEventObject<WheelEvent>) {
    const oldScale = stage.scaleX();
    const currPointer = stage.getRelativePointerPosition();
    const mousePointTo = {
      x: (currPointer.x - stage.x()) / oldScale,
      y: (currPointer.y - stage.y()) / oldScale,
    };

    let newScale;
    if (event.evt.deltaY > 0) {
      newScale = oldScale * 1.02;
    } else {
      newScale = oldScale / 1.02;
    }

    const newPos = {
      x: -(mousePointTo.x - currPointer.x / newScale) * newScale,
      y: -(mousePointTo.y - currPointer.y / newScale) * newScale,
    };

    stage.scale({ x: newScale, y: newScale });
    stage.position(newPos);
  }

  function addVertex(input: { x: number; y: number }) {
    const { x, y } = input;

    if ($uiStore.selectedControl === "addVertex") {
      graphStore.addVertex();
      canvasStore.addVertexElement({
        vertexIdx: $graphStore.adjMatrix.length - 1,
        x,
        y,
      });
    }
  }

  $: $uiStore, updateCursorStyle();
</script>

<Stage
  bind:handle={stage}
  config={{ width: STAGE_WIDTH, height: STAGE_HEIGHT }}
  on:wheel={(event) => handleZoom(event.detail)}
  on:mouseup={(event) => {
    if ($uiStore.selectedControl === "addVertex") {
      addVertex({ x: event.detail.evt.x, y: event.detail.evt.y });
    }
  }}
>
  <Layer bind:handle={mainLayer}>
    {#each Array.from($canvasStore.vertexElements) as [vertexIdx, { x, y }]}
      <Vertex {x} {y} label={vertexIdx.toString()} />
    {/each}
  </Layer>
</Stage>
