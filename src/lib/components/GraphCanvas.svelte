<script lang="ts">
  import Konva from "konva";
  import { onMount } from "svelte";

  import { uiStore, graphStore } from "@/stores";
  import { canvasCreateVertex } from "@/util";

  const STAGE_WIDTH = 3000;
  const STAGE_HEIGHT = 3000;

  let stage: Konva.Stage;
  let mainLayer: Konva.Layer;

  onMount(() => {
    stage = new Konva.Stage({
      container: "graphCanvasContainer",
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
    });

    mainLayer = new Konva.Layer();
    stage.add(mainLayer);

    stage.on("mouseup", (event) => {
      switch ($uiStore.selectedControl) {
        case "addVertex":
          addVertex({ x: event.evt.x, y: event.evt.y });
          break;
        default:
          break;
      }
    });

    stage.on("touchend", (event) => {
      switch ($uiStore.selectedControl) {
        case "addVertex":
          addVertex({
            x: event.evt.touches[0].screenX,
            y: event.evt.touches[0].screenY,
          });
          break;
        default:
          break;
      }
    });

    stage.on("wheel", handleZoom);
  });

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

      const vertex = canvasCreateVertex({
        position: { x, y },
        label: ($graphStore.adjMatrix.length - 1).toString(),
      });

      mainLayer.add(vertex);
    }
  }

  $: $uiStore, updateCursorStyle();
</script>

<div id="graphCanvasContainer" />
