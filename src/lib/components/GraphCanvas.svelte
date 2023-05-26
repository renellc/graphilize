<script lang="ts">
  import Konva from "konva";
  import { Stage, Layer, Line } from "svelte-konva";

  import { uiStore, graphStore, canvasStore } from "@/stores";
  import Vertex from "./Vertex.svelte";
  import Edge from "./Edge.svelte";

  const STAGE_WIDTH = 3000;
  const STAGE_HEIGHT = 3000;

  let stage: Konva.Stage;
  let mainLayer: Konva.Layer;
  let drawingEdge: { startVertex: number; line: Konva.Line } = {
    startVertex: 0,
    line: new Konva.Line({}),
  };

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
    } else if ($uiStore.selectedControl === "addEdge") {
      if ($canvasStore.isDrawing) {
        canvasStore.setIsDrawing(false);
        drawingEdge.line.remove();
      }
    }
  }}
  on:mousemove={() => {
    if ($canvasStore.isDrawing && $uiStore.selectedControl === "addEdge") {
      const pos = stage.getRelativePointerPosition();
      drawingEdge.line.points([
        $canvasStore.vertexElements.get(drawingEdge.startVertex).x,
        $canvasStore.vertexElements.get(drawingEdge.startVertex).y,
        pos.x,
        pos.y,
      ]);
    }
  }}
>
  <Layer bind:handle={mainLayer}>
    {#each [...$canvasStore.vertexElements] as [vertexIdx, { x, y }]}
      <Vertex
        {x}
        {y}
        label={vertexIdx.toString()}
        draggable={!$canvasStore.isDrawing}
        onDragMove={() => {
          const pos = stage.getRelativePointerPosition();
          canvasStore.updateVertexElement(vertexIdx, {
            x: pos.x,
            y: pos.y,
          });
        }}
        onMouseDown={(event) => {
          if ($uiStore.selectedControl === "addEdge") {
            canvasStore.setIsDrawing(true);
            drawingEdge.startVertex = vertexIdx;
            mainLayer.add(drawingEdge.line);
            drawingEdge.line.points([
              event.evt.x,
              event.evt.y,
              event.evt.x,
              event.evt.y,
            ]);
          }
        }}
        onMouseUp={(event) => {
          switch ($uiStore.selectedControl) {
            case "addEdge": {
              if ($canvasStore.isDrawing) {
                graphStore.addEdge({
                  fromVertexIdx: drawingEdge.startVertex,
                  toVertexIdx: vertexIdx,
                });
                canvasStore.addEdgeElement({
                  fromVertexId: drawingEdge.startVertex,
                  toVertexId: vertexIdx,
                });
                canvasStore.setIsDrawing(false);
                drawingEdge.line.remove();
              }
              break;
            }
            case "removeItem": {
              graphStore.removeVertex(vertexIdx);
              canvasStore.removeVertexElement(vertexIdx);
              break;
            }
            default:
              break;
          }
        }}
      />
    {/each}

    <Line
      bind:handle={drawingEdge.line}
      config={{
        fill: "#171717",
        stroke: "black",
        strokeWidth: 4,
      }}
    />

    {#each $canvasStore.edgeElements as { fromVertex, toVertex, directed }}
      <Edge
        start={{
          x: $canvasStore.vertexElements.get(fromVertex).x,
          y: $canvasStore.vertexElements.get(fromVertex).y,
        }}
        end={{
          x: $canvasStore.vertexElements.get(toVertex).x,
          y: $canvasStore.vertexElements.get(toVertex).y,
        }}
      />
    {/each}
  </Layer>
</Stage>
