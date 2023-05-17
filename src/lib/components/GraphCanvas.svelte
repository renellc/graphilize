<script lang="ts">
  import Konva from "konva";
  import { onDestroy, onMount } from "svelte";

  import { uiStore, graphStore } from "@/stores";

  let stage: Konva.Stage;
  let mainLayer: Konva.Layer;

  const circleRadius = 20;

  onMount(() => {
    stage = new Konva.Stage({
      container: "graphCanvasContainer",
      width: window.innerWidth,
      height: window.innerHeight,
    });

    mainLayer = new Konva.Layer();
    stage.add(mainLayer);

    stage.on("mouseup", addVertex);
    stage.on("touchend", addVertex);
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

  function addVertex() {
    if ($uiStore.selectedControl === "addVertex") {
      const { x, y } = stage.getRelativePointerPosition();
      graphStore.addVertex({ x, y });
    }
  }

  function drawVertices() {
    if (!stage) {
      return;
    }

    for (let i = 0; i < $graphStore.vertices.length; i++) {
      const { x, y } = $graphStore.vertices[i];
      const group = new Konva.Group({
        x,
        y,
        width: circleRadius * 2,
        height: circleRadius * 2,
      });

      const circle = new Konva.Circle({
        fill: "white",
        radius: circleRadius,
        stroke: "#171717",
        strokeWidth: 1,
      });

      const text = new Konva.Text({
        text: i.toString(),
        fill: "#171717",
        fontSize: 16,
        align: "center",
        verticalAlign: "middle",
      });

      text.x(-text.width() / 2);
      text.y(-text.height() / 2);

      group.add(circle);
      group.add(text);
      mainLayer.add(group);
    }
  }

  $: $graphStore, drawVertices();
  $: $uiStore, updateCursorStyle();
</script>

<div id="graphCanvasContainer" />
